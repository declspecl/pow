import Spinner from "./Spinner";

export default function Loading() {
	return (
		<div className="w-full h-full flex flex-row justify-center items-center">
			<Spinner width={50} height={50} />
		</div>
	);
}
