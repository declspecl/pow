#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod user_config;

use std::{path::{Path, PathBuf}, fs, sync::Mutex};
use tauri::{api::{self, dir::{self, DiskEntry}, path}, Manager};
use tauri::PathResolver;

use user_config::UserConfig;

struct UserConfigState{
    pub cfg: Mutex<UserConfig>
}

fn main()
{
    tauri::Builder::default()
        .setup(|app| {
            if let Some(config_file_path) = app.path_resolver().app_config_dir()
            {
                app.manage(
                    UserConfigState{
                        cfg: Mutex::new(UserConfig::deserialize_from_config(config_file_path).expect("failed to deserialize from config"))
                    }
                );
            }
            else
            {
                println!("failed to load config file");
                
                app.manage(
                    UserConfigState{
                        cfg: Mutex::new(UserConfig::new())
                    }
                );
            }

            return Ok(());
        })
        .invoke_handler(tauri::generate_handler![get_directory_contents, serialize_user_config, deserialize_user_config, get_user_config, set_user_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn serialize_user_config(state: tauri::State<UserConfigState>, app_handle: tauri::AppHandle)
{
    if let Some(config_file_path) = app_handle.path_resolver().app_config_dir()
    {
        state.cfg.lock().unwrap().serialize_to_config(config_file_path).expect("failed to serialize");
    }
}

#[tauri::command]
fn deserialize_user_config(state: tauri::State<UserConfigState>, app_handle: tauri::AppHandle)
{
    if let Some(config_file_path) = app_handle.path_resolver().app_config_dir()
    {
        let mut st = state.cfg.lock().unwrap();

        (*st) = UserConfig::deserialize_from_config(config_file_path).unwrap();
    }
}

#[tauri::command]
fn get_user_config(state: tauri::State<UserConfigState>) -> UserConfig
{
    return state.cfg.lock().unwrap().clone();
}

#[tauri::command]
fn set_user_config(config: UserConfig, state: tauri::State<UserConfigState>)
{
    let mut st = state.cfg.lock().unwrap();

    *st = config;
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
