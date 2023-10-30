interface FileTreeItemProps {
    directory: string,
    onClick: () => void
}

export default function FileTreeItem({ directory, onClick }: FileTreeItemProps) {
	return (
		<button
            className="text-text"
            onClick={onClick}
        >
            {directory}
		</button>
	);
}
