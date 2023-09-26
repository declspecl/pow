#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::Path;

#[tauri::command]
fn get_directory_contents(current_directory: String) -> Result< Vec<String>, String>
{
    let path = Path::new(current_directory.as_str());

    if !path.is_dir() {
        return Err("not a directory".into());
    }

    let items: Vec<String> =
    {
        if let Ok(dir_items) = fs::read_dir(path)
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
            return Err("failed to read dir".into());
        }
    };

    return Ok(items);
}

fn main()
{
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_directory_contents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
