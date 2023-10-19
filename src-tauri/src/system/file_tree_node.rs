use super::{SystemError, SystemResult};

use std::fs::Metadata;
use std::path::PathBuf;
use std::{path, convert, fs::DirEntry};

// ---------------------------
// - FileTreeNode definition -
// ---------------------------

#[derive(Debug)]
pub struct FileTreeNode
{
    pub path: path::PathBuf,
    pub metadata: Metadata,
    pub children: Vec<FileTreeNode>
}

// ----------------------------------
// - implementation of FileTreeNode -
// ----------------------------------

impl FileTreeNode
{
    pub fn new(path: path::PathBuf, metadata: Metadata, children: Vec<FileTreeNode>) -> Self
    {
        return Self
        {
            path,
            metadata,
            children
        };
    }

    pub fn populate(&mut self) -> SystemResult<()>
    {
        for entry in self.path.read_dir()?
        {
            self.children.push(FileTreeNode::try_from(entry?)?);
        }

        return Ok(());
    }

    pub fn populate_recursively(&mut self) -> SystemResult<()>
    {
        for entry in self.path.read_dir()?
        {
            let mut child = FileTreeNode::try_from(entry?)?;

            if child.metadata.file_type().is_dir()
            {
                child.populate_recursively()?;
            };

            self.children.push(child);
        }

        return Ok(());
    }
}

// -------------------------------
// - conversions to FileTreeNode -
// -------------------------------

impl convert::TryFrom<PathBuf> for FileTreeNode
{
    type Error = SystemError;

    fn try_from(value: PathBuf) -> SystemResult<Self>
    {
        return Ok(Self
        {
            path: value.clone(),
            metadata: std::fs::symlink_metadata(value)?,
            children: Vec::new()
        });
    }
}

impl convert::TryFrom<DirEntry> for FileTreeNode
{
    type Error = SystemError;

    fn try_from(value: DirEntry) -> SystemResult<Self>
    {
        return value.path().try_into();
    }
}
