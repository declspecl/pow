import clsx from "clsx";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState, Dispatch, SetStateAction } from "react";

type PreviousDirectoryProps = {
	onClick: () => void
};

export default function PreviousDirectoryButton({ onClick }: PreviousDirectoryProps) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				"p-1 bg-background rounded-lg transition-[background-color]",
				"hover:bg-background-shade-2"
			)}
		>
			<ArrowLeftIcon className="stroke-text" />
		</button>
	);
}
