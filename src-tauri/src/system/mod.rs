pub mod error;
pub mod fs_tree;

pub use error::{SystemError, SystemResult};

use std::path::PathBuf;

use self::fs_tree::{FSNode, FSDirectory};

// ------------------
// - tauri commands -
// ------------------

#[tauri::command(rename_all = "snake_case")]
pub fn get_directory_contents(current_directory: String) -> SystemResult<FSDirectory>
{
    let current_directory = PathBuf::from(current_directory.as_str());

    let mut file_tree = FSDirectory::try_from(current_directory)?;

    file_tree.populate();

    return Ok(file_tree);
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_parent_directory(path: String) -> SystemResult<FSNode>
{
    let path = PathBuf::from(path.as_str());

    return match path.parent()
    {
        Some(parent) => parent.to_owned().try_into(),
        None => Err(SystemError::DirectoryUnderflowError(path))
    };
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
