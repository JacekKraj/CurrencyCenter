import React from 'react';
import { Field, useField } from 'formik';

import classes from './formikTextInput.module.scss';

interface Props {
  name: string;
  type: string;
  placeholder?: string;
  as: React.FC<any>;
  description: string;
}

const FormikTextInput: React.FC<Props> = (props) => {
  const [field] = useField(props);

  return (
    <div className={classes.formikTextInput}>
      <span className={classes.description}>{props.description}</span>
      <Field {...field} {...props} />
    </div>
  );
};

export default FormikTextInput;
