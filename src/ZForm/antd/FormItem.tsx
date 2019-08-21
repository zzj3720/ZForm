/* tslint:disable:no-use-before-declare */
import {Form as AntdForm} from 'antd';
import {FormItemProps, ValidationRule} from 'antd/lib/form';
import * as React from 'react';
import {Field, FieldProps, WithError} from '../react';

const AntdFormItem = AntdForm.Item;
export const ZFormItem = (
    {
        field,
        rules,
        children,
        autoDelete,
        ...props
    }: React.PropsWithChildren<FormItemProps &
        FieldProps & {
        rules?: ValidationRule[];
    }>) => {
    return (
        <Field autoDelete={autoDelete} field={field}>
            <WithError rules={rules}>
                {(error, formCore, required) => {
                    console.log(required);
                    return (
                        <AntdFormItem help={error ? error.help : []} validateStatus={error && error.status as any}
                                      required={required} {...props}>
                            {children}
                        </AntdFormItem>
                    );
                }}
            </WithError>
        </Field>
    );
};
