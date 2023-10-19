pub mod fs_info;
pub mod fs_file;
pub mod fs_directory;

pub use fs_file::FSFile;
pub use fs_directory::FSDirectory;

use super::{SystemResult, SystemError};

use serde::{Serialize, ser::SerializeStruct};

use self::fs_info::FSInfo;

use std::{convert, path::PathBuf, fs::{self, DirEntry}};

// ---------------------
// - FSNode definition -
// ---------------------

#[derive(Debug, Clone)]
pub enum FSNode
{
    Directory(FSDirectory),
    File(FSFile)
}

// --------------------------
// - FSNode implementation -
// --------------------------

impl Serialize for FSNode
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::Serializer
    {
        let mut state = serializer.serialize_struct("FSNode", 2)?;

        match self
        {
            FSNode::File(file) =>
            {
                state.serialize_field("tag", "file")?;
                state.serialize_field("data", file)?;
            },
            FSNode::Directory(directory) =>
            {
                state.serialize_field("tag", "directory")?;
                state.serialize_field("data", directory)?;
            }
        }

        return state.end();
    }
}

impl IntoIterator for FSNode
{
    type Item = FSNode;
    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter
    {
        match self
        {
            FSNode::Directory(directory) => directory.children.into_iter(),
            FSNode::File(file) => file.into_iter()
        }
    }
}

// -------------------------
// - FSNode implementation -
// -------------------------

impl FSNode
{
    pub fn info(&self) -> &FSInfo
    {
        match self
        {
            FSNode::Directory(directory) => &directory.info,
            FSNode::File(file) => &file.info
        }
    }
}

// ----------------------
// - FSNode conversions -
// ----------------------

impl convert::TryFrom<PathBuf> for FSNode
{
    type Error = SystemError;

    fn try_from(value: PathBuf) -> SystemResult<Self>
    {
        if fs::symlink_metadata(value.as_path())?.is_file()
        {
            return Ok(FSNode::File(FSFile::try_from(value)?));
        }
        else
        {
            return Ok(FSNode::Directory(FSDirectory::try_from(value)?));
        }
    }
}

impl convert::TryFrom<DirEntry> for FSNode
{
    type Error = SystemError;

    fn try_from(value: DirEntry) -> Result<Self, Self::Error>
    {
        return value.path().try_into();
    }
}
