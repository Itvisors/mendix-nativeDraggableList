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
// END EXTRA CODE

/**
 * @param {MxObject} fromObject
 * @param {MxObject} toObject
 * @returns {Promise.<void>}
 */
export async function cloneObject(fromObject, toObject) {
	// BEGIN USER CODE
	
	if (!fromObject) {
		return Promise.reject("cloneObject: from object is empty");
	}
	if (!toObject) {
		return Promise.reject("cloneObject: to object is empty");
	}

	const fromMetaObject = mx.meta.getEntity(fromObject.getEntity());
	const toMetaObject = mx.meta.getEntity(toObject.getEntity());

	const attrArray = fromMetaObject.getAttributes();
	
	for (const attrName of attrArray) {
		if (toMetaObject.has(attrName)) {
			toObject.set(attrName, fromObject.get(attrName));
		}
	}

	// END USER CODE
}
