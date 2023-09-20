export function Panel() {
	return (
		<div>

		</div>
	);
}

export function Divider() {
	return (
		<div>

		</div>
	)
}
type Props = {
	children: React.ReactNode;
};

export function Root({ children}: Props) {
	return (
		<div>
			{children}
		</div>
	);
}
