export interface UserConfig {
    window: {
        initial_width: number,
        initial_height: number,
        minimum_width: number,
        minimum_height: number,
        maximum_width: number,
        maximum_height: number,
        
        // position
        centered: boolean,
        fullscreen: boolean,
        x_position: number,
        y_position: number,

        // misc
        title: string,
        dynamic_title: boolean,
    },
    pow: {
        pinned_directories: string[]
        default_directory: string,
        excluded_extensions: string[]
    },
    appearance: {
        theme: string,
        font_size: number,
        filled_icons: boolean
    }
}
