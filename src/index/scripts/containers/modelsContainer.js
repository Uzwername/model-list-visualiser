import React, {useState} from "react";
import PropTypes from "prop-types";
import { Models } from "IndexComponents/models";
import { ModelCard } from "IndexComponents/modelCard";
import { useHistory } from "react-router-dom";
import Pagination from "material-ui-flat-pagination";

export const ModelsContainer = props => {

	// Controls pagination
	const [currentPage, setCurrentPage] = useState(0);
	// So, we can update React Router path.
	let history = useHistory();
	// Divides all records in 20 per 20 chunks
	const modelsDisplayRange = props.modelsList.slice(currentPage*20, currentPage*20+20);

	// Prepares handler for view.
	const goToModelPage = (modelID) => history.push(`/models/${modelID}`);

	// Generates card for each model
	const models = modelsDisplayRange.map(( model, i ) => (
		<ModelCard
			model = { model }
			handleClick = { goToModelPage }
			key = { i }
		/>
	));

	return (
		<>
			<Models>
				{ models.slice() }
			</Models>
			<Pagination
				limit = { 20 }
				offset = { currentPage * 20 }
				total = { props.modelsList.length }
				onClick = {(e, o, newPage) => {
					(newPage > 1) ? history.push(`/page/${newPage}`) : history.push(`/`);
					setCurrentPage(newPage - 1);
				}}
			/>
		</>
	);

};

ModelsContainer.propTypes = {
	modelsList: PropTypes.array.isRequired,
};
