import React, {useState, useEffect} from "react";
import { ModelsContainer } from "IndexContainers/modelsContainer";
import { NavigationContainer } from "IndexContainers/navigationContainer";
import { ModelPageRouter } from "IndexContainers/modelPageContainer";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import { ascSorting } from "IndexScripts/helpers/sortingFunctions";

export const AppContainer = () => {

	const getModelListConstructor = () => {

		let cache = [];

		return async ( purgeCache = false ) => {

			// Return cache if we have some
			// and purgeCache is not set to true.
			if ( cache.length && !purgeCache ) return cache;

			try {

				const res = await fetch(`http://localhost:3000/models`);
				const modelList = await res.json();

				// Updates cache (copy by reference)
				cache = modelList;

				return modelList;

			} catch (e) {

				// We might do something
				// more meaningful here, like
				// retry or set application
				// to error mode. For sake of
				// simplicity, let's just return
				// an array.
				return cache;

			}

		};

	};

	// Inner function
	const getModelList = getModelListConstructor();

	// All models
	const [modelsList, setModelsList] = useState([]);

	// Default sorting that might be adjusted as needed
	const [sorting, setSorting] = useState({
		func: ascSorting,
		method: `sort`
	});

	// Should be better for optimization
	// than inline arrow function.
	const updateModelList = async (purgeCache = false) => setModelsList( await getModelList(purgeCache) );

	useEffect(() => {

		// Is guaranteed to be called only once on mount.
		updateModelList();

		// Retrives model list
		// each minute (in case
		// new models were added).
		// We can make it to purge
		// cache each time if needed.
		const fetchInterval60Secs = setInterval(
			updateModelList,
			60000
		);

		return () => clearInterval( fetchInterval60Secs );

	},
	[]);

	/**
	* Possible modes:
	* 0:
	* 1: Stage View
	* 2: Global Search Mode
	*/
	const [navMode, setNavMode] = React.useState(0);

	const SearchPage = () => (
		<>
			<NavigationContainer
				handleShuffle = { setSorting }
				navMode = { navMode }
				setNavMode = { setNavMode }
			/>
			<ModelsContainer
				modelsList = { modelsList[sorting.method](sorting.func) }
			/>
		</>
	);

	return (
		<Router>
			<Switch>
				<Route path = "/models">
					<ModelPageRouter
						modelsList = { modelsList }
						handleUpdate = { updateModelList }
					/>
				</Route>
				<Route path = "/">
					<SearchPage />
				</Route>
			</Switch>
		</Router>
	);

};
