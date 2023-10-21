use super::{fs_tree::FSDirectory, {SystemResult, SystemError}};

use std::path::PathBuf;

// ------------------
// - tauri commands -
// ------------------

#[tauri::command(rename_all = "snake_case")]
pub fn access_directory(directory: String) -> SystemResult<FSDirectory>
{
    let directory = PathBuf::from(directory.as_str());

    let mut file_tree = FSDirectory::try_from(directory)?;

    file_tree.populate();

    return Ok(file_tree);
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_parent_directory(path: String) -> SystemResult<FSDirectory>
{
    let path = PathBuf::from(path.as_str());

    if path.exists()
    {
        return match path.parent()
        {
            Some(parent) => parent.to_owned().try_into(),
            None => Err(SystemError::DirectoryUnderflowError(path))
        };
    }
    else {
        return Err(SystemError::InvalidDirectoryError(path.display().to_string()));
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn resolve_environment_variable(environment_variable: String) -> Option<String>
{
    let bytes = environment_variable.as_bytes();
    
    // checking if environment variable follows the %...% format
    if bytes.len() > 2 && (bytes[0] == b'%' && bytes[bytes.len() - 1] == b'%')
    {
        // should always return some
        return match std::env::var_os(String::from_utf8_lossy(&bytes[1..bytes.len() - 1]).to_string())
        {
            Some(val) => Some(val.to_string_lossy().to_string()),
            None => None
        }
    }
    // checking if the environment variable follows the $... format
    else if bytes.len() > 1 && bytes[0] == b'$'
    {
        // should always return Some
        return match std::env::var_os(String::from_utf8_lossy(&bytes[1..]).to_string())
        {
            Some(val) => Some(val.to_string_lossy().to_string()),
            None => None
        }
    }
    // otherwise, its invalid
    else
    {
        return None
    }
}
