// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";
import DeviceInfo from "react-native-device-info";
import { getLocales, getCountry, getTimeZone, uses24HourClock } from "react-native-localize";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * @returns {Promise.<MxObject>}
 */
export async function GetDeviceInfo() {
	// BEGIN USER CODE
    return Promise.all([
        createMxObject("NativeMobileResources.DeviceInfo"),
        DeviceInfo.getBatteryLevel(),
        DeviceInfo.getFontScale(),
        DeviceInfo.getFreeDiskStorage(),
        DeviceInfo.getTotalDiskCapacity(),
        DeviceInfo.getTotalMemory(),
        DeviceInfo.getCarrier(),
        DeviceInfo.getManufacturer(),
        DeviceInfo.getUserAgent()
    ]).then(async ([mxObject, batteryLevel, fontScale, freeDiskStorage, totalDiskCapacity, totalMemory, carrier, manufacturer, userAgent]) => {
        const locales = getLocales();
        mxObject.set("ApplicationName", DeviceInfo.getApplicationName());
        mxObject.set("BatteryLevel", new Big(batteryLevel.toFixed(2)));
        mxObject.set("Brand", DeviceInfo.getBrand());
        mxObject.set("BuildNumber", String(DeviceInfo.getBuildNumber()));
        mxObject.set("BundleId", DeviceInfo.getBundleId());
        mxObject.set("Carrier", carrier);
        mxObject.set("DeviceCountry", getCountry());
        mxObject.set("DeviceId", DeviceInfo.getDeviceId());
        mxObject.set("DeviceLocale", locales && locales.length > 0 ? locales[0].languageTag : "");
        mxObject.set("FontScale", new Big(fontScale.toFixed(2)));
        mxObject.set("FreeDiskStorage", new Big(freeDiskStorage));
        mxObject.set("Manufacturer", manufacturer);
        mxObject.set("Model", DeviceInfo.getModel());
        mxObject.set("ReadableVersion", DeviceInfo.getReadableVersion());
        mxObject.set("SystemName", DeviceInfo.getSystemName());
        mxObject.set("SystemVersion", DeviceInfo.getSystemVersion());
        mxObject.set("Timezone", getTimeZone());
        mxObject.set("TotalDiskCapacity", new Big(totalDiskCapacity));
        mxObject.set("TotalMemory", new Big(totalMemory));
        mxObject.set("UniqueId", DeviceInfo.getUniqueId());
        mxObject.set("UserAgent", userAgent);
        mxObject.set("Version", DeviceInfo.getVersion());
        mxObject.set("Is24Hour", uses24HourClock());
        mxObject.set("IsEmulator", DeviceInfo.isEmulator());
        mxObject.set("IsTablet", DeviceInfo.isTablet());
        mxObject.set("IsLandscape", DeviceInfo.isLandscape());
        mxObject.set("HasNotch", DeviceInfo.hasNotch());
        return mxObject;
    });
    function createMxObject(entity) {
        return new Promise((resolve, reject) => {
            mx.data.create({
                entity,
                callback: mxObject => resolve(mxObject),
                error: () => reject(new Error(`Could not create '${entity}' object to store device info`))
            });
        });
    }
	// END USER CODE
}