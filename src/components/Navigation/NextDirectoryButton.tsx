import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import React, { useState, Dispatch, SetStateAction } from "react";

type NextDirectoryProps = {
	onClick: () => void
};

export default function NextDirectoryButton({ onClick }: NextDirectoryProps) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				"p-1 bg-background rounded-lg transition-[background-color]",
				"hover:bg-background-shade-2"
			)}
		>
			<ArrowRightIcon className="stroke-text" />
		</button>
	);
}
