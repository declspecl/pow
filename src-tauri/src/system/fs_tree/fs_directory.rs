use serde::Serialize;

use super::{FSNode, fs_info::FSInfo};
use crate::system::{SystemError, SystemResult};

use std::{path::PathBuf, fs::{self, DirEntry}, convert};

// --------------------------
// - FSDirectory definition -
// --------------------------

#[derive(Debug, Clone, Serialize)]
pub struct FSDirectory
{
    pub path: PathBuf,
    pub info: FSInfo,
    pub children: Vec<FSNode>
}

// ------------------------------
// - FSDirectory implementation -
// ------------------------------

impl FSDirectory
{
    pub fn populate(&mut self) -> Option<SystemError>
    {
        let mut err_encountered: Option<SystemError> = None;

        match fs::read_dir(self.path.as_path())
        {
            // successfully started reading directory
            Ok(entry) =>
            {
                for entry in entry.into_iter()
                {
                    match entry
                    {
                        // was able to read directory for this entry
                        Ok(entry) => match entry.try_into()
                        {
                            // successfully transformed entry into FSNode
                            Ok(entry) => self.children.push(entry),
                            Err(why) =>
                            {
                                err_encountered = Some(why);

                                continue;
                            }
                        },
                        // was unable to read directory for this entry
                        Err(why) =>
                        {
                            err_encountered = Some(why.into());

                            continue;
                        }
                    }
                }
            },
            Err(why) =>
            {
                err_encountered = Some(why.into());
            }
        }

        return err_encountered;
    }

    pub fn populate_recursively(&mut self) -> Option<SystemError>
    {
        let mut err_encountered: Option<SystemError> = None;

        match fs::read_dir(self.path.as_path())
        {
            // successfully started reading directory
            Ok(entry) =>
            {
                for entry in entry.into_iter()
                {
                    let entry = match entry
                    {
                        // was able to read directory for this entry
                        Ok(entry) => match entry.try_into()
                        {
                            // successfully transformed entry into FSNode
                            Ok(mut entry) => match entry
                            {
                                // if entry is a directory, populate it recursively
                                FSNode::File(_) => entry,
                                FSNode::Directory(ref mut directory) =>
                                {
                                    directory.populate_recursively();

                                    entry
                                }
                            },
                            Err(why) =>
                            {
                                err_encountered = Some(why);

                                continue;
                            }
                        },
                        Err(why) =>
                        {
                            err_encountered = Some(why.into());

                            continue;
                        }
                    };

                    // finally, add this entry to children
                    self.children.push(entry);
                }
            },
            Err(why) =>
            {
                err_encountered = Some(why.into());
            }
        }

        return err_encountered;
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
            info: value.try_into()?,
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
