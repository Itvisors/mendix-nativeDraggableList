import { Component, ReactNode, createElement } from "react";
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
    };

    render(): ReactNode {
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
}
