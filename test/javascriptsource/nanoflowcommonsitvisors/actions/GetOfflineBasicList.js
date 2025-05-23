// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import "mx-global";
import { Big } from "big.js";

// BEGIN EXTRA CODE

import { addConstraint, addSort, checkDateConstraintsBasic } from "../NanoflowCommonsITvisorsUtils";

// END EXTRA CODE

/**
 * Basic implementation for getting data offline. All constraints must match. 
 * 
 * A list of objects is returned, empty if not found.
 * 
 * @param {string} entityToReturn
 * @param {Big} offset - Offset in the list to retrieve. If specified, a limit must be set too.
 * @param {Big} limit - Maximum result list size
 * @param {string} attribute1 - The attribute (or reference) to constrain on
 * @param {"NanoflowCommonsITvisors.GetOfflineOperator.equals"|"NanoflowCommonsITvisors.GetOfflineOperator.lessThan"|"NanoflowCommonsITvisors.GetOfflineOperator.lessThanOrEquals"|"NanoflowCommonsITvisors.GetOfflineOperator.greaterThan"|"NanoflowCommonsITvisors.GetOfflineOperator.greaterThanOrEquals"|"NanoflowCommonsITvisors.GetOfflineOperator.contains"} operator1 - One of equals (default), lessThan, lessThanOrEquals, greatherThan, greaterThanOrEquals, contains
 * @param {string} value1 - The value to constrain on, for associations this is the GUID. Use DateTimeToMilliseconds to get the correct value to use for date constraints.
 * @param {boolean} negate1 - If true, return the objects not matching the constraint.
 * @param {string} attribute2
 * @param {"NanoflowCommonsITvisors.GetOfflineOperator.equals"|"NanoflowCommonsITvisors.GetOfflineOperator.lessThan"|"NanoflowCommonsITvisors.GetOfflineOperator.lessThanOrEquals"|"NanoflowCommonsITvisors.GetOfflineOperator.greaterThan"|"NanoflowCommonsITvisors.GetOfflineOperator.greaterThanOrEquals"|"NanoflowCommonsITvisors.GetOfflineOperator.contains"} operator2
 * @param {string} value2
 * @param {boolean} negate2
 * @param {string} attribute3
 * @param {"NanoflowCommonsITvisors.GetOfflineOperator.equals"|"NanoflowCommonsITvisors.GetOfflineOperator.lessThan"|"NanoflowCommonsITvisors.GetOfflineOperator.lessThanOrEquals"|"NanoflowCommonsITvisors.GetOfflineOperator.greaterThan"|"NanoflowCommonsITvisors.GetOfflineOperator.greaterThanOrEquals"|"NanoflowCommonsITvisors.GetOfflineOperator.contains"} operator3
 * @param {string} value3
 * @param {boolean} negate3
 * @param {string} sort1
 * @param {boolean} asc1
 * @param {string} sort2
 * @param {boolean} asc2
 * @param {string} sort3
 * @param {boolean} asc3
 * @returns {Promise.<MxObject[]>}
 */
export async function GetOfflineBasicList(entityToReturn, offset, limit, attribute1, operator1, value1, negate1, attribute2, operator2, value2, negate2, attribute3, operator3, value3, negate3, sort1, asc1, sort2, asc2, sort3, asc3) {
	// BEGIN USER CODE
	return new Promise(function(resolve, reject) {

		try {
			var constraints = [],
				filter = {},
				offsetValue,
				limitValue,
				sortArray = [];

			if (offset !== null && typeof offset !== "undefined") {
				offsetValue = Number(offset.toFixed());
				if (offsetValue > 0) {
					filter.offset = offsetValue;
				}
			}
			if (limit !== null && typeof limit !== "undefined") {
				limitValue = Number(limit.toFixed());
				if (limitValue > 0) {
					filter.limit = limitValue;
				}
			}

			addConstraint(attribute1, operator1, value1, negate1, constraints);
			addConstraint(attribute2, operator2, value2, negate2, constraints);
			addConstraint(attribute3, operator3, value3, negate3, constraints);

			checkDateConstraintsBasic(constraints, entityToReturn);

			addSort(sort1, asc1, sortArray);
			addSort(sort2, asc2, sortArray);
			addSort(sort3, asc3, sortArray);
			filter.sort = sortArray;

			mx.data.getOffline(entityToReturn, constraints, filter,
				function (mxobjs, count) {
					if (count > 0) {
						resolve(mxobjs);
					} else {
						resolve([]);
					}
				},
				function (error) {
					if (error && error.message) {
						reject("GetOfflineBasicList failed: " + error.message);
					} else {
						reject("GetOfflineBasicList failed to retrieve data.");
					}
				}
			);
		} catch (error) {
			if (error && error.message) {
				reject("GetOfflineBasicList failed: " + error.message);
			} else {
				reject("GetOfflineBasicList failed.");
			}
		}
	});
	// END USER CODE
}
