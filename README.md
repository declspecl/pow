# pow

`pow` is a cross platform file explorer created in [Tauri](https://tauri.app/) (Rust backend & React frontend webview desktop app).
It is partially inspired by vim's file explorer netrw. 
Designed to be faster and more flexible than the default windows file explorer in some of my common workflows.

## Features
- [x] YAML configuration file
- [x] Custom or preset theming
- [x] Environment variable resolution
- [x] Arbitrary and relative path navigation
- [x] Pinned / favorite directories in sidebar
- [ ] Configuration of settings through UI
- [ ] Filetype based icons instead of generic file/directory icons
- [ ] File previews
- [ ] View sorting

## Screenshots
![image](https://github.com/user-attachments/assets/6acd685a-0eea-458b-b3ba-a502a4eb0152)

## Development
### Prerequisites
- Download [Node.js](https://nodejs.org), and [Rust](https://www.rust-lang.org/)
- Install the `tauri-cli` cargo binary by running `cargo install tauri-cli`

### Running the app
- `cargo tauri dev` to run the local development server and webview app
