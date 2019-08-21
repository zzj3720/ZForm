import * as React from "react";
import {FormCoreContext, FormCoreProvider, useValue} from "./Context";

export const ArrayField = ({children}: React.PropsWithChildren<{}>) => {
    const formCore = React.useContext(FormCoreContext);
    if (!formCore) {
        throw new Error('上下文中不存在 FormCore');
    }
    const value = useValue(formCore);
    if (!Array.isArray(value)) {
        return null;
    }
    return <>
        {value.map((_, index) => {
            const nextFormCore = formCore.byPath(index);
            return <FormCoreProvider key={index} value={nextFormCore}>
                {children}
            </FormCoreProvider>
        })}
    </>
};

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ArrayFieldAdd = ({value, ...props}: { value?: any } & DivProps) => {
    const formCore = React.useContext(FormCoreContext);
    if (!formCore) {
        throw new Error('上下文中不存在 FormCore');
    }
    return <div {...props} onClick={(e) => {
        formCore.update(arr => [...(arr || []), value]);
        props.onChange && props.onChange(e);
    }}>
        {props.children}
    </div>
};


export const ArrayFieldDelete = (props: { value?: any } & DivProps) => {
    const formCore = React.useContext(FormCoreContext);
    if (!formCore) {
        throw new Error('上下文中不存在 FormCore');
    }
    return <div {...props} onClick={(e) => {
        formCore.delete();
        props.onChange && props.onChange(e);
    }}>
        {props.children}
    </div>
};
