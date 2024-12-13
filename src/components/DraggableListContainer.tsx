import { Component, ReactNode, createElement } from "react";
import { ActionValue, ListValue, ListAttributeValue, ListWidgetValue, ObjectItem, ValueStatus } from "mendix";
import { Text, View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { Big } from "big.js";
import { CustomStyle } from "../NativeDraggableList";
import DraggableFlatList, { DragEndParams, RenderItemParams } from "react-native-draggable-flatlist";
import { DragHandleButton } from "./DragHandleButton";
import { ItemData, ItemDataArray } from "../types/CustomTypes";
import { commonStyles } from "../ui/styles";
import { DragStartEnum } from "../../typings/NativeDraggableListProps";

export interface DraggableListContainerProps {
    ds: ListValue;
    style: CustomStyle[];
    itemIdAttr: ListAttributeValue<Big | string>;
    itemSeqNbrAttr: ListAttributeValue<Big>;
    content: ListWidgetValue;
    dragHandleContent: ListWidgetValue;
    dragStart: DragStartEnum;
    onDragEnd: (draggedItemID: string | undefined, itemArray: ItemDataArray) => void;
    onDropAction?: ActionValue;
    widgetName: string;
}

const defaultStyle: CustomStyle = {
    container: commonStyles.container,
    itemView: commonStyles.itemView,
    itemViewContainer: commonStyles.itemViewContainer,
    draggingItemView: commonStyles.draggingItemView,
    itemContentView: commonStyles.itemContentView,
    errorText: commonStyles.errorText
};

export class DraggableListContainer extends Component<DraggableListContainerProps> {
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);

    private dsItemMap: Map<string, ObjectItem> = new Map();
    private itemArray: ItemDataArray = [];
    private dropPending = false;
    private draggedItemID: string | undefined = undefined;

    constructor(props: DraggableListContainerProps) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.onDragBegin = this.onDragBegin.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    renderItem = ({ item, getIndex, drag, isActive }: RenderItemParams<ItemData>): ReactNode => {
        const { content, dragHandleContent, dragStart, widgetName } = this.props;
        const dsItem = this.dsItemMap.get(item.itemId);
        const index = getIndex();
        // console.info("DraggableListContainer.renderItem " + item.itemId + ", active: " + isActive);
        // When one or more items have no id, the list will contain only one item and no datasource items.
        if (!dsItem) {
            return (
                <View style={this.styles.itemView} testID={`${widgetName}$item${index}`}>
                    <DragHandleButton dragStart={dragStart} onStartDrag={drag} widgetName={widgetName}>
                        <Text style={this.styles.errorText}>Error</Text>
                    </DragHandleButton>
                    <View style={this.styles.itemContentView}>
                        <Text style={this.styles.errorText}>Some items have no unique ID</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={this.styles.itemViewContainer} testID={`${widgetName}$item${index}`}>
                <View style={isActive ? this.styles.draggingItemView : this.styles.itemView}>
                    <DragHandleButton dragStart={dragStart} onStartDrag={drag} widgetName={widgetName}>
                        {dragHandleContent.get(dsItem) as ReactNode}
                    </DragHandleButton>
                    <View style={this.styles.itemContentView} testID={`${widgetName}$item${index}$content`}>
                        {content.get(dsItem) as ReactNode}
                    </View>
                </View>
            </View>
        );
    };

    onDragEnd = ({ data }: DragEndParams<ItemData>): void => {
        // console.info("DraggableListContainer.onDragEnd()");
        this.itemArray = data;
        // Triggering the onDragEnd prop also triggers several renders because the context attributes are updated.
        // These renders cause flickering where the item is briefly visible in the old position.
        // Signal that we have a pending drop.
        this.dropPending = true;
        this.props.onDragEnd(this.draggedItemID, data);
    };

    onDragBegin = (index: number): void => {
        this.draggedItemID = this.itemArray[index].itemId;
    };

    render(): ReactNode {
        // console.info("DraggableListContainer.render()");
        this.getData();
        return (
            <View style={this.styles.container} testID={this.props.widgetName}>
                <DraggableFlatList
                    data={this.itemArray}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.listItemId}
                    onDragBegin={this.onDragBegin}
                    onDragEnd={this.onDragEnd}
                />
            </View>
        );
    }

    getData(): void {
        const { ds, itemIdAttr, itemSeqNbrAttr, onDropAction } = this.props;
        if (!ds || ds.status !== ValueStatus.Available || !ds.items) {
            // console.info("DraggableListContainer.getData(): No data available (yet)");
            return;
        }

        // If the drop action is running, turn off the pending flag
        if (this.dropPending && onDropAction && onDropAction.isExecuting) {
            // console.info("DraggableListContainer.getData(): The drop action running now, skip reload of the data");
            this.dropPending = false;
        }

        // If we get here and the drop pending flag is on, this means a render is triggered because of the context attribute update.
        // The drop action is not yet running.
        if (this.dropPending) {
            // console.info("DraggableListContainer.getData(): The drop action is pending, skip reload of the data");
            return;
        }

        // The drop action is still running
        if (onDropAction && onDropAction.isExecuting) {
            // console.info("DraggableListContainer.getData(): The drop action still running, skip reload of the data");
            return;
        }

        // Due to a refresh issue, the datasource data is updated even though the datasource has not yet updated itself.
        // This means that we see the new sequence numbers but the items are not yet in the required sequence.
        if (!this.checkItemSequence()) {
            // console.info("TaskBoard.getData(): The items are not (yet) returned in the right sequence");
            return;
        }

        // console.info("DraggableListContainer.getData(): Reload of the data");
        this.dsItemMap.clear();
        this.itemArray = [];
        let missingId = false;
        for (const dsItem of ds.items) {
            const itemId = itemIdAttr.get(dsItem).displayValue;
            const seqNbr = Number(itemSeqNbrAttr.get(dsItem).value);
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
            // console.warn("DraggableListContainer.getData(): Invalid data, clear widget data");
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
        for (const itemObject of ds.items) {
            const seqNbr = Number(itemSeqNbrAttr.get(itemObject).value);
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
