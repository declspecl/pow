pub mod error;
pub mod file_info;
pub mod file_tree_node;

pub use error::{SystemError, SystemResult};

use std::{fs, path::Path};

// ------------------
// - tauri commands -
// ------------------

#[tauri::command(rename_all = "snake_case")]
pub fn get_directory_contents(current_directory: String) -> SystemResult< Vec<String> >
{
    let current_directory = Path::new(current_directory.as_str());

    // checking if directory is valid
    if !current_directory.is_dir()
    {
        return Err(SystemError::InvalidEnvironmentVariableError(format!("Not a directory: {}", current_directory.display())));
    }

    // reading directory contents into Vec<String>
    let items: Vec<String> = fs::read_dir(current_directory)?
        .filter_map(|entry|
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
        .collect();

    return Ok(items);
}

#[tauri::command(rename_all = "snake_case")]
pub fn resolve_environment_variable(environment_variable: String) -> SystemResult<String>
{
    let bytes = environment_variable.as_bytes();
    
    // checking if environment variable follows the %...% format
    if bytes.len() > 2 && (bytes[0] == b'%' && bytes[bytes.len() - 1] == b'%')
    {
        // should always return some
        return match std::env::var_os(String::from_utf8_lossy(&bytes[1..bytes.len() - 1]).to_string())
        {
            Some(val) => Ok(val.into_string()?),
            None => Err(SystemError::InvalidEnvironmentVariableError(environment_variable))
        }
    }
    // checking if the environment variable follows the $... format
    else if bytes.len() > 1 && bytes[0] == b'$'
    {
        // should always return Some
        return match std::env::var_os(String::from_utf8_lossy(&bytes[1..]).to_string())
        {
            Some(val) => Ok(val.into_string().unwrap()),
            None => Err(SystemError::InvalidEnvironmentVariableError(environment_variable))
        }
    }
    // otherwise, its invalid
    else
    {
        return Err(SystemError::InvalidEnvironmentVariableError(environment_variable));
    }
}
