export interface Response {
  success:   boolean;
  response:  User | null;
  message:   string |null;
  timestamp: Date;
}

export interface User {
  userId:       number;
  forenames:    string | null;
  surname:      string | null;
  emailAddress: string;
  telephone:    string | null;
  dateOfBirth:  string | null;
}
