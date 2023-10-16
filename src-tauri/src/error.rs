use std::{error, fmt};
use serde::{Serialize, Deserialize};

use crate::user_config::UserConfigError;

// declaring custom Result wrapper type
pub type PowResult<T> = Result<T, PowError>;

// -------------------------
// -- PowError definition --
// -------------------------

#[derive(Debug, Serialize, Deserialize)]
pub enum PowError
{
    InvalidEnvironmentVariableError(String),
    UserConfigError(UserConfigError)
}

impl error::Error for PowError {}

// ----------------------------------------------
// -- fmt::Display implementation for PowError --
// ----------------------------------------------

impl fmt::Display for PowError
{
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result
    {
        return match self
        {
            Self::InvalidEnvironmentVariableError(var) => write!(f, "Invalid environment variable \"{}\"", var),
            Self::UserConfigError(err) => write!(f, "Underlying UserConfigError: {}", err.to_string())
        }
    }
}
