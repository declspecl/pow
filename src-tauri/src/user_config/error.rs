use serde::{Serialize, Deserialize};
use std::{io, error, convert, fmt, path::PathBuf};

// exporting custom Result type
pub type UserConfigResult<T> = Result<T, UserConfigError>;

// --------------------------------
// -- UserConfigError definition --
// --------------------------------

#[derive(Debug, Serialize, Deserialize)]
pub enum UserConfigError
{
    SerializationError(String),
    DeserializationError(String),
    FileAccessError(PathBuf),
    FileNotFoundError(PathBuf),
    IOError(String),
    AppConfigDirError
}

impl error::Error for UserConfigError {}

// ---------------------------------
// -- fmt::Display implementation --
// ---------------------------------

impl fmt::Display for UserConfigError
{
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        return match self
        {
            Self::SerializationError(why) => write!(f, "Failed to serialize UserConfig object into config.yaml: \"{}\"", why),
            Self::DeserializationError(why) => write!(f, "Failed to deserialize the contents of config.yaml into a UserConfig object: \"{}\"", why),
            Self::FileAccessError(path) => write!(f, "Failed to access file at \"{}\"", path.display()),
            Self::FileNotFoundError(path) => write!(f, "File does not exist \"{}\"", path.display()),
            Self::IOError(why) => write!(f, "Underlying IO error: \"{}\"", why),
            Self::AppConfigDirError => write!(f, "Failed to fetch directory from app config")
        };
    }
}

// ------------------------------------------------------
// -- supporting From conversions of other Error types --
// ------------------------------------------------------

impl convert::From<io::Error> for UserConfigError
{
    fn from(value: io::Error) -> Self
    {
        return Self::IOError(value.to_string());
    }
}
