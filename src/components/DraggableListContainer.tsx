import { Component, ReactNode, createElement } from "react";
import { ActionValue, ListValue, ListAttributeValue, ListWidgetValue, ObjectItem, ValueStatus } from "mendix";
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
    onDropAction?: ActionValue;
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
    private dropPending = false;

    constructor(props: DraggableListContainerProps) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    renderItem = ({ item, /* index, */ drag /* , isActive */ }: RenderItemParams<ItemData>): ReactNode => {
        const { content, dragHandleContent } = this.props;
        const dsItem = this.dsItemMap.get(item.itemId);
        // console.info("DraggableListContainer.renderItem " + item.itemId + ", active: " + isActive);
        // When one or more items have no id, the list will contain only one item and no datasource items.
        if (!dsItem) {
            return (
                <View style={{ flexDirection: "row", flex: 1, height: 50 }}>
                    <DragHandleButton onStartDrag={drag}>
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
                <DragHandleButton onStartDrag={drag}>{dragHandleContent(dsItem)}</DragHandleButton>
                <View style={{ flex: 1 }}>{content(dsItem)}</View>
            </View>
        );
    };

    onDragEnd = ({ data, from, to }: DragEndParams<ItemData>): void => {
        console.info("DraggableListContainer.onDragEnd()");
        this.itemArray = data;
        // Triggering the onDragEnd prop also triggers several renders because the context attributes are updated.
        // These renders cause flickering where the item is briefly visible in the old position.
        // Signal that we have a pending drop.
        this.dropPending = true;
        this.props.onDragEnd(data, from, to);
    };

    render(): ReactNode {
        console.info("DraggableListContainer.render()");
        this.getData();
        return (
            <View style={this.styles.container}>
                <DraggableFlatList
                    data={this.itemArray}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.listItemId}
                    onDragEnd={this.onDragEnd}
                />
            </View>
        );
    }

    getData(): void {
        const { ds, itemIdAttr, itemSeqNbrAttr, onDropAction } = this.props;
        if (!ds || ds.status !== ValueStatus.Available || !ds.items) {
            console.info("DraggableListContainer.getData(): No data available (yet)");
            return;
        }

        // If the drop action is running, turn off the pending flag
        if (this.dropPending && onDropAction && onDropAction.isExecuting) {
            console.info("DraggableListContainer.getData(): The drop action running now, skip reload of the data");
            this.dropPending = false;
        }

        // If we get here and the drop pending flag is on, this means a render is triggered because of the context attribute update.
        // The drop action is not yet running.
        if (this.dropPending) {
            console.info("DraggableListContainer.getData(): The drop action is pending, skip reload of the data");
            return;
        }

        // The drop action is still running
        if (onDropAction && onDropAction.isExecuting) {
            console.info("DraggableListContainer.getData(): The drop action still running, skip reload of the data");
            return;
        }

        // Due to a refresh issue, the datasource data is updated even though the datasource has not yet updated itself.
        // This means that we see the new sequence numbers but the items are not yet in the required sequence.
        if (!this.checkItemSequence()) {
            console.info("TaskBoard.getData(): The items are not (yet) returned in the right sequence");
            return;
        }

        console.info("DraggableListContainer.getData(): Reload of the data");
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
                    listItemId: itemId + new Date().getTime(),
                    seqNbr
                };
                this.dsItemMap.set(itemId, dsItem);
                this.itemArray.push(itemData);
            } else {
                missingId = true;
            }
        }
        if (missingId) {
            console.warn("DraggableListContainer.getData(): Invalid data, clear widget data");
            this.dsItemMap.clear();
            this.itemArray = [];
            this.itemArray.push({
                itemId: "error",
                listItemId: "error" + new Date().getTime(),
                seqNbr: 1
            });
        }
    }

    checkItemSequence(): boolean {
        const { ds, itemSeqNbrAttr } = this.props;

        if (!ds.items) {
            return false;
        }

        let checkSeqNbr = 0;
        let result = true;
        // The datasource can be out of sequence after a drop. If the sequence numbers are out of order, skip loading the data.
        // Note that multiple items can have the same sequence number if they are in different columns.
        for (const itemObject of ds.items) {
            const seqNbr = Number(itemSeqNbrAttr(itemObject).value);
            if (seqNbr >= checkSeqNbr) {
                checkSeqNbr = seqNbr;
                // console.info("DraggableListContainer.checkItemSequence(): SeqNbr " + seqNbr + " in sequence");
            } else {
                result = false;
                // console.info("DraggableListContainer.checkItemSequence(): SeqNbr " + seqNbr + " out of sequence");
            }
        }
        return result;
    }
}
