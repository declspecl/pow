import "./globals.css"
import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "pow",
	description: "pow file explorer",
};

type Props = {
	children: React.ReactNode
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body className="flex flex-col">{children}</body>
		</html>
	)
}
