use serde::{Serialize, Deserialize};

// -------------------------------
// - WindowProperties definition -
// -------------------------------

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WindowProperties
{
    // sizing
    pub initial_width: Option<f64>,
    pub initial_height: Option<f64>,
    pub minimum_width: Option<f64>,
    pub minimum_height: Option<f64>,
    pub maximum_width: Option<f64>,
    pub maximum_height: Option<f64>,

    // misc
    pub dynamic_title: bool,
}

// -------------------------------------------
// - WindowProperties default implementation -
// -------------------------------------------

impl Default for WindowProperties
{
    fn default() -> Self
    {
        return Self
        {
            initial_width: None,
            initial_height: None,
            minimum_width: None,
            minimum_height: None,
            maximum_width: None,
            maximum_height: None,
            dynamic_title: false
        };
    }
}
