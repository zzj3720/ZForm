import {swapByIndex} from './ArrayUtils';
import {AllFormCoreNodeInterface} from './Types';

export class ArrayMethodImpl {
    constructor(public formCore: AllFormCoreNodeInterface) {
        this.formCore = formCore;
    }

    public getIndex(): number {
        return this.formCore.path as number;
    }

    public delete() {
        this.formCore.delete();
    }

    public getArray() {
        const parent = this.formCore.getParent();
        if (!parent) {
            return [];
        }

        return parent.getValue();
    }

    public moveTo(index: number) {
        const parent = this.formCore.getParent();
        if (!parent) {
            return;
        }
        parent.update((arr) => {
            return swapByIndex(arr, this.getIndex(), index);
        });
    }
}
