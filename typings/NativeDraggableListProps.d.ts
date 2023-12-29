/**
 * This file was generated from NativeDraggableList.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export type DragStartEnum = "onPressIn" | "onLongPress";

export interface NativeDraggableListProps<Style> {
    name: string;
    style: Style[];
    ds: ListValue;
    itemIdAttr: ListAttributeValue<Big | string>;
    itemSeqNbrAttr: ListAttributeValue<Big>;
    content: ListWidgetValue;
    dragHandleContent: ListWidgetValue;
    dragStart: DragStartEnum;
    draggedItemIdAttr?: EditableValue<Big | string>;
    dropDataAttr: EditableValue<string>;
    onDropAction?: ActionValue;
}

export interface NativeDraggableListPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    ds: {} | { caption: string } | { type: string } | null;
    itemIdAttr: string;
    itemSeqNbrAttr: string;
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    dragHandleContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    dragStart: DragStartEnum;
    draggedItemIdAttr: string;
    dropDataAttr: string;
    onDropAction: {} | null;
}
