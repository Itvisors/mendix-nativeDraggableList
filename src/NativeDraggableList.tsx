import { Component, ReactNode, createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { HelloWorld } from "./components/HelloWorld";
import { NativeDraggableListProps } from "../typings/NativeDraggableListProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class NativeDraggableList extends Component<NativeDraggableListProps<CustomStyle>> {
    render(): ReactNode {
        return <HelloWorld name="test" style={this.props.style} />;
    }
}
