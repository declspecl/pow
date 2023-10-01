#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod error;
pub mod filesystem;
pub mod user_config;

use user_config::{serialize_user_config, deserialize_user_config};

use std::{path::Path, fs};
use user_config::UserConfig;

fn main()
{
    // -----------------
    // -- tauri setup --
    // -----------------

    tauri::Builder::default()
        .setup(|app| -> Result<(), Box<dyn std::error::Error> > {
            if !UserConfig::exists(app.path_resolver().app_config_dir().unwrap())
            {
                UserConfig::default().serialize_to_config(app.path_resolver().app_config_dir().unwrap())?;
            }

            return Ok(());
        })
        .invoke_handler(tauri::generate_handler![get_directory_contents, serialize_user_config, deserialize_user_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// --------------------
// -- tauri commands --
// --------------------

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
        if let Ok(dir_items) = fs::read_dir(current_directory)
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
            return Err(format!("Failed to read directory at path \"{}\"", current_directory.display()).into());
        }
    };

    return Ok(items);
}
