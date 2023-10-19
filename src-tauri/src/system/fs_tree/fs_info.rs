use crate::system::{SystemError, SystemResult};

use serde::Serialize;
use std::{time::SystemTime, convert, path::PathBuf, fs::DirEntry};

// ---------------------
// - FSInfo definition -
// ---------------------

#[derive(Debug, Clone, Serialize)]
pub struct FSInfo
{
    pub is_file: bool,
    pub len: u64,
    pub is_readonly: bool,
    pub time_last_modified: SystemTime,
    pub time_last_accessed: SystemTime,
    pub time_created: SystemTime
}

// ----------------------
// - FSInfo conversions -
// ----------------------

impl convert::TryFrom<PathBuf> for FSInfo
{
    type Error = SystemError;

    fn try_from(value: PathBuf) -> SystemResult<Self>
    {
        let metadata = value.metadata()?;

        return Ok(FSInfo
        {
            is_file: value.is_file(),
            len: metadata.len(),
            is_readonly: metadata.permissions().readonly(),
            time_last_modified: metadata.modified()?,
            time_last_accessed: metadata.accessed()?,
            time_created: metadata.created()?
        });
    }
}

impl convert::TryFrom<DirEntry> for FSInfo
{
    type Error = SystemError;

    fn try_from(value: DirEntry) -> Result<Self, Self::Error>
    {
        return value.path().try_into();
    }
}
