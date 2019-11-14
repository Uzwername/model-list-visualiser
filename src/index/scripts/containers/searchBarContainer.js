import React from "react";
import PropTypes from "prop-types";
import { SearchBar } from "IndexComponents/searchBar";

/**
* While using this approach the
* information might be found in
* the keys, it should not
* hurt much.
*
* RegExp search possibility
* left enabled intentionally.
*/
const globalSearcher = query => ({
	func: e => e.name.includes(query),
	method: `filter`,
});

export const SearchBarContainer = props => {

	const [searchQuery, setSearchQuery] = React.useState(``);

	const setSearchQueryValue = e => {
		setSearchQuery( e.target.value );
	};

	const handleSearch = e => {

		// Works both on enter  && click.
		if ( e.key === `Enter` || e.type === `click` ) {

			/**
			* Sets handleSearch to
			* 2 which is global search
			* mode.
			*/
			props.handleSearch(2);

			// Filters models according to query
			props.handleShuffle(
				globalSearcher( searchQuery )
			);
console.log(searchQuery);
		}

	};

	return (
		<SearchBar
			handleSearch = { handleSearch }
			handleChange = { setSearchQueryValue }
			searchBarTextValue = { searchQuery }
		/>
	);

};

SearchBarContainer.propTypes = {
	handleSearch: PropTypes.func.isRequired,
	handleShuffle: PropTypes.func.isRequired,
};
