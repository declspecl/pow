use super::{FSNode, fs_info::FSInfo};
use crate::system::{SystemError, SystemResult};

use serde::{Serialize, ser::SerializeStruct};
use std::{path::PathBuf, fs::DirEntry, convert, ffi::OsString};

// ---------------------
// - FSFile definition -
// ---------------------

#[derive(Debug, Clone)]
pub struct FSFile
{
    pub name: OsString,
    pub info: FSInfo,
}

// -------------------------
// - FSFile implementation -
// -------------------------

impl Serialize for FSFile
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::Serializer
    {
        let mut state = serializer.serialize_struct("FSFile", 2)?;

        state.serialize_field("name", &self.name.to_string_lossy().to_string())?;
        state.serialize_field("info", &self.info)?;

        return state.end();
    }
}

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
                .ok_or_else(|| SystemError::InvalidDirectoryError(value.display().to_string()))?
                .to_os_string(),
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
