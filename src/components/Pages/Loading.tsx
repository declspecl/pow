import { Spinner } from "./Loading/Spinner";

export function Loading() {
	return (
		<div className="w-full h-full flex flex-row justify-center items-center">
			<Spinner width={50} height={50} />
		</div>
	);
}
