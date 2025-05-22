export const STEPS = {
  SIGNUP: 'signup',
  SIGNIN: 'signin',
  VERIFY_IDENTITY: 1,
  VERIFY_PHONE: 2,
  ENTER_CODE: 3,
  KYC_VERIFICATION: 4,
  INCLUDE_PHOTO: 5,
  VERIFICATION_PENDING: 6
};

export const STEP_NAMES = {
  [STEPS.SIGNUP]: 'Sign Up',
  [STEPS.SIGNIN]: 'Sign In',
  [STEPS.VERIFY_IDENTITY]: 'Verify Identity',
  [STEPS.VERIFY_PHONE]: 'Verify Phone',
  [STEPS.ENTER_CODE]: 'Enter Code',
  [STEPS.KYC_VERIFICATION]: 'KYC Verification',
  [STEPS.INCLUDE_PHOTO]: 'Include Photo',
  [STEPS.VERIFICATION_PENDING]: 'Verification Pending'
}; 