import * as React from "react";

export type ValidationRule = {
    /** validation error message */
    message?: React.ReactNode;
    /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
    type?: string;
    /** indicates whether field is required */
    required?: boolean;
    /** treat required fields that only contain whitespace as errors */
    whitespace?: boolean;
    /** validate the exact length of a field */
    len?: number;
    /** validate the min length of a field */
    min?: number;
    /** validate the max length of a field */
    max?: number;
    /** validate the value from a list of possible values */
    enum?: string | string[];
    /** validate from a regular expression */
    pattern?: RegExp;
    /** transform a value before validation */
    transform?(value: any): any;
    /** custom validate function (Note: callback must be called) */
    validator?(rule: any, value: any, callback: any, source?: any, options?: any): any;
};


export type ErrorType = {
    help: any[];
    status: string;
} | void;

export type FormCoreRootInterface<T = any> = {
    setRulesByPath(path: string, rules: ValidationRule[]): void;
    validateByPath(path: string, name: string | number, value: any): Promise<ErrorType>;
    subscribeErrorByPath(path: string, f: (v: ErrorType) => void): () => void;
    getErrorByPath(path: string): ErrorType;
}

export type PrivateFormCoreNodeInterface<T = any> = {
    children: Record<string, AllFormCoreNodeInterface>;
    getPath(): Array<string | number>;
    getParent(): AllFormCoreNodeInterface | void;
    readonly path: string | number;
    readonly pathArray: Array<string | number>;
    readonly pathString: string;
    readonly root: FormCoreRootInterface;
}

export type FormCoreNodeInterface<T = any> = {
    byPath<P = any>(path: string | number): FormCoreNodeInterface<P>;
    update(f: (value: T) => T): void;
    subscribe(f: (value: T) => void): () => void;
    getValue(): T | void;
    delete(): void;

    setRules(rules: ValidationRule[]): void;
    validate(): Promise<ErrorType>;
    validateWithAllParent(): Promise<ErrorType[]>;
    validateWithAllChildren(): Promise<ErrorType[]>;
    getError(): ErrorType;
    subscribeError(f: (v: any) => void): () => void;
}

export type AllFormCoreNodeInterface<T = any> = PrivateFormCoreNodeInterface<T> & FormCoreNodeInterface<T>
