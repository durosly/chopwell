"use client";

import { useState } from "react";
import PinField from "react-pin-field";

function OtpForm() {
	const [otp, setOtp] = useState("");
	const handleChange = (otp: string) => setOtp(otp);

	return (
		<form className="w-[230px] mx-auto">
			<fieldset className="fieldset grid-cols-4 justify-center gap-2 mb-2">
				<legend className="sr-only">Otp code</legend>
				<PinField
					className="input input-bordered input-sm md:input-md text-center"
					onChange={handleChange}
					length={4}
				/>
			</fieldset>
			<button className="btn btn-primary btn-block">Submit</button>
		</form>
	);
}

export default OtpForm;
