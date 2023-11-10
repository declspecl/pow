use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppearanceProperties
{
    pub theme: String,
    pub font_size: f64,
    pub filled_icons: bool
}

impl AppearanceProperties
{
    pub fn new(theme: String, font_size: f64, filled_icons: bool) -> Self
    {
        return Self{ theme, font_size, filled_icons };
    }
}

impl Default for AppearanceProperties
{
    fn default() -> Self
    {
        return Self::new("dark".into(), 16.0, false);
    }
}
