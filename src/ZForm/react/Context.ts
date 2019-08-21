import {FormCoreNodeInterface} from "../core/Types";
import * as React from "react";

export const FormCoreContext = React.createContext<FormCoreNodeInterface | undefined>(undefined);
export const FormCoreProvider = FormCoreContext.Provider;

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

