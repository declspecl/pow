import { Variants, motion } from "framer-motion";

interface SpinnerProps {
	width?: number,
	height?: number,
	fill?: string,
	stroke?: string,
	className?: string
}

export function Spinner({ width, height, fill, stroke, className }: SpinnerProps) {
	const spinnerPathVariants: Variants = {
		initial: {
			pathLength: 0,
			rotate: "0deg",
		},
		animate: {
			pathLength: [0, 1, 0],
			rotate: ["0deg", "360deg", "720deg"],

			transition: {
				ease: "linear",
				duration: 2,
				repeat: Infinity
			}
		}
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width ? width : 24}
			height={height ? height : 24}
			viewBox="0 0 24 24"
			fill={fill ? fill : "none"}
			stroke={stroke ? stroke : "currentColor"}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className ? className : ""}
		>
			<motion.path
				d="M21 12a9 9 0 1 1-6.219-8.56"
				variants={spinnerPathVariants}
				initial="initial"
				animate="animate"
			/>
		</svg>
	);
}
