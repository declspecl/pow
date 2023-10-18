use std::{time::SystemTime, convert, fs::DirEntry, path::PathBuf};

use crate::system::SystemResult;

use super::SystemError;

// -----------------------
// - FileType definition -
// -----------------------

#[derive(Debug)]
pub enum FileType
{
    FILE,
    DIRECTORY
}

// -----------------------
// - FileInfo definition -
// -----------------------

#[derive(Debug)]
pub struct FileInfo
{
    pub name: String,
    pub file_type: FileType,
    pub size: u64,
    pub last_modified: SystemTime,
    pub last_accessed: SystemTime,
    pub time_created: SystemTime,
    pub is_readonly: bool
}

// ---------------------------
// - FileInfo implementation -
// ---------------------------

impl FileInfo
{
    pub fn new(name: String, file_type: FileType, size: u64, last_modified: SystemTime, last_accessed: SystemTime, time_created: SystemTime, is_readonly: bool) -> Self
    {
        return Self{ name, file_type, size, last_modified, last_accessed, time_created, is_readonly };
    }

    pub fn extension(&self) -> &str
    {
        return &self.name[0..];
    }
}

// ---------------------------
// - conversions to FileInfo -
// ---------------------------

impl convert::TryFrom<DirEntry> for FileInfo
{
    type Error = SystemError;

    fn try_from(value: DirEntry) -> SystemResult<Self>
    {
        let metadata = value.metadata()?;

        return Ok(Self
        {
            name: value.file_name().into_string()?,
            file_type: if value.file_type()?.is_file() || value.file_type()?.is_symlink() { FileType::FILE } else { FileType::DIRECTORY },
            size: metadata.len(),
            last_modified: metadata.modified()?,
            last_accessed: metadata.accessed()?,
            time_created: metadata.created()?,
            is_readonly: metadata.permissions().readonly()
        });
    }
}

impl convert::TryFrom<PathBuf> for FileInfo
{
    type Error = SystemError;

    fn try_from(value: PathBuf) -> SystemResult<Self>
    {
        let metadata = value.metadata()?;

        return Ok(Self
        {
            name: value.file_name()
                .ok_or(SystemError::OSStringConversionError(value.as_os_str().to_owned()))?
                .to_str()
                .ok_or(SystemError::OSStringConversionError(value.as_os_str().to_owned()))?
                .to_string(),
            file_type: if metadata.is_file() || metadata.is_symlink() { FileType::FILE } else { FileType::DIRECTORY },
            size: metadata.len(),
            last_modified: metadata.modified()?,
            last_accessed: metadata.accessed()?,
            time_created: metadata.created()?,
            is_readonly: metadata.permissions().readonly()
        });
    }
}
