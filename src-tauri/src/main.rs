#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod error;
pub mod system;
pub mod user_config;

use std::path::{Path, PathBuf};

use error::PowResult;
use user_config::{UserConfig, {serialize_user_config, deserialize_user_config}};
use system::{get_directory_contents, get_parent_directory, resolve_environment_variable, file_tree_node::FileTreeNode};

fn main() -> PowResult<()>
{
    let mut file_tree: FileTreeNode = FileTreeNode::try_from(PathBuf::from("C:/Users/Gavin/programming/"))?;

    file_tree.populate_recursively()?;

    // ---------------
    // - tauri setup -
    // ---------------

    // tauri::Builder::default()
    //     .setup(|app| -> Result<(), Box<dyn std::error::Error> > {
    //         if !UserConfig::exists(app.path_resolver().app_config_dir().unwrap())
    //         {
    //             UserConfig::default().serialize_to_config(app.path_resolver().app_config_dir().unwrap())?;
    //         }

    //         for (key, value) in std::env::vars_os()
    //         {
    //             println!("{:?} : {:?}", key, value);
    //         }

    //         return Ok(());
    //     })
    //     .invoke_handler(tauri::generate_handler![
    //         get_directory_contents,
    //         get_parent_directory,
    //         serialize_user_config,
    //         deserialize_user_config,
    //         resolve_environment_variable
    //     ])
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");

    return Ok(());
}
