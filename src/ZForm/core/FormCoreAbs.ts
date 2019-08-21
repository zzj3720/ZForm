import {
    AllFormCoreNodeInterface,
    ErrorType,
    FormCoreNodeInterface,
    FormCoreRootInterface,
    ValidationRule
} from "./Types";
// import {FormCoreNode} from "./FormCoreNode";

export abstract class FormCoreAbstract<T> implements AllFormCoreNodeInterface<T> {
    abstract root: FormCoreRootInterface;

    children: Record<string, AllFormCoreNodeInterface> = {};

    abstract getParent(): AllFormCoreNodeInterface | void;

    abstract readonly path: string | number;
    abstract readonly pathArray: Array<string | number>;
    abstract readonly pathString: string;

    abstract update(f: (value: T) => T): void;

    abstract subscribe(f: (value: T) => void): () => void;

    abstract getValue(): T | void;

    abstract delete(): void;


    abstract validateWithAllParent(): Promise<ErrorType[]>;

    getPath(): Array<string | number> {
        return this.pathArray;
    };

    setRules(rules: ValidationRule[]): void {
        this.root.setRulesByPath(this.pathString, rules);
    };

    validate(): Promise<ErrorType> {
        return this.root.validateByPath(this.pathString, this.path, this.getValue());
    };

    subscribeError(f: (v: any) => void): () => void {
        return this.root.subscribeErrorByPath(this.pathString, f);
    };

    async validateWithAllChildren(): Promise<ErrorType[]> {
        const result = await Promise.all(Object.values(this.children).map((v) => v.validateWithAllChildren()));
        return result.flat();
    };

    getError(): ErrorType {
        return this.root.getErrorByPath(this.pathString);
    };

    abstract byPath<P = any>(path: string | number): FormCoreNodeInterface<P>
    // 循环依赖了。。。。。。。
    // {
    //     if (!this.children[path]) {
    //         this.children[path] = new FormCoreNode(this, path, this.root);
    //     }
    //     return this.children[path];
    // };

}
