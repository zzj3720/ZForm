import {ErrorType, FormCoreNodeInterface} from "../core";
import * as React from "react";

export const FormCoreContext = React.createContext<FormCoreNodeInterface | undefined>(undefined);
export const FormCoreProvider = FormCoreContext.Provider;

export const useFormCore = () => {
    const formCore = React.useContext(FormCoreContext);
    if (formCore == null) {
        throw new Error('上下文中不存在 FormCoreContext');
    }
    return formCore;
};

export const useValue = (formCoreNode: FormCoreNodeInterface) => {
    const [value, setValue] = React.useState(() => formCoreNode.getValue());
    React.useEffect(() => {
        let pre: any;
        return formCoreNode.subscribe(newVal => {
            if (pre !== newVal) {
                pre = newVal;
                setValue(newVal);
            }
        })
    }, []);
    return value;
};


export const useError = (formCore: FormCoreNodeInterface): ErrorType => {
    const [value, setValue] = React.useState(() => formCore.getError());
    React.useEffect(() => {
        let pre: any;
        return formCore.subscribeError((v) => {
            if (pre !== v) {
                setValue(v);
                pre = v;
            }
        });
    }, []);
    return value;
};
