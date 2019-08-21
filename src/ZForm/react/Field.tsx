import * as React from "react";
import {FormCoreContext, FormCoreProvider, useValue} from "./Context";

export const Field = ({field, children}: React.PropsWithChildren<{ field: string }>) => {
    const formCore = React.useContext(FormCoreContext);
    if (!formCore) {
        throw new Error("上下文中不存在 FormCore");
    }
    const nextFormCore = formCore.byPath(`${field}`);
    return <FormCoreProvider value={nextFormCore}>
        {children}
    </FormCoreProvider>;
};
