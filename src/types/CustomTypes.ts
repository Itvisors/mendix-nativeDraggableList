export interface ItemData {
    seqNbr: number;
    itemId: string; // ID from Mendix attribute
    listItemId: string; // Internal ID, unique with each render
}

export interface DropData {
    seqNbr: number;
    itemId: string; // ID from Mendix attribute
}

export type ItemDataArray = ItemData[];
export type DropDataArray = DropData[];
