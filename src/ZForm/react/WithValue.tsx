import React from 'react';
import {useFormCore, useValue} from './Context';
import {FormCoreNodeInterface} from "../core";


export type ValueFunction<T> = (value: T, formCore: FormCoreNodeInterface) => React.ReactNode;

export const WithValue = <T extends unknown>(
    {
        children,
    }: {
        children: ValueFunction<T>;
    }) => {
    const formCore = useFormCore();
    const value = useValue(formCore);
    return <>{children(value, formCore)}</>;
};
