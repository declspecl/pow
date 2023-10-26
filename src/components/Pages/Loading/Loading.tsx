import { Spinner } from "./Spinner";

export function Loading() {
	return (
		<div className="w-full h-full flex flex-row justify-center items-center">
			<Spinner width={50} height={50} />
		</div>
	);
}
