use std::{path::PathBuf, io::{Read, Write}};

use serde::{Serialize, Deserialize};
use tauri::Config;

#[derive(Debug, Serialize, Deserialize)]
pub struct ConfigState
{
    pub width: Option<u32>,
    pub height: Option<u32>,
    pub theme: Option<String>,
    pub window_title: Option<String>,
    pub pinned_folders: Option< Vec<String> >,
    pub default_folder: Option<String>,
    pub excluded_extensions: Option< Vec<String> >
}

impl ConfigState
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

    pub fn load_from_config(config: &Config) -> Self
    {
        use tauri::api::path;
        use std::fs::OpenOptions;

        let mut config_file_path: PathBuf = path::app_config_dir(config).unwrap();

        std::fs::create_dir_all(&config_file_path).expect("???????");

        println!("{}", config_file_path.display());

        config_file_path.push("config.yaml");

        println!("{}", config_file_path.display());

        let mut config_file = OpenOptions::new()
            .create(true)
            .write(true)
            .read(true)
            .open(config_file_path)
            .expect("failed to open sad time");

        let mut config_file_contents: String = String::new();

        let _ = config_file.read_to_string(&mut config_file_contents);

        return serde_yaml::from_str::<Self>(config_file_contents.as_str()).unwrap();
    }

    pub fn serialize(&self, config: &Config)
    {
        use tauri::api::path;
        use std::fs::OpenOptions;

        let mut config_file_path: PathBuf = path::app_config_dir(config).unwrap();

        std::fs::create_dir_all(&config_file_path).expect("???????");

        config_file_path.push("config.yaml");

        let mut config_file = OpenOptions::new()
            .create(true)
            .write(true)
            .open(config_file_path)
            .unwrap();

        let mut string_of_config: String = serde_yaml::to_string(self).unwrap();

        config_file.write_all(string_of_config.as_bytes());
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
