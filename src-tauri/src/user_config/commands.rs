use super::{UserConfig, UserConfigResult, UserConfigError};

// ------------------
// - tauri commands -
// ------------------

#[tauri::command(rename_all = "snake_case")]
pub fn serialize_user_config(user_config: UserConfig, app_handle: tauri::AppHandle) -> UserConfigResult<()>
{
    let mut config_file_path = app_handle.path_resolver().app_config_dir().ok_or(UserConfigError::AppConfigDirError)?;

    config_file_path.push("config.yaml");

    return user_config.serialize_to_config(&config_file_path);
}

#[tauri::command(rename_all = "snake_case")]
pub fn deserialize_user_config(app_handle: tauri::AppHandle) -> UserConfigResult<UserConfig>
{
    let mut config_file_path = app_handle.path_resolver().app_config_dir().ok_or(UserConfigError::AppConfigDirError)?;

    config_file_path.push("config.yaml");

    return UserConfig::deserialize_from_config(&config_file_path);
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_default_user_config() -> UserConfig
{
    return UserConfig::default();
}
