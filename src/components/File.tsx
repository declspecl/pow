type Props = {
	filename: string;
}

export default function File(props: Props) {
	return (
		<div>
			{props.filename}
		</div>
	)
}
