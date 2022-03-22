import React from 'react';
import { Formik, Form } from 'formik';

import AuthWrapper from '../authWrapper/AuthWrapper';
import FormikTextInput from '../../utility/formik/FormikTextInput';
import Input from '../../utility/input/Input';
import classes from './../forms.module.scss';
import Button from './../../utility/button/Button';
import FormInfo from '../formInfo/FormInfo';

const SignUp: React.FC = () => {
  const initialValues = {
    emial: '',
    password: '',
    passwordRepeat: '',
  };

  return (
    <AuthWrapper>
      <h3 className={classes.authModalTitle}>Sign Up</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          console.log('asd');
        }}
      >
        {() => {
          return (
            <Form>
              <FormikTextInput type='email' name='email' description='E-mail address' as={Input} />
              <FormikTextInput type='password' name='password' description='Password' as={Input} />
              <FormikTextInput type='password' name='passwordRepeat' description='Password repeat' as={Input} />
              <Button className={classes.buttonAdditional}>Open account</Button>
            </Form>
          );
        }}
      </Formik>
      <FormInfo question='Already have an account?' answer='Sign in' path='SignIn' />
    </AuthWrapper>
  );
};

export default SignUp;
