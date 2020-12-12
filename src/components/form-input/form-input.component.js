import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
	return (
		<div className="group">
			<input className="form-input" onChange={handleChange} {...otherProps} />
			{label ? (
				//whenever user types anything then apply the shrink property to move the label upwards
				<label
					className={`${
						otherProps.value.length ? "shrink" : ""
					} form-input-label`}
				>
					{label}
				</label>
			) : null}
		</div>
	);
};

export default FormInput;
