import * as React from "react";
import {FormCoreRoot} from "../core/FormCoreRoot";
import {FormCoreProvider} from "./Context";

type ContainerProps<T> = {
    initValue?: T;
    onChange?: (value: T) => void;
}

export class Container<T extends Record<string, any>> extends React.Component<ContainerProps<T>> {
    private formCore = new FormCoreRoot(this.props.initValue || {} as any, this.props.onChange);

    render() {
        return <FormCoreProvider value={this.formCore}>
            {this.props.children}
        </FormCoreProvider>;
    }
}
