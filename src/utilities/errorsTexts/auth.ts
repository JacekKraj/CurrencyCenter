export enum AuthErrors {
  EMAIL_NOT_VERIFIED = "You haven't verify your email address yet, please verify to sign in.",
  INVALID_EMAIL = 'It does not seem to be a valid email address.',
  SHORT_PASSWORD = 'Password must have at least 5 characters.',
  LONG_PASSWORD = 'Password must not have more than 15 characters.',
  PASSWORDS_NOT_EQUAL = 'Both passwords must be equal.',
}
