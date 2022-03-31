import React from 'react';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

import AuthWrapper from '../authWrapper/AuthWrapper';
import FormikTextInput from '../../utility/formik/FormikTextInput';
import classes from './../forms.module.scss';
import Button from './../../utility/button/Button';
import FormInfo from '../formInfo/FormInfo';
import { AuthContext } from '../../../context/providers/AuthContextProvider';
import Error from '../../utility/error/Error';
import { AuthErrors } from '../../../utilities/errorsTexts/auth';

const SignUp: React.FC = () => {
  const { register, errorMessage } = React.useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
    passwordRepeat: '',
  };

  const hasErrors = (errors: FormikErrors<typeof initialValues>) => {
    const hasFormErrors = Object.keys(errors).length !== 0;
    const hasFirebaseErrors = errorMessage !== AuthErrors.EMAIL_NOT_VERIFIED && errorMessage;
    return hasFormErrors || hasFirebaseErrors;
  };

  const allFieldsWereTouched = (touched: FormikTouched<typeof initialValues>) => {
    return Array.from(Object.values(touched)).filter((wasTouched) => wasTouched).length === Object.keys(initialValues).length;
  };

  const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email(AuthErrors.INVALID_EMAIL),
    password: Yup.string().min(5, AuthErrors.SHORT_PASSWORD).max(15, AuthErrors.LONG_PASSWORD),
    passwordRepeat: Yup.string().oneOf([Yup.ref('password')], AuthErrors.PASSWORDS_NOT_EQUAL),
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
            <Form data-test='signup-form'>
              <FormikTextInput type='email' name='email' description='E-mail address' />
              <FormikTextInput type='password' name='password' description='Password' />
              <FormikTextInput type='password' name='passwordRepeat' description='Password repeat' />
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
