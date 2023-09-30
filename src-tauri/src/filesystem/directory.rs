use std::{path::PathBuf, fs, io};

use super::file_data::FileData;

pub struct Directory
{
    pub path: PathBuf,
    pub children: Option< Vec<FileData> >
    // change to hashmap?
}

impl Directory
{
    pub fn new(path: PathBuf, children: Option< Vec<FileData> >) -> Self
    {
        return Self{ path, children };
    }

    pub fn walk(&mut self) -> io::Result<()>
    {
        let children: Vec<String> =
        {
            if let Ok(children) = fs::read_dir(self.path)
            {
                children.filter_map(|entry|
                {
                    entry.ok().and_then(|entry|
                    {
                        entry
                            .file_name()
                            .into_string()
                            .ok()
                            .map(|s| s.to_owned())
                    })
                })
                .collect()
            }
            else
            {
                vec![]
            }
        };

        return Ok(());
    }

    // 
    pub fn lazy_walk(&mut self) -> io::Result<()>
    {

    }
}
