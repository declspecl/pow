use super::FSNode;
use crate::system::{SystemError, SystemResult};

use std::{path::PathBuf, fs::{self, DirEntry}, convert};

// --------------------------
// - FSDirectory definition -
// --------------------------

#[derive(Debug, Clone)]
pub struct FSDirectory
{
    pub path: PathBuf,
    pub metadata: fs::Metadata,
    pub children: Vec<FSNode>
}

// ------------------------------
// - FSDirectory implementation -
// ------------------------------

impl FSDirectory
{
    pub fn populate(&mut self) -> SystemResult<()>
    {
        for entry in fs::read_dir(self.path.as_path())?
        {
            self.children.push(entry?.try_into()?);
        }

        return Ok(());
    }

    pub fn populate_recursively(&mut self) -> SystemResult<()>
    {
        for entry in fs::read_dir(self.path.as_path())?
        {
            let entry: FSNode = match entry?.try_into()?
            {
                FSNode::Directory(mut directory) =>
                {
                    let _ = directory.populate_recursively();

                    FSNode::Directory(directory)
                },
                FSNode::File(file) =>
                {
                    FSNode::File(file)
                }
            };

            self.children.push(entry);
        }

        return Ok(());
    }
}

impl IntoIterator for FSDirectory
{
    type Item = FSNode;
    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter
    {
        return self.children.into_iter();
    }
}

// ---------------------------
// - FSDirectory conversions -
// ---------------------------

impl convert::TryFrom<PathBuf> for FSDirectory
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

impl convert::TryFrom<DirEntry> for FSDirectory
{
    type Error = SystemError;

    fn try_from(value: DirEntry) -> SystemResult<Self>
    {
        return value.path().try_into();
    }
}
