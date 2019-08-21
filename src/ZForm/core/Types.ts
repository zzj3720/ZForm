export type FormCoreRootInterface<T = any> = {
    children: Record<string, FormCoreNodeInterface>;
    byPath<P = any>(path: string | number): FormCoreNodeInterface<P>;
    update(f: (value: T) => T): void;
    subscribe(f: (value: T) => void): () => void;
    getValue(): T | void;
    delete(): void;
}

export type FormCoreNodeInterface<T = any> = {
    children: Record<string, FormCoreNodeInterface>;
    byPath<P = any>(path: string | number): FormCoreNodeInterface<P>;
    update(f: (value: T) => T): void;
    subscribe(f: (value: T) => void): () => void;
    getValue(): T | void;
    delete(): void;
}
