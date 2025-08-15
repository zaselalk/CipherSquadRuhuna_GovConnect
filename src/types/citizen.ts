export interface CitizenData {
  fullName: string;
  NICNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  contactNumber: string;
}

// Define the response type for login
export type CitizenLoginResponse = {
  Citizen: Citizen;
  token: string;
};

// Define Citizen type inline
export type Citizen = {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth?: string;
  address?: string;
  contactNumber?: string;
  NICNumber?: string;
};