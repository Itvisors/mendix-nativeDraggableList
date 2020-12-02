import { Component, ReactNode, createElement } from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native";

export interface DragHandleButtonProps {
    onPressIn: () => void;
}

export class DragHandleButton extends Component<DragHandleButtonProps> {
    render(): ReactNode {
        const isAndroid = Platform.OS === "android";
        const { children } = this.props;
        if (isAndroid) {
            return <TouchableNativeFeedback onPressIn={() => this.onPressIn()}>{children}</TouchableNativeFeedback>;
        } else {
            return <TouchableOpacity onPressIn={() => this.onPressIn()}>{children}</TouchableOpacity>;
        }
    }

    onPressIn(): void {
        this.props.onPressIn();
    }
}
