import * as React from 'react';
import {ErrorType, ValidationRule, FormCoreNodeInterface} from '../core';
import {useError, useFormCore} from './Context';

export type ZFormItemProps = {
    children(error: ErrorType, formCore: FormCoreNodeInterface, required: boolean): React.ReactNode;
    rules?: ValidationRule[];
};

export const WithError = ({children, rules}: ZFormItemProps) => {
    const formCore = useFormCore();
    const error = useError(formCore) || {};
    if (rules) {
        formCore.setRules(rules);
    }
    console.log(rules,error);
    return (
        <>
            {typeof children === 'function'
                ? children(error, formCore, rules ? rules.some((v) => v.required) : false)
                : children
            }
        </>
    );
};

