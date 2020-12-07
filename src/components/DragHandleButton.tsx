import { Component, ReactNode, createElement } from "react";
import { Pressable } from "react-native";
import { DragStartEnum } from "../../typings/NativeDraggableListProps";

export interface DragHandleButtonProps {
    dragStart: DragStartEnum;
    onStartDrag: () => void;
}

export class DragHandleButton extends Component<DragHandleButtonProps> {
    render(): ReactNode {
        const { children, onStartDrag } = this.props;
        if (this.props.dragStart === "onPressIn") {
            return <Pressable onPressIn={() => onStartDrag()}>{children}</Pressable>;
        } else {
            return <Pressable onLongPress={() => onStartDrag()}>{children}</Pressable>;
        }
    }
}
