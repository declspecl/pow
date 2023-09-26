import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import React, { useState, Dispatch, SetStateAction } from "react";

interface NextDirectoryProps {
	onClick: () => void,
	disabled: boolean
}

export default function NextDirectoryButton({ onClick, disabled }: NextDirectoryProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"p-1 bg-background rounded-lg transition-[background-color]",
				{ "hover:bg-background-shade-2" : !disabled }
			)}
		>
			<ArrowRightIcon className={clsx(
				"transition-[stroke]",
				{ "stroke-text" : !disabled },
				{ "stroke-background-shade-2" : disabled}
			)}/>
		</button>
	);
}
