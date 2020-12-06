import { Component, ReactNode, createElement } from "react";
import { EditableValue } from "mendix";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { DraggableListContainer } from "./components/DraggableListContainer";
import { NativeDraggableListProps } from "../typings/NativeDraggableListProps";
import { DropDataArray, ItemDataArray } from "./types/CustomTypes";

export interface CustomStyle extends Style {
    container: ViewStyle;
    itemView: ViewStyle;
    itemViewContainer: ViewStyle;
    draggingItemView: ViewStyle;
    itemContentView: ViewStyle;
    errorText: TextStyle;
}

export class NativeDraggableList extends Component<NativeDraggableListProps<CustomStyle>> {
    constructor(props: NativeDraggableListProps<CustomStyle>) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd = (itemArray: ItemDataArray): void => {
        console.info("NativeDraggableList onDragEnd, item array: " + JSON.stringify(itemArray));
        const dropData: DropDataArray = [];
        // Adjust the sequence numbers, start at 1.
        for (let itemIndex = 0; itemIndex < itemArray.length; itemIndex++) {
            const itemData = itemArray[itemIndex];
            dropData.push({
                itemId: itemData.itemId,
                seqNbr: itemIndex + 1
            });
        }
        // console.info("NativeDraggableList onDragEnd, adjusted item array: " + JSON.stringify(itemArray));
        const { dropDataAttr, onDropAction } = this.props;
        dropDataAttr.setValue(JSON.stringify(dropData));
        if (onDropAction && onDropAction.canExecute && !onDropAction.isExecuting) {
            onDropAction.execute();
        }
    };

    render(): ReactNode {
        // Check whether event properties are writable. Common mistake to place the widget in a readonly dataview.
        if (this.isAttributeReadOnly("dropDataAttr", this.props.dropDataAttr)) {
            return null;
        }
        return (
            <DraggableListContainer
                ds={this.props.ds}
                itemIdAttr={this.props.itemIdAttr}
                itemSeqNbrAttr={this.props.itemSeqNbrAttr}
                content={this.props.content}
                dragHandleContent={this.props.dragHandleContent}
                style={this.props.style}
                onDragEnd={this.onDragEnd}
                onDropAction={this.props.onDropAction}
            />
        );
    }

    isAttributeReadOnly(propName: string, prop: EditableValue): boolean {
        if (!prop) {
            return false;
        }
        if (prop.status !== "available") {
            return false;
        }
        if (prop.readOnly) {
            console.warn("NativeDraggableList: Property " + propName + " is readonly");
        }
        return prop.readOnly;
    }
}
