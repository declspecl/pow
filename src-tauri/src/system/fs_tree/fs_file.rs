use std::{path::PathBuf, fs::{self, DirEntry}, convert};

use crate::system::{SystemError, SystemResult};

use super::FSNode;

// ---------------------
// - FSFile definition -
// ---------------------

#[derive(Debug, Clone)]
pub struct FSFile
{
    pub path: PathBuf,
    pub metadata: fs::Metadata
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
