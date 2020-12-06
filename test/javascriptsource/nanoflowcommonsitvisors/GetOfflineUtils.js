// Common functions for GetOfflineBasic

export function addConstraint(attribute, operator, value, negate, constraints) {
	if (!attribute) {
		return;
	}
	constraints.push({
		operator: (operator) ? operator : "equals",
		attribute: attribute,
		value: value,
		negate: negate
	});
}

export function addSort(sort, asc, sortArray) {
	var ascText;

	if (!sort) {
		return;
	}
	ascText = (asc) ? "asc" : "desc";
	sortArray.push([sort, ascText]);
}

export function checkDateConstraintsBasic(constraints, entityToReturn) {
	var	constraint,
		constraintIndex,
		metaData = mx.meta.getEntity(entityToReturn);

	// Convert date constraints to actual Date objects
	for (constraintIndex = 0; constraintIndex < constraints.length; constraintIndex++) {
		constraint = constraints[constraintIndex];
		if (metaData.isDate(constraint.attribute)) {
			constraint.value = new Date(Number(constraint.value));
		}
	}
}

export function checkDateConstraintsFull(constraints, entityToReturn) {
	var	checkDateConstraint,
		constraint,
		constraintIndex,
		innerConstraintIndex,
		metaData = mx.meta.getEntity(entityToReturn);

	// Convert date constraints to actual Date objects
	// Constraints can also be nested one level deep where the outer constraint only an and/or
	// operator and a list of constraints.
	checkDateConstraint = function (constraint) {
		if (constraint.hasOwnProperty("attribute")) {
			if (metaData.isDate(constraint.attribute)) {
				constraint.value = new Date(Number(constraint.value));
			}
		}
	};
	for (constraintIndex = 0; constraintIndex < constraints.length; constraintIndex++) {
		constraint = constraints[constraintIndex];
		checkDateConstraint(constraint);
		if (constraint.hasOwnProperty("constraints")) {
			for (innerConstraintIndex = 0; innerConstraintIndex < constraint.constraints.length; innerConstraintIndex++) {
				checkDateConstraint(constraint.constraints[innerConstraintIndex]);
			}
		}
	}
}

