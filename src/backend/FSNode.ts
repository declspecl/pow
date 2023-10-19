export interface SystemTime {
    nanos_since_epoch: number,
    secs_since_epoch: number
}

export interface FSInfo {
    is_file: boolean,
    is_readonly: boolean,
    len: number,
    time_created: SystemTime,
    time_last_accessed: SystemTime,
    time_last_modified: SystemTime
}

export interface FSFile {
    info: FSInfo,
    name: string
}

export interface FSDirectory {
    info: FSInfo,
    path: string,
    children: FSNode[]
}

export interface FSNode {
    Directory?: FSDirectory,
    File?: FSFile
}
