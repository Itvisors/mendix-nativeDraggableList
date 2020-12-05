import { Component, ReactNode, createElement } from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

export interface DragHandleButtonProps {
    onStartDrag: () => void;
}

export class DragHandleButton extends Component<DragHandleButtonProps> {
    render(): ReactNode {
        const isAndroid = Platform.OS === "android";
        const { children, onStartDrag } = this.props;
        if (isAndroid) {
            return (
                <TouchableNativeFeedback onLongPress={() => onStartDrag()}>
                    <View style={{ height: 50 }}>{children}</View>
                </TouchableNativeFeedback>
            );
        } else {
            return (
                <TouchableOpacity style={{ height: 50 }} onLongPress={() => onStartDrag()}>
                    {children}
                </TouchableOpacity>
            );
        }
    }
}
