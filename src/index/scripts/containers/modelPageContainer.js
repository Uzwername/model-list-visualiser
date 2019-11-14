import React, {useState} from "react";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams,
	useHistory
} from "react-router-dom";
import styles from "IndexStyles/mainContent.scss";

export const ModelPageRouter = props => {

	// To route to particular id
	let match = useRouteMatch();
	// To redirect if needed
	let history = useHistory();

	return (
		<Switch>
			<Route path={`${match.path}/:modelID`}>
				<ModelPageContainer
					modelsList = { props.modelsList }
					handleUpdate = { props.handleUpdate }
				/>
			</Route>
			<Route path={match.path}>
				{ () => history.push(`/`) }
			</Route>
		</Switch>
	);
};

ModelPageRouter.propTypes = {
	modelsList: PropTypes.array.isRequired,
	handleUpdate: PropTypes.func.isRequired,
};

const ModelPageContainer = props => {

	let { modelID } = useParams();

	// Finds out the right model.
	const foundModel = props.modelsList.filter(
		e => e.id === modelID
	);

	const model = foundModel[0];

	// Take care of name
	const [modelName, setModelName] = useState(model.name);

	const updateModelName = e => setModelName(e.target.value);

	const patchModelName = async () => {

		// Pathces DB
		// I use await here only to ensure
		// that state update below will go later
		// than server update finishes.
		// @TODO: error handling
		const result = await fetch(
			`http://localhost:3000/models/${model.id}`,
			{
				method: `PATCH`,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(
					{
						name: modelName
					}
				),
			}
		);

		// Forces update.
		props.handleUpdate();

	};

	// View should be in a separate component obviously
	return (
		<div className = {styles.modelPage}>
			<div style = {{marginBottom: 25}}>
				<TextField
					label="Model Name"
					margin="normal"
					variant="outlined"
					required
					value = { modelName }
					onChange = { updateModelName }
				/>
			</div>
			<div style = {{marginBottom: 25}}>
				<div style = {{width: `fit-content`, margin: `0 auto`}}>
					<h4>The rest of the data is read-only</h4>
					<pre style = {{textAlign: `left`}}>
						{
							JSON.stringify(
								model,
								null,
								2
							)
						}
					</pre>
				</div>
			</div>
			<div style = {{marginBottom: 50}}>
				<Button
					size = "medium"
					color = "primary"
					variant = "outlined"
					onClick = { patchModelName }
				>
					Submit
				</Button>
			</div>
			<div>
				<Link to = "/">
					Back to Home page
				</Link>
			</div>
		</div>
	);

};

ModelPageContainer.propTypes = {
	modelsList: PropTypes.array.isRequired,
	handleUpdate: PropTypes.func.isRequired,
};
