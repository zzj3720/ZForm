/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-use-before-declare */
import * as React from 'react';
import { FormCoreRoot } from '../core';
import { FormCoreProvider } from './Context';

export type ContainerPropsType<T> = {
    initValue?: T;
    onChange?(value: T): void;
    value?: T;
};

export class Container<T extends Record<string, any> = any> extends React.Component<ContainerPropsType<T>,
    {
        error: any;
    }> {
    private isControlled = !!this.props.value;
    public formCore = new FormCoreRoot<any>(this.props.initValue || {}, {
        noEmit: this.isControlled,
        onChange: this.props.onChange,
    });

    constructor(props: any) {
        super(props);
        this.state = {
            error: {},
        };
    }

    public getSnapshotBeforeUpdate(prevProps: Readonly<ContainerPropsType<T>>, prevState: Readonly<{ error: any }>): any | null {
        if (this.isControlled) {
            if (prevProps.value !== this.props.value) {
                return {
                    emitValue: true,
                };
            }
        }

        return {};
    }

    public componentDidUpdate(prevProps: Readonly<ContainerPropsType<T>>, prevState: Readonly<{ error: any }>, snapshot?: any): void {
        if (snapshot.emitValue) {
            this.formCore.notify(this.props.value);
        }
    }

    public validate = () => {
        return this.formCore.validateWithAllChildren();
    };

    public updateValue = (f: (v: T) => T) => {
        this.formCore.update(f);
    };

    public getValue = () => this.formCore.getValue();

    public render() {
        const { children } = this.props;

        return <FormCoreProvider value={this.formCore}>{children}</FormCoreProvider>;
    }
}
