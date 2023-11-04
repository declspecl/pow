use crate::system::{SystemResult, BipartitePath};

use super::resolve_environment_variable;

#[tauri::command(rename_all = "snake_case")]
pub fn parse_path(path: String) -> SystemResult<String>
{
    let mut path_components: Vec<String> = path.split('\\').map(|component| component.to_string()).collect();

    for component in path_components.iter_mut()
    {
        *component = match resolve_environment_variable(component.to_string())
        {
            Some(val) => val,
            None => component.to_string()
        };
    }

    return Ok(path_components.join("\\").to_string());
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_bipartite_path(path: String) -> SystemResult<BipartitePath>
{
    let display_friendly_path: String = path
        .replace("%USERPROFILE%", "~")
        .replace("$USERPROFILE", "~");

    let real_path: String = parse_path(path)?;

    return Ok(BipartitePath::new(display_friendly_path, real_path));
}
