import {FormCoreNodeInterface} from "./Types";

export class FormCoreNode<T = any> implements FormCoreNodeInterface<T> {
    constructor(private parent: FormCoreNodeInterface, private path: string | number) {

    }

    public subscribe(f: (value: T) => void) {
        return this.parent.subscribe(value => f(this.safeGet(value)))
    };

    public getValue() {
        const value = this.parent.getValue();
        return this.safeGet(value);
    };

    children: Record<string, FormCoreNodeInterface> = {};

    public byPath<P = any>(path: string): FormCoreNodeInterface<P> {
        if (!this.children[path]) {
            this.children[path] = new FormCoreNode(this, path);
        }
        return this.children[path];
    };

    private safeGet(value: any) {
        return typeof value === "object" && value !== null ? value[this.path] : null;
    }

    public update(f: (value: T) => T) {
        this.parent.update(value => this.safeSet(value, f(this.safeGet(value))))
    };

    private copy(value: any) {
        if (typeof this.path === "number") {
            return Array.isArray(value) ? value.slice() : [];
        } else {
            return {...value}
        }
    }

    private safeSet(value: any, subValue: T) {
        const newValue = this.copy(value);
        newValue[this.path] = subValue;
        return newValue;
    }

    delete() {
        this.parent.update(value => {
            const newValue = this.copy(value);
            if (typeof this.path === "number") {
                newValue.splice(this.path, 1);
                return newValue;
            } else {
                delete newValue[this.path];
                return newValue;
            }
        })
    };
}
