"use client";

import React, { Dispatch, MouseEventHandler, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";

type VerticalSplitBarProps = {
	leftPanel: number,
	setLeftPanelWidth: Dispatch< SetStateAction<number> >
};

export default function VerticalSplitBar({ leftPanel, setLeftPanelWidth }: VerticalSplitBarProps) {
	const [isBeingDragged, setIsBeingDragged] = useState(false);

	function onMouseMove(e: MouseEvent) {
		if (isBeingDragged) {
			const newLeftPanelWidth: number = leftPanel
			setLeftPanelWidth()
		}
	}

	function onMouseUp(e: MouseEvent) {

	}

	useEffect(() => {
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		}
	}, [isBeingDragged]);

	return (
		<div
			onMouseDown={() => setIsBeingDragged(true)}
			className="cursor-ew-resize"
		/>
	);
}
