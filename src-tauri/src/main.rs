#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod error;
pub mod system;
pub mod commands;
pub mod user_config;

use commands::*;
use error::PowResult;
use system::commands::*;
use user_config::{UserConfig, UserConfigError, commands::*};

use std::path::PathBuf;

fn main() -> PowResult<()>
{
    // ---------------
    // - tauri setup -
    // ---------------

    tauri::Builder::default()
        .setup(|app| -> Result<(), Box<dyn std::error::Error> > {
            let mut config_file_path: PathBuf = app.path_resolver().app_config_dir().ok_or(UserConfigError::AppConfigDirError)?;

            config_file_path.push("config.yaml");

            let user_config: UserConfig = match UserConfig::deserialize_from_config(&config_file_path)
            {
                Ok(user_config) => user_config,
                Err(_) => UserConfig::default()
            };

            // defining main window
            let mut main_window = tauri::WindowBuilder::new(app, "MainWindow", tauri::WindowUrl::App("/index.html".into()))
                .resizable(true)
                .title(user_config.window.title)
                .fullscreen(user_config.window.fullscreen);

            if !user_config.window.fullscreen
            {
                // should start centered
                if user_config.window.centered
                {
                    main_window = main_window.center();
                }
                else
                {
                    // initial position
                    if let (Some(x_position), Some(y_position)) = (user_config.window.x_position, user_config.window.y_position)
                    {
                        main_window = main_window.position(x_position, y_position);
                    }
                }
            }

            // initial size
            if let (Some(initial_width), Some(initial_height)) = (user_config.window.initial_width, user_config.window.initial_height)
            {
                main_window = main_window.inner_size(initial_width, initial_height);
            }

            // min size
            if let (Some(min_width), Some(min_height)) = (user_config.window.minimum_width, user_config.window.minimum_height)
            {
                main_window = main_window.min_inner_size(min_width, min_height);
            }

            // max size
            if let (Some(max_width), Some(max_height)) = (user_config.window.maximum_width, user_config.window.maximum_height)
            {
                main_window = main_window.max_inner_size(max_width, max_height);
            }

            main_window.build()?;

            return Ok(());
        })
        .invoke_handler(tauri::generate_handler![
            set_window_title,
            access_directory,
            get_parent_directory,
            serialize_user_config,
            deserialize_user_config,
            get_default_user_config,
            does_user_config_exist,
            resolve_environment_variable,
            parse_path,
            get_bipartite_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    return Ok(());
}
