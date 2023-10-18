import clsx from "clsx";
import { useState } from "react";
import { PaletteIcon, XIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import ThemeGroup from "@/components/Theme/ThemeGroup";
import { motion, Variants, AnimatePresence } from "framer-motion";

export default function ThemeSelector() {
	const [isPortalOpen, setIsPortalOpen] = useState(false);

	const contentVariants: Variants = {
		initial: {
			y: 20,
			opacity: 0,
			scale: 0.95
		},
		animate: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.125
			}
		},
		exit: {
			y: 10,
			opacity: 0,
			scale: 0.9,
			transition: {
				duration: 0.125
			}
		}
	}

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button
					onClick={() => setIsPortalOpen(true)}
					className={clsx(
						"p-2 bg-background text-text rounded-xl transition-[background-color]",
						"hover:bg-background-shade-2"
					)}
				>
					<PaletteIcon />
				</button>
			</Popover.Trigger>

			<AnimatePresence>
				{isPortalOpen && (
					<Popover.Portal forceMount>
						<Popover.Content className={clsx("relative top-1.5 p-3 w-80 bg-background text-text border border-text rounded-s")} asChild>
							<motion.div
								variants={contentVariants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<Popover.Arrow className="w-3 h-1.5 fill-text" />

								<div className="flex flex-col gap-8">
									<div className="flex flex-row justify-between items-center">
										<h1 className="text-2xl font-semibold text-text">Select Theme</h1>

										<Popover.Close asChild>
											<button
												onClick={() => setIsPortalOpen(false)}
												className={clsx(
													"p-1 flex flex-row justify-center items-center bg-background text-text rounded-lg transition-[background-color]",
													"hover:bg-background-shade-2"
												)}
											>
												<XIcon />
											</button>
										</Popover.Close>
									</div>

									<ThemeGroup />
								</div>
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	);
}
