pub mod fs_file;
pub mod fs_directory;

pub use fs_file::FSFile;
pub use fs_directory::FSDirectory;

use super::{SystemResult, SystemError};
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

// -------------------------
// - FSNode implementation -
// -------------------------

impl FSNode
{
    pub fn path(&self) -> &PathBuf
    {
        match self
        {
            FSNode::Directory(directory) => &directory.path,
            FSNode::File(file) => &file.path
        }
    }

    pub fn metadata(&self) -> &fs::Metadata
    {
        match self
        {
            FSNode::Directory(directory) => &directory.metadata,
            FSNode::File(file) => &file.metadata
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
