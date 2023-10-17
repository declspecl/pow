use std::fs;
use std::path::Path;

// ------------------------------
// - directory related commands -
// ------------------------------
#[tauri::command(rename_all = "snake_case")]
fn get_directory_contents(current_directory: String) -> Result< Vec<String>, String>
{
    let current_directory = Path::new(current_directory.as_str());

    if !current_directory.is_dir()
    {
        return Err(format!("Not a directory: {}", current_directory.display()));
    }

    let items: Vec<String> =
    {
        if let Ok(dir_items) = fs::read_dir(current_directory)
        {
            dir_items.filter_map(|entry|
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
            .collect()
        }
        else
        {
            return Err(format!("Failed to read directory at path \"{}\"", current_directory.display()).into());
        }
    };

    return Ok(items);
}
