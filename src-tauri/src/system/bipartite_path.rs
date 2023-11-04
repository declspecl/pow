use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct BipartitePath
{
    display_friendly_path: String,
    real_path: String
}

impl BipartitePath
{
    pub fn new(display_friendly_path: String, real_path: String) -> Self
    {
        return Self
        {
            display_friendly_path,
            real_path
        };
    }
}
