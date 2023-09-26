type LandmarkFolder = {
	path: string,
}

type LandmarkFolders = {
	pinnedFolders: string[],
	shellFolders: string[],
	drives: string[]
}

const landmarkFolders: LandmarkFolders = {
	pinnedFolders: [],
	shellFolders: [
		"C:\\Users\\Gavin\\Downloads\\",
		"C:\\Users\\Gavin\\Documents\\",
		"C:\\Users\\Gavin\\Pictures\\",
		"C:\\Users\\Gavin\\Videos\\",
	],
	drives: [
		"C:\\",
		"Z:\\"
	]
}

export default landmarkFolders;
