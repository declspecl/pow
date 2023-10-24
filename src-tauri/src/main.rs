#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod error;
pub mod system;
pub mod user_config;

use std::path::PathBuf;

use error::PowResult;
use tauri::utils::config::parse::is_configuration_file;
use user_config::{UserConfig, commands::{serialize_user_config, deserialize_user_config, get_default_user_config}, UserConfigError};
use system::commands::{access_directory, get_parent_directory, resolve_environment_variable};

fn main() -> PowResult<()>
{
    // ---------------
    // - tauri setup -
    // ---------------

    tauri::Builder::default()
        .setup(|app| -> Result<(), Box<dyn std::error::Error> > {
            let mut config_file_path: PathBuf = app.path_resolver().app_config_dir().ok_or(UserConfigError::AppConfigDirError)?;

            config_file_path.push("config.yaml");

            if !config_file_path.exists()
            {
                println!("{} doesnt exist", config_file_path.display());

                UserConfig::default().serialize_to_config(config_file_path)?;
            }
            else
            {
                println!("{} does exist!", config_file_path.display());
            }

            return Ok(());
        })
        .invoke_handler(tauri::generate_handler![
            access_directory,
            get_parent_directory,
            serialize_user_config,
            deserialize_user_config,
            get_default_user_config,
            resolve_environment_variable
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    return Ok(());
}
