import React from 'react';
import { Formik, Form } from 'formik';

import AuthWrapper from '../authWrapper/AuthWrapper';
import FormikTextInput from '../../utility/formik/FormikTextInput';
import Input from '../../utility/input/Input';
import Button from '../../utility/button/Button';
import classes from './../forms.module.scss';
import FormInfo from '../formInfo/FormInfo';

const SignIn: React.FC = () => {
  const initialValues = {
    emial: '',
    password: '',
  };

  return (
    <AuthWrapper>
      <h3 className={classes.authModalTitle}>Sign In</h3>
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
              <Button className={classes.buttonAdditional}>Sign in</Button>
            </Form>
          );
        }}
      </Formik>
      <FormInfo question="Don't have an account yet?" answer='Open a free account' path='SignUp' />
    </AuthWrapper>
  );
};

export default SignIn;
