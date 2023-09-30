use std::time::SystemTime;

pub enum FileType
{
    FILE,
    DIRECTORY,
    SYMLINK
}

pub struct FileData
{
    pub name: String,
    pub file_type: FileType,
    pub size: u64,
    pub last_modified: SystemTime,
    pub last_accessed: SystemTime,
    pub time_created: SystemTime,
    pub is_readonly: bool
}

impl FileData
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
