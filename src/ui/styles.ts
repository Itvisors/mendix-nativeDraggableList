import { NativeModules, StyleSheet } from "react-native";

// Mendix9 / RN 0.63 darkmode detection is different:
// Dark Mode - Inherits OS theme if possible
// Safely check if Appearance API is available in this version of React Native
const Appearance = require("react-native").Appearance;
export const darkMode =
    NativeModules && NativeModules.RNDarkMode && NativeModules.RNDarkMode.initialMode
        ? NativeModules.RNDarkMode.initialMode === "dark"
        : Appearance
        ? Appearance.getColorScheme() === "dark"
        : false;

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemViewContainer: {
        flex: 1,
        padding: 10
    },
    itemView: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: darkMode ? "#000" : "#FFF"
    },
    draggingItemView: {
        flexDirection: "row",
        flex: 1,
        borderRadius: 5,
        backgroundColor: darkMode ? "#141414" : "#FFF",
        shadowColor: darkMode ? "#FFF" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    itemContentView: {
        flex: 1
    },
    errorText: {
        color: "red",
        fontSize: 17,
        margin: 10
    }
});
