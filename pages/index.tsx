import * as React from "react";
import 'antd/dist/antd.css';
import {ArrayField, ArrayFieldAdd, ArrayFieldDelete, Field, FieldWrapper} from "../src/ZForm/react";
import {ZForm, ZFormItem} from "../src/ZForm/antd";
import {Input} from "antd";
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const Box = ({children}: React.PropsWithChildren<{}>) => {
    return <div style={{marginLeft: 20}}>
        {children}
    </div>
};

const Dog = () => {
    return <div>
        <ZFormItem label="名字" rules={[{required: true, message: '名字必填'}]} field="name">
            <FieldWrapper>
                <Input/>
            </FieldWrapper>
        </ZFormItem>
        <br/>
        <ZFormItem label="身份证" field="idCard">
            <FieldWrapper>
                <IdCard/>
            </FieldWrapper>
        </ZFormItem>
    </div>
};

const IdCard = () => {
    return <div>
        <ZFormItem label="号码" field="id">
            <FieldWrapper>
                <Input/>
            </FieldWrapper>
        </ZFormItem>
        <ZFormItem label="地址" field="address">
            <FieldWrapper>
                <Input/>
            </FieldWrapper>
        </ZFormItem>
    </div>
};

const People = () => {
    return <div>
        <ZFormItem label="名字" rules={[{required: true, message: '名字必填'}]} field="name">
            <FieldWrapper>
                <Input/>
            </FieldWrapper>
        </ZFormItem>
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
    return <ZForm {...formItemLayout} initValue={state} onChange={setState}>
        <People/>
        <pre>
            {JSON.stringify(state, null, 2)}
        </pre>
    </ZForm>
}
