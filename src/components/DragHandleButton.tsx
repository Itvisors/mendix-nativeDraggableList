import React, { ReactElement, createElement } from "react";
import { Pressable } from "react-native";
import { DragStartEnum } from "../../typings/NativeDraggableListProps";

export interface DragHandleButtonProps {
    dragStart: DragStartEnum;
    onStartDrag: () => void;
}

export function DragHandleButton(props: React.PropsWithChildren<DragHandleButtonProps>): ReactElement {
    const { children, dragStart, onStartDrag } = props;
    if (dragStart === "onPressIn") {
        return <Pressable onPressIn={() => onStartDrag()}>{children}</Pressable>;
    } else {
        return <Pressable onLongPress={() => onStartDrag()}>{children}</Pressable>;
    }
}
