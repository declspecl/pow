// ------------------------
// - user config commands -
// ------------------------

#[tauri::command(rename_all = "snake_case")]
pub fn serialize_user_config(user_config: UserConfig, app_handle: tauri::AppHandle) -> UserConfigResult<()>
{
    // should always return Some
    if let Some(config_file_path) = app_handle.path_resolver().app_config_dir()
    {
        return user_config.serialize_to_config(config_file_path);
    }
    else
    {
        return Err(UserConfigError::AppConfigDirError);
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn deserialize_user_config(app_handle: tauri::AppHandle) -> UserConfigResult<UserConfig>
{
    // should always return Some
    if let Some(config_file_path) = app_handle.path_resolver().app_config_dir()
    {
        return UserConfig::deserialize_from_config(config_file_path);
    }
    else
    {
        return Err(UserConfigError::AppConfigDirError);
    }
}
