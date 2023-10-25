use super::{UserConfigResult, UserConfigError};

use serde::{Serialize, Deserialize};
use std::{io::{Read, Write}, path::PathBuf, fs::{self, OpenOptions}};

// -------------------------
// - UserConfig definition -
// -------------------------

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UserConfig
{
    pub width: u32,
    pub height: u32,
    pub theme: String,
    pub window_title: String,
    pub pinned_folders: Vec<String>,
    pub default_folder: String,
    pub excluded_extensions: Vec<String>
}

// -----------------------------
// - UserConfig implementation -
// -----------------------------

impl UserConfig
{
    pub fn deserialize_from_config(config_file_path: PathBuf) -> UserConfigResult<UserConfig>
    {
        // create parent and own directories if they don't exist
        fs::create_dir_all(config_file_path.parent().ok_or(UserConfigError::AppConfigDirError)?)?;

        // create file if it doesn't exist (need to use write), in read mode to deserialization
        let mut config_file = OpenOptions::new()
            .create(true)
            .write(true)
            .read(true)
            .open(&config_file_path)?;

        let mut config_file_contents: String = String::with_capacity(200);

        // read user config into string
        let _ = config_file.read_to_string(&mut config_file_contents);

        // return the UserConfig object
        return match serde_yaml::from_str::<Self>(config_file_contents.as_str())
        {
            Ok(user_config) => Ok(user_config),
            Err(why) => Err(UserConfigError::DeserializationError(why.to_string()))
        };
    }

    pub fn serialize_to_config(&self, config_file_path: PathBuf) -> UserConfigResult<()>
    {
        // create parent and own directories if they don't exist
        fs::create_dir_all(config_file_path.parent().ok_or(UserConfigError::AppConfigDirError)?)?;

        // open config file in write mode and create it if it doesn't exist
        let mut config_file = OpenOptions::new()
            .create(true)
            .write(true)
            .open(config_file_path)?;

        // convert config object to yaml string
        return match serde_yaml::to_string(self)
        {
            Ok(user_config_contents) =>
            {
                Ok(config_file.write_all(user_config_contents.as_bytes())?)
            },
            Err(why) => Err(UserConfigError::SerializationError(why.to_string()))
        };
    }
}

impl Default for UserConfig
{
    #[cfg(target_os = "windows")]
    fn default() -> Self
    {
        return Self
        {
            width: 960,
            height: 540,
            theme: "system".into(),
            window_title: "pow".into(),
            pinned_folders: vec![],
            default_folder: "%HOMEPATH%".into(),
            excluded_extensions: vec![]
        };
    }

    #[cfg(not(target_os = "windows"))]
    fn default() -> Self
    {
        return Self
        {
            width: 960,
            height: 540,
            theme: "system".into(),
            window_title: "pow".into(),
            pinned_folders: vec![],
            default_folder: "$HOME".into(),
            excluded_extensions: vec![]
        };
    }
}
