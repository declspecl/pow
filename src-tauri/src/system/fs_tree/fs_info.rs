use crate::system::{SystemError, SystemResult};

use serde::{Serialize, Deserialize};
use std::{time::SystemTime, convert, path::PathBuf, fs::DirEntry};

// ---------------------
// - FSInfo definition -
// ---------------------

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FSInfo
{
    pub is_file: bool,
    pub len: u64,
    pub is_readonly: bool,
    pub time_last_modified: SystemTime,
    pub time_last_accessed: SystemTime,
    pub time_created: SystemTime
}

// -------------------------
// - FSInfo implementation -
// -------------------------

impl FSInfo
{
    pub fn new(
        is_file: bool,
        len: u64,
        is_readonly: bool,
        time_last_modified: SystemTime,
        time_last_accessed: SystemTime,
        time_created: SystemTime
    ) -> Self
    {
        return Self
        {
            is_file,
            len,
            is_readonly,
            time_last_modified,
            time_last_accessed,
            time_created
        };
    }
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

        return Ok(FSInfo::new(
            value.is_file(),
            metadata.len(),
            metadata.permissions().readonly(),
            metadata.modified()?,
            metadata.accessed()?,
            metadata.created()?
        ));
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
