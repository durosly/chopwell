"use client";
import { FC, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 100;
const MIN = 1000;
const MAX = 10000;

// Copy of TwoThumbs with `draggableTrack` prop added
const TwoThumbsDraggableTrack: FC<{ rtl: boolean }> = ({ rtl }) => {
	const [values, setValues] = useState([1025, 7500]);
	return (
		<div
		// style={{
		// 	display: "flex",
		// 	justifyContent: "center",
		// 	flexWrap: "wrap",
		// }}
		>
			<output className="text-xs text-gray-500">
				N{values[0]} - N{values[1]}
			</output>
			<Range
				draggableTrack
				values={values}
				step={STEP}
				min={MIN}
				max={MAX}
				rtl={rtl}
				onChange={(values) => {
					setValues(values);
				}}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: "36px",
							display: "flex",
							width: "100%",
						}}>
						<div
							ref={props.ref}
							style={{
								height: "5px",
								width: "100%",
								borderRadius: "4px",
								background: getTrackBackground({
									values,
									colors: [
										"#D8B2B2",
										"oklch(var(--p))",
										"#D8B2B2",
									],
									min: MIN,
									max: MAX,
									rtl,
								}),
								alignSelf: "center",
							}}>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props }) => (
					<div
						{...props}
						key={props.key}
						style={{
							...props.style,
						}}
						className="h-[19px] w-[19px] bg-primary rounded-full"></div>
				)}
			/>
		</div>
	);
};

export default TwoThumbsDraggableTrack;
