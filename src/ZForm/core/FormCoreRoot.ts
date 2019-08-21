// @ts-ignore
import asyncValidator from 'async-validator';
import {
    AllFormCoreNodeInterface,
    ErrorType,
    FormCoreNodeInterface,
    FormCoreRootInterface,
    ValidationRule
} from "./Types";
import {FormCoreAbstract} from "./FormCoreAbs";
import {FormCoreNode} from "./FormCoreNode";

export type FormCoreRootOptions = {
    noEmit?: boolean;
    onChange?: (value: any) => void;
};

export class FormCoreRoot<T extends Record<string, any>> extends FormCoreAbstract<T> implements AllFormCoreNodeInterface<T>, FormCoreRootInterface<T> {
    private lastErrorByPath: Record<string, ErrorType> = {};
    private rulesByPath: Record<string, ValidationRule[]> = {};
    public errorSubMap = new Map<string, Set<(v: ErrorType) => void>>();
    public path = '';
    public root = this;
    pathArray = [];
    pathString = '';
    private lastValue: T;
    private subSet = new Set<(value: any) => void>();

    constructor(initValue: T, private options: FormCoreRootOptions) {
        super();
        this.lastValue = initValue;
    }

    setRulesByPath(path: string, rules: ValidationRule[]): void {
        this.rulesByPath[path] = rules;
    }

    async validateByPath(path: string, name: string | number, value: any): Promise<ErrorType | void> {
        const rules = this.rulesByPath[path];
        if (rules == null) {
            return;
        }

        return new Promise((resolve) => {
            new asyncValidator({
                [name]: this.rulesByPath[path],
            }).validate({[name]: value}, (errors?: Array<{ message: string; field: string }>) => {
                this.updateErrorByPath(path, (error) => {
                    return {
                        ...error,
                        status: errors ? 'error' : 'success',
                        help: errors ? errors.map(({message}) => message) : [''],
                    };
                });
                resolve(this.getErrorByPath(path));
            });
        });
    }

    public updateErrorByPath = (path: string, f: (v: ErrorType) => ErrorType) => {
        this.lastErrorByPath[path] = f(this.lastErrorByPath[path]);
        const set = this.errorSubMap.get(path);
        console.log(this.lastErrorByPath[path]);
        if (!set) {
            return;
        }
        set.forEach((f1) => {
            f1(this.lastErrorByPath[path]);
        });
    };


    subscribeErrorByPath(path: string, f: (v: ErrorType) => void): () => void {
        let set = this.errorSubMap.get(path);
        if (!set) {
            set = new Set();
            this.errorSubMap.set(path, set);
        }
        set.add(f);

        return () => {
            if (set) {
                set.delete(f);
            }
        };
    }

    getErrorByPath(path: string): ErrorType {
        return this.lastErrorByPath[path];
    }

    getParent(): void | AllFormCoreNodeInterface<any> {
        return;
    }

    async validateWithAllParent(): Promise<any[]> {
        return [await this.validate()];
    }

    public getValue() {
        return this.lastValue;
    };

    public subscribe(f: (value: T) => void) {
        this.subSet.add(f);
        return () => this.subSet.delete(f);
    };

    public notify(value: T) {
        this.lastValue = value;
        this.subSet.forEach(f => f(this.lastValue));
    }

    public update(f: (value: T) => T) {
        const value = f(this.getValue());
        if (this.options.onChange) {
            this.options.onChange(value);
        }
        if (!this.options.noEmit) {
            this.notify(value);
        }
    };

    delete() {
        console.log('删除根节点')
    };

    byPath<P = any>(path: string | number): FormCoreNodeInterface<P> {
        if (!this.children[path]) {
            this.children[path] = new FormCoreNode(this, path, this.root);
        }
        return this.children[path];
    };
}
