const ascSorting = (a, b) => {
	const aName = a.name.toUpperCase();
	const bName = b.name.toUpperCase();
	if (aName < bName) {
		return -1;
	} else if (aName > bName) {
		return 1;
	} else {
		return 0;
	}
};

// It's the same code just reversed.
const descSorting = (a, b) => {
	const result = ascSorting(a, b);
	return result - (result * 2);
};

export {
	ascSorting,
	descSorting
};
