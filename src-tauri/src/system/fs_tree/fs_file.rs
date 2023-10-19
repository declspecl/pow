use std::{path::PathBuf, fs::{self, DirEntry}, convert, ffi::OsString};

use serde::{Deserialize, Serialize};

use crate::system::{SystemError, SystemResult};

use super::{FSNode, fs_info::FSInfo};

// ---------------------
// - FSFile definition -
// ---------------------

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FSFile
{
    pub name: OsString,
    pub info: FSInfo,
}

// -------------------------
// - FSFile implementation -
// -------------------------

impl IntoIterator for FSFile
{
    type Item = FSNode;
    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter
    {
        return vec![FSNode::File(self)].into_iter();
    }
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
            name: value.file_name()
                .ok_or_else(|| SystemError::InvalidDirectoryError(value.display().to_string()))?.to_os_string(),
            info: value.try_into()?
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
