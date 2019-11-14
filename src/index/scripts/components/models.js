import React from "react";
import PropTypes from "prop-types";
import styles from "IndexStyles/mainContent.scss";

export const Models = props => (
	<div className = {styles.flexBoard}>
		{ props.children }
	</div>
);

Models.propTypes = {
	children: PropTypes.array.isRequired,
};
