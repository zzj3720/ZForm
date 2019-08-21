import {FormCoreNodeInterface, FormCoreRootInterface} from "./Types";
import {FormCoreNode} from "./FormCoreNode";

export class FormCoreRoot<T extends Record<string, any>> implements FormCoreRootInterface<T> {
    private lastValue: T;
    private subSet = new Set<(value: any) => void>();

    constructor(initValue: T, private onChange?: (value: T) => void) {
        this.lastValue = initValue;
    }

    children: Record<string, FormCoreNodeInterface> = {};

    public byPath<P = any>(path: string): FormCoreNodeInterface<P> {
        if (!this.children[path]) {
            this.children[path] = new FormCoreNode(this, path);
        }
        return this.children[path];
    };

    public getValue() {
        return this.lastValue;
    };

    public subscribe(f: (value: T) => void) {
        this.subSet.add(f);
        return () => this.subSet.delete(f);
    };

    private notify(value: T) {
        this.lastValue = value;
        console.log(value);
        this.subSet.forEach(f => f(this.lastValue));
    }

    public update(f: (value: T) => T) {
        const value = f(this.getValue());
        if (this.onChange) {
            this.onChange(value);
        }
        this.notify(value);
    };

    delete() {
        console.log('删除根节点')
    };
}


// type FormCoreRootOptions = {
//     initValue: Record<string, any>;
// }
//
// export class FormCoreRoot<T=any> implements FormCoreRootInterface<T>{
//     static defaultOptions: FormCoreRootOptions = {
//         initValue: {}
//     };
//     private options: FormCoreRootOptions;
//
//     constructor(options: Partial<FormCoreRootOptions>) {
//         this.options = {
//             ...FormCoreRoot.defaultOptions,
//             ...options,
//         }
//     }
//
//     subSet = new Set<(value: any) => void>();
//
//     updateByPath(path: string) {
//
//     }
//
//     notify(value:any){
//         this.subSet.
//     }
//
//     subscribeByPath(f: (value: any) => void) {
//         this.subSet.add(f);
//     }
// }
