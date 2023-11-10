// ------------------
// - tauri commands -
// ------------------

use crate::error::PowResult;

#[tauri::command(rename_all = "snake_case")]
pub fn set_window_title(new_title: String, window: tauri::Window) -> PowResult<()>
{
    return Ok(window.set_title(new_title.as_str())?);
}
