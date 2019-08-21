import * as React from "react";
import 'antd/dist/antd.css';
import {Container} from "../src/ZForm/react/Container";
import {FieldWrapper} from "../src/ZForm/react/FieldWrapper";
import {Field} from "../src/ZForm/react/Field";
import {ArrayField, ArrayFieldAdd, ArrayFieldDelete} from "../src/ZForm/react/ArrayField";

const Box = ({children}: React.PropsWithChildren<{}>) => {
    return <div style={{marginLeft: 20}}>
        {children}
    </div>
};

const Dog = () => {
    return <div>
        <Field field="name">
            名字:
            <FieldWrapper>
                <input/>
            </FieldWrapper>
        </Field>
        <br/>
        <Field field="idCard">
            身份证:
            <FieldWrapper>
                <IdCard/>
            </FieldWrapper>
        </Field>
    </div>
};

const IdCard = () => {
    return <div>
        <Field field="id">
            号码:
            <FieldWrapper>
                <input/>
            </FieldWrapper>
        </Field>
        <Field field="address">
            地址:
            <FieldWrapper>
                <input/>
            </FieldWrapper>
        </Field>
    </div>
};

const People = () => {
    return <div>
        <Field field="name">
            名字:
            <FieldWrapper>
                <input/>
            </FieldWrapper>
        </Field>
        <Field field="dogs">
            <Box>
                <ArrayField>
                    <ArrayFieldDelete>删除狗狗</ArrayFieldDelete>
                    <Dog/>
                </ArrayField>
            </Box>
            <ArrayFieldAdd>
                添加狗狗
            </ArrayFieldAdd>
        </Field>
        <Field field="children">
            <Box>
                <ArrayField>
                    <ArrayFieldDelete>删除孩子</ArrayFieldDelete>
                    <People/>
                </ArrayField>
            </Box>
            <ArrayFieldAdd>
                添加孩子
            </ArrayFieldAdd>
        </Field>
    </div>
};

export default () => {
    const [state, setState] = React.useState({});
    return <Container initValue={state} onChange={setState}>
        <People/>
        <pre>
            {JSON.stringify(state, null, 2)}
        </pre>
    </Container>
}
