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
    name: string,
    info: FSInfo
}

export interface FSDirectory {
    path: string,
    info: FSInfo,
    children: FSNode[]
}

export type FSNode = {
    tag: "file",
    data: FSFile
} | {
    tag: "directory",
    data: FSDirectory
}
