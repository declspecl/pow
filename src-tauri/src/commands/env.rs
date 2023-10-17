use std::fs;

// -----------------------------------------
// - environment variable related commands -
// -----------------------------------------

#[tauri::command(rename_all = "snake_case")]
fn resolve_environment_variable(environment_variable: String) -> PowResult<String>
{
    let bytes = environment_variable.as_bytes();
    
    if bytes.len() > 2 && (bytes[0] == b'%' && bytes[bytes.len() - 1] == b'%')
    {
        return match std::env::var_os(String::from_utf8_lossy(&bytes[1..bytes.len() - 1]).to_string())
        {
            Some(val) => Ok(val.into_string().unwrap()),
            None => Err(PowError::InvalidEnvironmentVariableError(environment_variable))
        }
    }
    else if bytes.len() > 1 && bytes[0] == b'$'
    {
         return match std::env::var_os(String::from_utf8_lossy(&bytes[1..]).to_string())
         {
             Some(val) => Ok(val.into_string().unwrap()),
             None => Err(PowError::InvalidEnvironmentVariableError(environment_variable))
         }
    }
    else
    {
        return Err(PowError::InvalidEnvironmentVariableError(environment_variable));
    }
}

