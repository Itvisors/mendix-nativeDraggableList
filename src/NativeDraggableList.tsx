import { Component, ReactNode, createElement } from "react";
import { EditableValue } from "mendix";
import { ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { DraggableListContainer } from "./components/DraggableListContainer";
import { NativeDraggableListProps } from "../typings/NativeDraggableListProps";
import { ItemDataArray } from "./types/CustomTypes";

export interface CustomStyle extends Style {
    container: ViewStyle;
}

export class NativeDraggableList extends Component<NativeDraggableListProps<CustomStyle>> {
    constructor(props: NativeDraggableListProps<CustomStyle>) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd = (itemArray: ItemDataArray, from: number, to: number): void => {
        console.info(
            "NativeDraggableList onDragEnd, from: " +
                from +
                ", to: " +
                to +
                ", item array: " +
                JSON.stringify(itemArray)
        );
        // Adjust the sequence numbers, start at 1.
        for (let itemIndex = 0; itemIndex < itemArray.length; itemIndex++) {
            itemArray[itemIndex].seqNbr = itemIndex + 1;
        }
        console.info("NativeDraggableList onDragEnd, adjusted item array: " + JSON.stringify(itemArray));
        const { dropDataAttr, dropFromAttr, dropToAttr, onDropAction } = this.props;
        dropDataAttr.setValue(JSON.stringify(itemArray));
        dropFromAttr.setTextValue("" + from);
        dropToAttr.setTextValue("" + to);
        if (onDropAction && onDropAction.canExecute && !onDropAction.isExecuting) {
            onDropAction.execute();
        }
    };

    render(): ReactNode {
        // Check whether event properties are writable. Common mistake to place the widget in a readonly dataview.
        if (
            this.isAttributeReadOnly("dropDataAttr", this.props.dropDataAttr) ||
            this.isAttributeReadOnly("dropFromAttr", this.props.dropFromAttr) ||
            this.isAttributeReadOnly("dropToAttr", this.props.dropToAttr)
        ) {
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
