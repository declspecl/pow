use std::{fmt, error, convert, path::PathBuf};
use serde::{Serialize, Deserialize};

// defining custom Result wrapper type
pub type SystemResult<T> = Result<T, SystemError>;

// --------------------------
// - SystemError definition -
// --------------------------
#[derive(Debug, Serialize, Deserialize)]
pub enum SystemError
{
    InvalidDirectoryError(String),
    InvalidEnvironmentVariableError(String),
    IOError(String),
    DirectoryUnderflowError(PathBuf)
}

impl error::Error for SystemError {}

// -----------------------------------------------
// - fmt::Display implementation for SystemError -
// -----------------------------------------------
impl fmt::Display for SystemError
{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result
    {
        return match self
        {
            Self::InvalidDirectoryError(path) => write!(f, "Path \"{}\" is not a directory", path),
            Self::InvalidEnvironmentVariableError(var) => write!(f, "Invalid environment variable \"{}\"", var),
            Self::IOError(why) => write!(f, "Underlying IO error: \"{}\"", why),
            Self::DirectoryUnderflowError(path) => write!(f, "Cannot get parent directory of \"{}\"", path.display())
        }
    }
}

// -----------------------------------------------
// - supporting From conversions for SystemError -
// -----------------------------------------------
impl convert::From<std::io::Error> for SystemError {
    fn from(value: std::io::Error) -> Self
    {
        return Self::IOError(value.to_string());
    }
}
