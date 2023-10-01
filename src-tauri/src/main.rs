#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod error;
use error::{PowResult, PowError};

pub mod filesystem;
pub mod user_config;

use user_config::{serialize_user_config, deserialize_user_config};

use std::{env, path::Path, fs, ffi::OsString};
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

            for (key, value) in std::env::vars_os()
            {
                println!("{:?} : {:?}", key, value);
            }

            return Ok(());
        })
        .invoke_handler(tauri::generate_handler![get_directory_contents, serialize_user_config, deserialize_user_config, resolve_environment_variable])
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
        return Err(format!("Not a directory: {}", current_directory.display()));
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

#[tauri::command]
fn resolve_environment_variable(environment_variable: String) -> PowResult<String>
{
    let bytes = environment_variable.as_bytes();
    
    if bytes[0] == b'%' && bytes[bytes.len() - 1] == b'%'
    {
        return match std::env::var_os(String::from_utf8_lossy(&bytes[1..bytes.len() - 1]).to_string())
        {
            Some(val) => Ok(val.into_string().unwrap()),
            None => Err(PowError::InvalidEnvironmentVariableError(environment_variable))
        }
    }
    else if bytes[0] == b'$'
    {
         return match std::env::var_os(String::from_utf8_lossy(&bytes[1..]).to_string())
         {
             Some(val) => Ok(val.into_string().unwrap()),
             None => Err(PowError::InvalidEnvironmentVariableError(environment_variable))
         }
    }
    else
    {
        return Err(PowError::InvalidEnvironmentVariableError(environment_variable));
    }
}
