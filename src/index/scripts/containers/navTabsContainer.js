import React from "react";
import PropTypes from "prop-types";
import { NavTabs } from "IndexComponents/navTabs";
import {ascSorting, descSorting} from "IndexScripts/helpers/sortingFunctions";

export const NavTabsContainer = props => {

	const deactivated = (props.navMode > 1);

	const handleTabChange = (event, newActiveTab) => {

		props.handleNavModeChange(newActiveTab);

		if (newActiveTab === 0) {
			// ASC
			props.handleShuffle(
				{ func: ascSorting, method: `sort` }
			);
		} else if (newActiveTab === 1) {
			//DESC
			props.handleShuffle(
				{ func: descSorting, method: `sort` }
			);
		}

	};

	const handleNavModeRestore = () => {

		// Restores tabs
		props.handleNavModeChange(0);

		// Restores all cards
		props.handleShuffle({
			func: ascSorting, method: `sort`
		});

	};

	return (
		<NavTabs
			activeTab = { props.navMode }
			setActiveTab = { handleTabChange }
			deactivated = { deactivated }
			handleNavModeRestore = { handleNavModeRestore }
		/>
	);

};

NavTabsContainer.propTypes = {
	navMode: PropTypes.number.isRequired,
	handleNavModeChange: PropTypes.func.isRequired,
	handleShuffle: PropTypes.func.isRequired,
};
