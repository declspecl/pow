import { Variants, motion } from "framer-motion";

interface SpinnerProps {
	width?: number,
	height?: number,
	className?: string
}

export default function Spinner({ width, height, className }: SpinnerProps) {
	const spinnerPathVariants: Variants = {
		initial: {
			pathLength: 0,
			rotate: "0deg"
		},
		animate: {
			pathLength: 1,
			rotate: "360deg",

			transition: {
				repeat: Infinity,
				repeatType: "loop"
			}
		}
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width ? width : 24}
			height={height ? height : 24}
			viewBox="0 0 24 24"
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
