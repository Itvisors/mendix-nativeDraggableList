import { NativeModules, StyleSheet } from "react-native";

export const darkMode =
    NativeModules && NativeModules.RNDarkMode && NativeModules.RNDarkMode.initialMode
        ? NativeModules.RNDarkMode.initialMode === "dark"
        : false;

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemView: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: darkMode ? "#000" : "#FFF"
    },
    draggingItemView: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: darkMode ? "#006400" : "#32CD32"
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
