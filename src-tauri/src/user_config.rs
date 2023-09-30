use serde::{Serialize, Deserialize};
use std::{io::{self, Read, Write}, path::PathBuf, fs::{self, OpenOptions}, sync::Mutex};

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

impl Default for UserConfig
{
    fn default() -> Self
    {
        return Self
        {
            width: 960,
            height: 540,
            theme: "system".into(),
            window_title: "pow".into(),
            pinned_folders: vec![],
            default_folder: "%USERHOME%".into(),
            excluded_extensions: vec![]
        };
    }
}

impl UserConfig
{
    pub fn deserialize_from_config(mut config_file_path: PathBuf) -> io::Result<Self>
    {
        // create parent and own directories if they don't exist
        fs::create_dir_all(&config_file_path)?;

        config_file_path.push("config.yaml");

        // create file if it doesn't exist (need to use write), in read mode to deserialization
        let mut config_file = OpenOptions::new()
            .create(true)
            .write(true)
            .read(true)
            .open(&config_file_path)?;

        let mut config_file_contents: String = String::with_capacity(200);

        // read user config into string
        let _ = config_file.read_to_string(&mut config_file_contents);

        // convert yaml string to config object
        return match serde_yaml::from_str::<Self>(config_file_contents.as_str())
        {
            Ok(user_config) => Ok(user_config),
            Err(why) =>
            {
                println!("Error in deserializing from config: {}", why);

                return io::Result::Err(
                    io::Error::new(io::ErrorKind::InvalidData, "config.yaml was not properly formatted.")
                );
            }
        };
    }

    pub fn serialize_to_config(&self, mut config_file_path: PathBuf) -> io::Result<()>
    {
        // create parent and own directories if they don't exist
        fs::create_dir_all(&config_file_path)?;

        config_file_path.push("config.yaml");

        // open config file in write mode and create it if it doesn't exist
        let mut config_file = OpenOptions::new()
            .create(true)
            .write(true)
            .open(config_file_path)?;

        // convert config object to yaml string
        match serde_yaml::to_string(self)
        {
            Ok(string_of_config) =>
            {
                return config_file.write_all(string_of_config.as_bytes());
            },
            Err(why) =>
            {
                println!("Error in serializing to config: {}", why);

                return io::Result::Err(
                    io::Error::new(io::ErrorKind::InvalidInput, "`UserConfig` failed to serialize into YAML.")
                );

            }
        }
    }

    pub fn exists(mut config_file_path: PathBuf) -> bool
    {
        config_file_path.push("config.yaml");

        println!("{} {}", config_file_path.display(), if config_file_path.exists() {"exists"} else {"DNE"});

        return config_file_path.exists();
    }
}

pub struct UserConfigState
{
    pub user_config: Mutex<UserConfig>
}

impl Default for UserConfigState
{
    fn default() -> Self
    {
        return Self
        {
            user_config: Mutex::new(UserConfig::default())
        };
    }
}

impl UserConfigState
{
    pub fn new(user_config: UserConfig) -> Self
    {
        return Self
        {
            user_config: Mutex::new(user_config)
        };
    }
}
