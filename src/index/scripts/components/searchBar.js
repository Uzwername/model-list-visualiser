import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

export const SearchBar = props => (
	<TextField
		id = "searchBar"
		label = "Search"
		placeholder = "Alyce"
		fullWidth
		value = { props.searchBarTextValue }
		onChange = { props.handleChange }
		onKeyPress = { props.handleSearch }
		variant = "outlined"
		InputLabelProps = {{
			shrink: true,
		}}
		InputProps = {{
			endAdornment: (
				<InputAdornment position = "end">
					<IconButton
						aria-label = "Search orders"
						onClick={ props.handleSearch }
					>
						<SearchIcon />
					</IconButton>
				</InputAdornment>
			),
		}}
	/>
);

SearchBar.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSearch: PropTypes.func.isRequired,
	searchBarTextValue: PropTypes.string.isRequired,
};
