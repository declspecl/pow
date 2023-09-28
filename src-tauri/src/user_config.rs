use serde::{Serialize, Deserialize};
use tauri::{self, Config, api::{path, file, dir}};
use std::{io::{self, Read, Write}, path::PathBuf, fs::{self, OpenOptions}};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserConfig
{
    pub width: Option<u32>,
    pub height: Option<u32>,
    pub theme: Option<String>,
    pub window_title: Option<String>,
    pub pinned_folders: Option< Vec<String> >,
    pub default_folder: Option<String>,
    pub excluded_extensions: Option< Vec<String> >
}

impl UserConfig
{
    pub fn new() -> Self
    {
        return Self
        {
            width: None,
            height: None,
            theme: None,
            window_title: None,
            pinned_folders: None,
            default_folder: None,
            excluded_extensions: None
        };
    }

    pub fn deserialize_from_config(config: &Config) -> io::Result<Self>
    {
        if let Some(mut config_file_path) = path::app_config_dir(&config)
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

            return match serde_yaml::from_str::<Self>(config_file_contents.as_str())
            {
                Ok(user_config) => Ok(user_config),
                Err(why) =>
                {
                    return io::Result::Err(
                        io::Error::new(io::ErrorKind::InvalidData, "config.yaml was not properly formatted.")
                    );
                }
            };
        }
        else
        {
            return io::Result::Err(
                io::Error::new(io::ErrorKind::NotFound, "Could not get app config dir.")
            );
        }
    }

    pub fn serialize_to_config(&self, config: &Config) -> io::Result<()>
    {
        if let Some(mut config_file_path) = path::app_config_dir(&config)
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
            if let Ok(string_of_config) = serde_yaml::to_string(self)
            {
                // write yaml string to config file
                config_file.write_all(string_of_config.as_bytes())?;

                return Ok(());
            }
            else
            {
                return io::Result::Err(
                    io::Error::new(io::ErrorKind::InvalidInput, "`UserConfig` failed to serialize into YAML.")
                );
            }
        }
        else
        {
            return io::Result::Err(
                io::Error::new(io::ErrorKind::NotFound, "Could not get app config dir.")
            );
        }
    }

    pub fn width(&mut self, width: u32) -> &mut Self
    {
        self.width = Some(width);

        return self;
    }

    pub fn height(&mut self, height: u32) -> &mut Self
    {
        self.height = Some(height);

        return self;
    }

    pub fn theme(&mut self, theme: String) -> &mut Self
    {
        self.theme = Some(theme);

        return self;
    }

    pub fn window_title(&mut self, window_title: String) -> &mut Self
    {
        self.window_title = Some(window_title);

        return self;
    }

    pub fn pinned_folders(&mut self, pinned_folders: Vec<String>) -> &mut Self
    {
        self.pinned_folders = Some(pinned_folders);

        return self;
    }

    pub fn default_folder(&mut self, default_folder: String) -> &mut Self
    {
        self.default_folder = Some(default_folder);

        return self;
    }

    pub fn excluded_extensions(&mut self, excluded_extensions: Vec<String>) -> &mut Self
    {
        self.excluded_extensions = Some(excluded_extensions);

        return self;
    }
}
