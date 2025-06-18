import React from "react";

export default function Field({ label, children, htmlFor, error }) {
	const id = htmlFor || getChildrenId(children);

	return (
		<div className="form-control">
			{label && (
				<label htmlFor={id} className="auth-label">
					{label}
				</label>
			)}
			{children}
			{!!error && (
				<div role="alert" className="text-red-600">
					{error.message}
				</div>
			)}
		</div>
	);
}
/**
 * if there is no htmlFor than we are getting id from input field
 * @param {input} children
 * @returns id
 */
function getChildrenId(children) {
	const child = React.Children.only(children);
	if ("id" in child.props) {
		return child.props.id;
	}
}
