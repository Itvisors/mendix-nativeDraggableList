import { Component, ReactNode, createElement } from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

export interface DragHandleButtonProps {
    onStartDrag: () => void;
}

export class DragHandleButton extends Component<DragHandleButtonProps> {
    render(): ReactNode {
        const isAndroid = Platform.OS === "android";
        const { children, onStartDrag } = this.props;
        // Especially Android does not respond well to onPressIn
        if (isAndroid) {
            return (
                <TouchableNativeFeedback onLongPress={() => onStartDrag()}>
                    <View>{children}</View>
                </TouchableNativeFeedback>
            );
        } else {
            return <TouchableOpacity onLongPress={() => onStartDrag()}>{children}</TouchableOpacity>;
        }
    }
}
