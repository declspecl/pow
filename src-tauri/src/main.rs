#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod error;
pub mod system;
pub mod user_config;

use error::PowResult;
use user_config::{UserConfig, commands::{serialize_user_config, deserialize_user_config, get_default_user_config}, UserConfigError};
use system::commands::{access_directory, get_parent_directory, resolve_environment_variable};

use std::path::PathBuf;

fn main() -> PowResult<()>
{
    // ---------------
    // - tauri setup -
    // ---------------

    // "windows": [
    //     {
    //         "title": "pow",
    //         "center": true,
    //         "width": 880,
    //         "height": 495,
    //         "minWidth": 520,
    //         "minHeight": 380,
    //         "fullscreen": false,
    //         "resizable": true
    //     }
    // ]

    tauri::Builder::default()
        .setup(|app| -> Result<(), Box<dyn std::error::Error> > {
            let mut config_file_path: PathBuf = app.path_resolver().app_config_dir().ok_or(UserConfigError::AppConfigDirError)?;

            config_file_path.push("config.yaml");

            let user_config: UserConfig = UserConfig::deserialize_from_config(&config_file_path)?;

            let _main_window = tauri::WindowBuilder::new(app, "MainWindow", tauri::WindowUrl::App("/index.html".into()))
                .title("pow")
                .resizable(true)
                .center()
                // .min_inner_size(520, 380)
                .inner_size(user_config.width, user_config.height)
                .build()?;

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
