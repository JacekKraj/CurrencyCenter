import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { act } from '@testing-library/react';

import AuthWrapper from './AuthWrapper';
import SignUp from './../signUp/SignUp';
import SignIn from '../signIn/SignIn';
import AuthContextProvider from '../../../context/providers/AuthContextProvider';
import React from 'react';
import { formikFindByInputName, findByTestAttr } from '../../../utilities/tests/testsUtilityFunctions';

jest.mock('firebase/auth', () => {
  const mockAuthRequest = jest.fn(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, 100);
    });
  });

  return {
    getAuth: jest.fn(() => {
      const { getAuth } = require('firebase/auth');
      return getAuth;
    }),
    signInWithEmailAndPassword: mockAuthRequest,
    createUserWithEmailAndPassword: mockAuthRequest,
  };
});

const setup = (Form: React.FC) => {
  return mount(
    <MemoryRouter>
      <AuthContextProvider>
        <AuthWrapper>
          <Form />
        </AuthWrapper>
      </AuthContextProvider>
    </MemoryRouter>
  );
};

describe('<AuthWrapper />', () => {
  const checkSpinnerExistance = (wrapper: ReactWrapper) => {
    wrapper.setProps({});
    const spinnerCoverage = findByTestAttr(wrapper, 'spinner-coverage');
    expect(spinnerCoverage.exists()).toBeTruthy();
  };

  it('shows spinner after submitting signup form', async () => {
    const wrapper = setup(SignUp);
    const emailInput = formikFindByInputName(wrapper, 'email');
    const passwordInput = formikFindByInputName(wrapper, 'password');
    const passwordRepeatInput = formikFindByInputName(wrapper, 'passwordRepeat');
    const signupForm = findByTestAttr(wrapper, 'signup-form').last();

    await act(async () => {
      emailInput.simulate('change', { target: { name: 'email', value: `test@test.com` } });
      passwordInput.simulate('change', { target: { name: 'password', value: 'testtest' } });
      passwordRepeatInput.simulate('change', { target: { name: 'passwordRepeat', value: 'testtest' } });
      signupForm.simulate('submit');
    });

    checkSpinnerExistance(wrapper);
  });

  it('shows spinner after submitting signin form', async () => {
    const wrapper = setup(SignIn);
    const emailInput = formikFindByInputName(wrapper, 'email');
    const passwordInput = formikFindByInputName(wrapper, 'password');
    const signinForm = findByTestAttr(wrapper, 'signin-form').last();

    await act(async () => {
      emailInput.simulate('change', { target: { name: 'email', value: `test@test.com` } });
      passwordInput.simulate('change', { target: { name: 'password', value: 'testtest' } });
      signinForm.simulate('submit');
    });

    checkSpinnerExistance(wrapper);
  });
});
