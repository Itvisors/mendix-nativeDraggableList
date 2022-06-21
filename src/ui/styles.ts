import { Appearance, StyleSheet } from "react-native";

export const darkMode = Appearance.getColorScheme() === "dark";

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
