use crate::system::file_info::FileType;

use super::file_info::FileInfo;

use super::{SystemError, SystemResult};

use std::path::{Path, PathBuf};
use std::{path, convert, fs::DirEntry};

// ---------------------------
// - FileTreeNode definition -
// ---------------------------

#[derive(Debug)]
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

            println!("{} is a {:?}", child.path.display(), child.info.file_type);

            match child.info.file_type
            {
                FileType::DIRECTORY =>
                {
                    child.populate_recursively()?
                },
                _ => ()
            };

            children.push(child);
        }

        return Ok(());
    }
}

impl Iterator for FileTreeNode
{
    type Item = FileTreeNode;

    fn next(&mut self) -> Option<Self::Item>
    {
        return self.children.pop();
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

impl convert::TryFrom<PathBuf> for FileTreeNode
{
    type Error = SystemError;

    fn try_from(value: PathBuf) -> Result<Self, Self::Error>
    {
        return Ok(Self
        {
            path: value.as_path().to_owned(),
            info: FileInfo::try_from(value)?,
            children: Vec::new()
        });
    }
}
