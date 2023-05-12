export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  birthdate: string;
  points: number;
  level: number;
  registrationDate: string;
}

export interface loginAuthResult {
  ok: boolean;
  id: number;
}
