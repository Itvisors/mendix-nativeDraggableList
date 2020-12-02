/**
 * This file was generated from NativeDraggableList.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListWidgetValue } from "mendix";

export interface NativeDraggableListProps<Style> {
    name: string;
    style: Style[];
    ds: ListValue;
    itemIdAttr: ListAttributeValue<BigJs.Big | string>;
    itemSeqNbrAttr: ListAttributeValue<BigJs.Big>;
    content: ListWidgetValue;
    dragHandleContent: ListWidgetValue;
    droppedItemIdAttr: EditableValue<BigJs.Big | string>;
    dropDataAttr: EditableValue<string>;
    dropFromAttr: EditableValue<BigJs.Big>;
    dropToAttr: EditableValue<BigJs.Big>;
    onDropAction?: ActionValue;
}

export interface NativeDraggableListPreviewProps {
    class: string;
    style: string;
    ds: {} | null;
    itemIdAttr: string;
    itemSeqNbrAttr: string;
    content: { widgetCount: number; renderer: ComponentType };
    dragHandleContent: { widgetCount: number; renderer: ComponentType };
    droppedItemIdAttr: string;
    dropDataAttr: string;
    dropFromAttr: string;
    dropToAttr: string;
    onDropAction: {} | null;
}
