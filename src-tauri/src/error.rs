use crate::{user_config::UserConfigError, system::SystemError};

use std::{error, fmt, convert};
use serde::{Serialize, Deserialize};

// declaring custom Result wrapper type
pub type PowResult<T> = Result<T, PowError>;

// -----------------------
// - PowError definition -
// -----------------------

#[derive(Debug, Serialize, Deserialize)]
pub enum PowError
{
    UserConfigError(UserConfigError),
    SystemError(SystemError),
    TauriError(String)
}

// ---------------------------
// - PowError implementation -
// ---------------------------

impl error::Error for PowError {}

impl fmt::Display for PowError
{
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result
    {
        return match self
        {
            Self::UserConfigError(why) => write!(f, "Underlying UserConfigError: {}", why.to_string()),
            Self::SystemError(why) => write!(f, "Underlying SystemError: {}", why.to_string()),
            Self::TauriError(why) => write!(f, "Underlying TauriError: {}", why.to_string())
        }
    }
}

// ----------------------------
// - PowError conversionsions -
// ----------------------------

impl convert::From<UserConfigError> for PowError
{
    fn from(error: UserConfigError) -> Self
    {
        return Self::UserConfigError(error);
    }
}

impl convert::From<SystemError> for PowError
{
    fn from(error: SystemError) -> Self
    {
        return Self::SystemError(error);
    }
}

impl convert::From<tauri::Error> for PowError
{
    fn from(error: tauri::Error) -> Self
    {
        return Self::TauriError(error.to_string());
    }
}
