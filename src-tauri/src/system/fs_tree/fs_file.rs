use std::{path::PathBuf, fs::{self, DirEntry}, convert};

use crate::system::{SystemError, SystemResult};

// ---------------------
// - FSFile definition -
// ---------------------

#[derive(Debug, Clone)]
pub struct FSFile
{
    pub path: PathBuf,
    pub metadata: fs::Metadata
}

// ----------------------
// - FSFile conversions -
// ----------------------

impl convert::TryFrom<PathBuf> for FSFile
{
    type Error = SystemError;

    fn try_from(value: PathBuf) -> SystemResult<Self>
    {
        return Ok(Self
        {
            path: value.clone(),
            metadata: std::fs::symlink_metadata(value)?
        });
    }
}

impl convert::TryFrom<DirEntry> for FSFile
{
    type Error = SystemError;

    fn try_from(value: DirEntry) -> SystemResult<Self>
    {
        return value.path().try_into();
    }
}
