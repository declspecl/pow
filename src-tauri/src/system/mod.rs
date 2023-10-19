pub mod error;
pub mod fs_tree;

pub use error::{SystemError, SystemResult};

use std::{fs, path::{Path, PathBuf}};

use self::fs_tree::FSNode;

// ------------------
// - tauri commands -
// ------------------

#[tauri::command(rename_all = "snake_case")]
pub fn get_directory_contents(current_directory: String) -> SystemResult<FSNode>
{
    let current_directory = PathBuf::from(current_directory.as_str());

    let mut file_tree = FSNode::try_from(current_directory)?;

    if let FSNode::Directory(ref mut fs_directory) = file_tree
    {
        fs_directory.populate()?;
    }

    return Ok(file_tree);
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_parent_directory(path: String) -> SystemResult<String>
{
    let path = PathBuf::from(path.as_str());

    return Ok(path.parent()
        .ok_or(SystemError::InvalidDirectoryError(path.to_string_lossy().to_string()))?
        .to_str()
            .ok_or(SystemError::OSStringConversionError(path.to_string_lossy().to_string().into()))?
            .to_string()
    );
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
