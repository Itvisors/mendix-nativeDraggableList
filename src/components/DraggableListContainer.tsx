import { Component, ReactNode, createElement } from "react";
import { ListValue, ListAttributeValue, ListWidgetValue } from "mendix";
import { Text, View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CustomStyle } from "../NativeDraggableList";
import DraggableFlatList, { DragEndParams, RenderItemParams } from "react-native-draggable-flatlist";
import { DragHandleButton } from "./DragHandleButton";
import { ItemData, ItemDataArray } from "../types/CustomTypes";

export interface DraggableListContainerProps {
    ds: ListValue;
    style: CustomStyle[];
    itemIdAttr: ListAttributeValue<BigJs.Big | string>;
    itemSeqNbrAttr: ListAttributeValue<BigJs.Big>;
    content: ListWidgetValue;
    dragHandleContent: ListWidgetValue;
    onDragEnd: (itemArray: ItemDataArray, from: number, to: number) => void;
}

const defaultStyle: CustomStyle = {
    container: {
        flex: 1
    }
};

export class DraggableListContainer extends Component<DraggableListContainerProps> {
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);

    constructor(props: DraggableListContainerProps) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    renderItem = ({ item, /* index, */ drag /* , isActive */ }: RenderItemParams<ItemData>): ReactNode => {
        return (
            <DragHandleButton onPressIn={drag}>
                <Text style={{ color: "green", fontSize: 25, margin: 10 }}>{item.itemId}</Text>
            </DragHandleButton>
        );
    };

    onDragEnd = ({ data, from, to }: DragEndParams<ItemData>): void => {
        this.props.onDragEnd(data, from, to);
    };

    render(): ReactNode {
        const itemArray: ItemData[] = [
            { seqNbr: 1, itemId: "item1" },
            { seqNbr: 2, itemId: "item2" },
            { seqNbr: 3, itemId: "item3" },
            { seqNbr: 4, itemId: "item4" },
            { seqNbr: 5, itemId: "item5" }
        ];
        return (
            <View style={this.styles.container}>
                <DraggableFlatList
                    data={itemArray}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.itemId}
                    onDragEnd={this.onDragEnd}
                />
            </View>
        );
    }
}
