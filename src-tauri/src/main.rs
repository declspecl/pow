#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod config;

use config::ConfigState;

fn main()
{
    tauri::Builder::default()
        .setup(|app| {
            let mut config: ConfigState = ConfigState::load_from_config(&app.config());

            println!("{:#?}", config);

            config.width(1280).height(720);

            config.serialize(&app.config());

            return Ok(());
        })
        .invoke_handler(tauri::generate_handler![get_directory_contents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_directory_contents(current_directory: String) -> Result< Vec<String>, String>
{
    use std::fs;
    use std::path::Path;

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
