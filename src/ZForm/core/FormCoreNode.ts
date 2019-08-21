import {AllFormCoreNodeInterface, FormCoreNodeInterface, FormCoreRootInterface} from "./Types";
import {FormCoreAbstract} from "./FormCoreAbs";

export class FormCoreNode<T = any> extends FormCoreAbstract<T> implements AllFormCoreNodeInterface<T> {
    pathArray: (string | number)[];
    pathString: string;
    constructor(
        private parent: AllFormCoreNodeInterface,
        public path: string | number,
        public root: FormCoreRootInterface,
    ) {
        super();
        this.pathArray = [...parent.getPath(), path];
        this.pathString = this.getPath().join('/');
    }

    public subscribe(f: (value: T) => void) {
        return this.parent.subscribe(value => f(this.safeGet(value)))
    };

    public getValue() {
        const value = this.parent.getValue();
        return this.safeGet(value);
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

    getParent() {
        return this.parent;
    };

    async validateWithAllParent() {
        const [other, self] = await Promise.all([this.parent.validateWithAllParent(), this.validate()]);
        return [...other, self];
    };
    byPath<P = any>(path: string | number): FormCoreNodeInterface<P> {
        if (!this.children[path]) {
            this.children[path] = new FormCoreNode(this, path, this.root);
        }
        return this.children[path];
    };
}
