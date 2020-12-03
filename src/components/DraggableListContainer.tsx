import { Component, ReactNode, createElement } from "react";
import { ListValue, ListAttributeValue, ListWidgetValue, ObjectItem, ValueStatus } from "mendix";
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

    private dsItemMap: Map<string, ObjectItem> = new Map();
    private itemArray: ItemDataArray = [];

    constructor(props: DraggableListContainerProps) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    renderItem = ({ item, /* index, */ drag /* , isActive */ }: RenderItemParams<ItemData>): ReactNode => {
        const { dragHandleContent, content } = this.props;
        const dsItem = this.dsItemMap.get(item.itemId);
        // When one or more items have no id, the list will contain only one item and no datasource items.
        if (!dsItem) {
            return (
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <DragHandleButton onPressIn={drag}>
                        <Text style={{ color: "red", fontSize: 17, margin: 10 }}>Error</Text>
                    </DragHandleButton>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "red", fontSize: 17, margin: 10 }}>Some items have no unique ID</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={{ flexDirection: "row", flex: 1 }}>
                <DragHandleButton onPressIn={drag}>{dragHandleContent(dsItem)}</DragHandleButton>
                <View style={{ flex: 1 }}>{content(dsItem)}</View>
            </View>
        );
    };

    onDragEnd = ({ data, from, to }: DragEndParams<ItemData>): void => {
        this.itemArray = data;
        this.props.onDragEnd(data, from, to);
    };

    render(): ReactNode {
        console.info("DraggableListContainer.render");
        this.getData();
        return (
            <View style={this.styles.container}>
                <DraggableFlatList
                    data={this.itemArray}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.itemId}
                    onDragEnd={this.onDragEnd}
                />
            </View>
        );
    }

    getData(): void {
        const { ds, itemIdAttr, itemSeqNbrAttr } = this.props;
        if (!ds || ds.status !== ValueStatus.Available || !ds.items) {
            console.info("DraggableListContainer.getData: Datasource not available");
            return;
        }

        console.info("DraggableListContainer.getData: Get data");
        this.dsItemMap.clear();
        this.itemArray = [];
        let missingId = false;
        for (const dsItem of ds.items) {
            const itemId = itemIdAttr(dsItem).displayValue;
            const seqNbr = Number(itemSeqNbrAttr(dsItem).value);
            if (itemId && itemId.trim()) {
                // console.info("DraggableListContainer.getData: Item id: " + itemId + ", seqnbr: " + seqNbr);
                const itemData: ItemData = {
                    itemId,
                    seqNbr
                };
                this.dsItemMap.set(itemId, dsItem);
                this.itemArray.push(itemData);
            } else {
                missingId = true;
            }
        }
        if (missingId) {
            console.warn("DraggableListContainer.getData: Invalid data, clear widget data");
            this.dsItemMap.clear();
            this.itemArray = [];
            this.itemArray.push({
                itemId: "error",
                seqNbr: 1
            });
        }
    }
}
