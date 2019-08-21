// /* tslint:disable:max-classes-per-file */
// /* tslint:disable:no-use-before-declare */
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form';
import * as React from 'react';
import { Container } from '../react';

export const ZForm = React.forwardRef<
  Container,
  Omit<FormProps, 'onChange'> & {
      initValue?: Record<string, any>;
      onChange?(value: Record<string, any>): void;
      value?: any;
  }
>(
  (
    {
      children,
      initValue,
      onChange,
      value,
      ...props
    }: Omit<FormProps, 'onChange'> & {
        initValue?: Record<string, any>;
        onChange?(value: Record<string, any>): void;
        value?: any;
    },
    ref: any,
  ) => {
      return (
      <Form {...props}>
        <Container ref={ref} value={value} initValue={initValue} onChange={onChange}>
          {children}
        </Container>
      </Form>
    );
  },
);
