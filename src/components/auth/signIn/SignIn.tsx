import React from 'react';
import { Formik, Form } from 'formik';

import { AuthContext } from '../../../context/providers/AuthContextProvider';
import AuthWrapper from '../authWrapper/AuthWrapper';
import FormikTextInput from '../../utility/formik/FormikTextInput';
import Input from '../../utility/input/Input';
import Button from '../../utility/button/Button';
import classes from './../forms.module.scss';
import FormInfo from '../formInfo/FormInfo';
import Error from '../../../utilities/error/Error';

const SignIn: React.FC = () => {
  const { authenticate, errorMessage } = React.useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
  };

  const submitForm = (values: typeof initialValues) => {
    authenticate(values.email, values.password);
  };

  return (
    <AuthWrapper>
      <h3 className={classes.authModalTitle}>Sign In</h3>
      <Formik initialValues={initialValues} onSubmit={submitForm}>
        {() => {
          return (
            <Form>
              <FormikTextInput type='email' name='email' description='E-mail address' as={Input} />
              <FormikTextInput type='password' name='password' description='Password' as={Input} />
              {errorMessage && <Error message={errorMessage} />}
              <Button className={classes.buttonAdditional} type='submit'>
                Sign in
              </Button>
            </Form>
          );
        }}
      </Formik>
      <FormInfo question="Don't have an account yet?" answer='Open a free account' path='SignUp' />
    </AuthWrapper>
  );
};

export default SignIn;
