export interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
}

export const validRegistration: RegistrationData = {
  fullName: 'Taylor Example',
  email: 'taylor@example.test',
  password: 'StrongPass123!',
};

export const invalidEmailRegistration: RegistrationData = {
  ...validRegistration,
  email: 'not-an-email',
};
