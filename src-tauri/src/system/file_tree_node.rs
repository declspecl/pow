use super::file_info::FileInfo;

use super::{SystemError, SystemResult};

use std::{path, convert, fs::DirEntry};

// ---------------------------
// - FileTreeNode definition -
// ---------------------------

pub struct FileTreeNode
{
    pub path: path::PathBuf,
    pub info: FileInfo,
    pub children: Vec<FileTreeNode>
}

// ----------------------------------
// - implementation of FileTreeNode -
// ----------------------------------

impl FileTreeNode
{
    pub fn new(path: path::PathBuf, info: FileInfo, children: Vec<FileTreeNode>) -> Self
    {
        return Self
        {
            path,
            info,
            children
        };
    }

    pub fn populate(&mut self) -> SystemResult<()>
    {
        let mut children: Vec<FileTreeNode> = Vec::with_capacity(25);

        for entry in self.path.read_dir()?
        {
            children.push(FileTreeNode::try_from(entry?)?);
        }

        return Ok(());
    }

    pub fn populate_recursively(&mut self) -> SystemResult<()>
    {
        let mut children: Vec<FileTreeNode> = Vec::with_capacity(25);

        for entry in self.path.read_dir()?
        {
            let mut child = FileTreeNode::try_from(entry?)?;

            child.populate_recursively()?;

            children.push(child);
        }

        return Ok(());
    }
}

// -------------------------------
// - conversions to FileTreeNode -
// -------------------------------

impl convert::TryFrom<DirEntry> for FileTreeNode
{
    type Error = SystemError;

    fn try_from(value: DirEntry) -> Result<Self, Self::Error>
    {
        return Ok(Self
        {
            path: value.path(),
            info: FileInfo::try_from(value)?,
            children: Vec::new()
        });
    }
}
