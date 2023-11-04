interface FileTreeItemProps {
    directory: string,
    onClick: () => void
}

export function FileTreeItem({ directory, onClick }: FileTreeItemProps) {
	return (
		<button
            className="text-text"
            onClick={onClick}
        >
            {directory}
		</button>
	);
}
