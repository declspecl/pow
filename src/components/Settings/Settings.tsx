import { useState, Dispatch, SetStateAction  } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { UserConfig } from "@/backend/UserConfig";

interface SettingsProps {
	userConfig: UserConfig,
	setUserConfig: Dispatch<SetStateAction<UserConfig>>
}

enum SettingsFSM {
	NOTHING,
	SAVING,
	COMPLETE
}

export default function Settings({ userConfig, setUserConfig }: SettingsProps) {
	const [width, setWidth] = useState(userConfig.width);
	const [height, setHeight] = useState(userConfig.height);
	const [fsm, setFSM] = useState(SettingsFSM.NOTHING);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row gap-2">
				<label htmlFor="width">{`width (${userConfig.width}):`}</label>
				<input name="width" id="width" type="number" defaultValue={userConfig.width} className="border border-background" onChange={(e) => setWidth(parseInt(e.target.value))} />
			</div>

			<div className="flex flex-row gap-2">
				<label htmlFor="width">{`height (${userConfig.height}):`}</label>
				<input name="height" id="height" type="number" defaultValue={userConfig.height} className="border border-background" onChange={(e) => setHeight(parseInt(e.target.value))} />
			</div>

			<button
				onClick={async () => {
					setFSM(SettingsFSM.SAVING);

					const newUserConfig: UserConfig = userConfig;
					newUserConfig.width = width;
					newUserConfig.height = height;

					setTimeout(async () => {
						await invoke("serialize_user_config", { user_config: newUserConfig });
						
						setUserConfig(newUserConfig);

						setFSM(SettingsFSM.COMPLETE);

						setTimeout(() => {
							setFSM(SettingsFSM.NOTHING);
						}, 1000);
					}, 1000);
				}}
			>
				{(fsm === SettingsFSM.NOTHING) ? (
					<span>save</span>
				) : (
					(fsm === SettingsFSM.SAVING) ? (
						<span>saving...</span>
					) : (
						<span>complete!</span>
					)
				)}
			</button>
		</div>
	);
}
