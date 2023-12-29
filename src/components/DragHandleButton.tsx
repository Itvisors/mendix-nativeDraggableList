import React, { ReactElement, createElement } from "react";
import { Pressable } from "react-native";
import { DragStartEnum } from "../../typings/NativeDraggableListProps";

export interface DragHandleButtonProps {
    dragStart: DragStartEnum;
    onStartDrag: () => void;
    widgetName: string;
}

export function DragHandleButton(props: React.PropsWithChildren<DragHandleButtonProps>): ReactElement {
    const { children, dragStart, onStartDrag } = props;
    if (dragStart === "onPressIn") {
        return (
            <Pressable onPressIn={() => onStartDrag()} testID={`${props.widgetName}$dragHandleButton`}>
                {children}
            </Pressable>
        );
    } else {
        return (
            <Pressable onLongPress={() => onStartDrag()} testID={`${props.widgetName}$dragHandleButton`}>
                {children}
            </Pressable>
        );
    }
}
