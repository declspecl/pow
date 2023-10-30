use serde::{Serialize, Deserialize};

// ----------------------------
// - PowProperties definition -
// ----------------------------

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PowProperties
{
    pub pinned_directories: Vec<String>,
    pub default_directory: String,
    pub excluded_extensions: Vec<String>
}

// ------------------------------------------------
// - PowProperties default Windows implementation -
// ------------------------------------------------

#[cfg(target_os = "windows")]
impl Default for PowProperties
{
    fn default() -> Self
    {
        return Self
        {
            pinned_directories: vec![
                "%HOMEDRIVE%\\%HOMEPATH%".into(),
                "%HOMEDRIVE%\\%HOMEPATH%\\Desktop".into(),
                "%HOMEDRIVE%\\%HOMEPATH%\\Downloads".into(),
                "%HOMEDRIVE%\\%HOMEPATH%\\Documents".into(),
                "%HOMEDRIVE%\\%HOMEPATH%\\Pictures".into(),
                "%HOMEDRIVE%\\%HOMEPATH%\\Videos".into(),
                "%HOMEDRIVE%\\%HOMEPATH%\\Music".into(),
            ],
            default_directory: "%HOMEDRIVE%\\%HOMEPATH%".into(),
            excluded_extensions: vec![
                ".git".into()
            ]
        };
    }
}

// ---------------------------------------------
// - PowProperties default Unix implementation -
// ---------------------------------------------

#[cfg(not(target_os = "windows"))]
impl Default for PowProperties
{
    fn default() -> Self
    {
        return Self
        {
            pinned_directories: vec![
                "$HOME".into(),
                "$HOME/Desktop".into(),
                "$HOME/Downloads".into(),
                "$HOME/Documents".into(),
                "$HOME/Pictures".into(),
                "$HOME/Videos".into(),
                "$HOME/Music".into(),
            ],
            default_directory: String::from("$HOME"),
            excluded_extensions: vec![
                ".git".into()
            ]
        };
    }
}
