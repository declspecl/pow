#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod user_config;
pub mod filesystem;
pub mod errors;

use user_config::{UserConfig, UserConfigState};
use std::{path::{Path, PathBuf}, fs, sync::Mutex, io};
use tauri::{api::{self, dir::{self, DiskEntry}, path}, Manager};

fn main()
{
    tauri::Builder::default()
        .setup(|app| -> Result<(), Box<dyn std::error::Error> > {
            if !UserConfig::exists(app.path_resolver().app_config_dir()?)
            {
                UserConfig::default().serialize_to_config(app.path_resolver().app_config_dir().unwrap())?;
            }

            return Ok(());
        })
        .invoke_handler(tauri::generate_handler![get_directory_contents, serialize_user_config, deserialize_user_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn serialize_user_config(user_config: UserConfig, app_handle: tauri::AppHandle) -> Result<(), String>
{
    if let Some(config_file_path) = app_handle.path_resolver().app_config_dir()
    {
        user_config.serialize_to_config(config_file_path).expect("failed to serialize");
    }
    else
    {
        app_handle.emit_all
    }

    return Ok(());
}

#[tauri::command]
fn deserialize_user_config(app_handle: tauri::AppHandle) -> Result<UserConfig, String>
{
    return match app_handle.path_resolver().app_config_dir()
    {
        Some(config_file_path) => match UserConfig::deserialize_from_config(config_file_path)
        {
            Ok(user_config) => Ok(user_config),
            io::Result::Err(why) => Err(why.to_string())
        }
        None => Err("Could not open app config dir in deserialize_user_config".into())
    }
}

#[tauri::command]
fn get_directory_contents(current_directory: String) -> Result< Vec<String>, String>
{
    let current_directory = Path::new(current_directory.as_str());

    if !current_directory.is_dir()
    {
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
