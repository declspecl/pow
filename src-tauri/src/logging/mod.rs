use std::{path::PathBuf, fs::{File, OpenOptions}, io::Write};

pub struct Logger
{
    pub log_file_path: PathBuf
}

impl Logger
{
    pub fn new(mut log_file_directory: PathBuf) -> Self
    {
        log_file_directory.push("error.log");

        return Self{ log_file_path: log_file_directory };
    }

    pub fn log(&self, error: &str)
    {
        if let Ok(mut log_file) = OpenOptions::new()
            .create(true)
            .append(true)
            .open(&self.log_file_path)
        {
            log_file.write_all(error.as_bytes());
            log_file.write(&[b'\n']);
        }
    }
}
