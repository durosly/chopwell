"use client";
import { FC } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 100;
const MIN = 1000;
const MAX = 10000;

interface TwoThumbsDraggableTrackProps {
	rtl: boolean;
	values: [number, number];
	onChange: (values: [number, number]) => void;
}

const TwoThumbsDraggableTrack: FC<TwoThumbsDraggableTrackProps> = ({ rtl, values, onChange }) => {
	return (
		<div className="w-full space-y-4">
			<div className="flex justify-between items-center">
				<div className="badge badge-primary badge-lg">
					₦{values[0].toLocaleString()}
				</div>
				<div className="badge badge-primary badge-lg">
					₦{values[1].toLocaleString()}
				</div>
			</div>
			<Range
				draggableTrack
				values={values}
				step={STEP}
				min={MIN}
				max={MAX}
				rtl={rtl}
				onChange={(values) => onChange(values as [number, number])}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						className="h-8 flex items-center w-full">
						<div
							ref={props.ref}
							className="h-2 w-full rounded-full"
							style={{
								background: getTrackBackground({
									values,
									colors: [
										"var(--color-base-300)",
										"var(--color-primary)",
										"var(--color-base-300)",
									],
									min: MIN,
									max: MAX,
									rtl,
								}),
							}}>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props }) => (
					<div
						{...props}
						key={props.key}
						className="h-5 w-5 bg-primary rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
					/>
				)}
			/>
		</div>
	);
};

export default TwoThumbsDraggableTrack;
