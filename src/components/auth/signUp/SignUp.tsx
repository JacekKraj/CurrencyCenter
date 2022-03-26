import React from 'react';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

import AuthWrapper from '../authWrapper/AuthWrapper';
import FormikTextInput from '../../utility/formik/FormikTextInput';
import Input from '../../utility/input/Input';
import classes from './../forms.module.scss';
import Button from './../../utility/button/Button';
import FormInfo from '../formInfo/FormInfo';
import { AuthContext } from '../../../context/providers/AuthContextProvider';
import Error from '../../../utilities/error/Error';

const SignUp: React.FC = () => {
  const { register, errorMessage } = React.useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
    passwordRepeat: '',
  };

  const hasErrors = (errors: FormikErrors<typeof initialValues>) => {
    return Object.keys(errors).length !== 0 || errorMessage;
  };

  const allFieldsWereTouched = (touched: FormikTouched<typeof initialValues>) => {
    return Array.from(Object.values(touched)).filter((wasTouched) => wasTouched).length === Object.keys(initialValues).length;
  };

  const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email('It does not seem to be a valid email address.'),
    password: Yup.string().min(5, 'Password must have at least 5 characters.').max(15, 'Password must not have more than 15 characters.'),
    passwordRepeat: Yup.string().oneOf([Yup.ref('password')], 'Both passwords must be equal.'),
  });

  const submitForm = (values: typeof initialValues) => {
    register(values.email, values.password);
  };

  return (
    <AuthWrapper>
      <h3 className={classes.authModalTitle}>Sign Up</h3>
      <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={signUpValidationSchema}>
        {({ errors, touched }) => {
          return (
            <Form>
              <FormikTextInput type='email' name='email' description='E-mail address' as={Input} />
              <FormikTextInput type='password' name='password' description='Password' as={Input} />
              <FormikTextInput type='password' name='passwordRepeat' description='Password repeat' as={Input} />
              {hasErrors(errors) && allFieldsWereTouched(touched) && (
                <Error message={errors.email || errors.password || errors.passwordRepeat || errorMessage} />
              )}
              <Button className={classes.buttonAdditional} type='submit'>
                Open account
              </Button>
            </Form>
          );
        }}
      </Formik>
      <FormInfo question='Already have an account?' answer='Sign in' path='SignIn' />
    </AuthWrapper>
  );
};

export default SignUp;
