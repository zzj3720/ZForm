import * as React from "react";
import {FormCoreProvider, useFormCore} from "./Context";

export type FieldProps<T = any> = {
    field: string;
    autoDelete?: boolean;
};
export const Field = ({field, children, autoDelete}: React.PropsWithChildren<FieldProps>) => {
    const formCore = useFormCore();
    const nextFormCore = formCore.byPath(`${field}`);
    React.useEffect(() => {
        if (autoDelete) {
            return () => {
                nextFormCore.delete();
            };
        }
    }, []);
    return <FormCoreProvider value={nextFormCore}>
        {children}
    </FormCoreProvider>;
};
