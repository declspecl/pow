#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod user_config;

use std::{path::Path, fs};
use tauri::api::{self, dir::{self, DiskEntry}};

use user_config::UserConfig;

fn main()
{
    tauri::Builder::default()
        .setup(|app| {
            let mut config: UserConfig = UserConfig::deserialize_from_config(&app.config())?;

            config.window_title("yoyoyo".into());

            config.serialize_to_config(&app.config())?;

            return Ok(());
        })
        .invoke_handler(tauri::generate_handler![get_directory_contents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_directory_contents(current_directory: String) -> Result< Vec<String>, String>
{
    let current_directory = Path::new(current_directory.as_str());

    if !current_directory.is_dir() {
        return Err("not a directory".into());
    }

    let items: Vec<String> =
    {
        if let Ok(dir_items) = fs::read_dir(&current_directory)
        {
            dir_items.filter_map(|entry|
            {
                entry.ok().and_then(|entry|
                {
                    entry
                        .file_name()
                        .into_string()
                        .ok()
                        .map(|s| s.to_owned())
                })
            })
            .collect()
        }
        else
        {
            return Err(format!{"Failed to read directory at path \"{}\"", current_directory.display()}.into());
        }
    };

    return Ok(items);
}
