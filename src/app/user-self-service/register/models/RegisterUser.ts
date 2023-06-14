export interface RegisterUser {
  success:   boolean;
  response:  Response;
  message:   null;
  timestamp: Date;
}

export interface Response {
  userId:       number;
  forenames:    null;
  surname:      null;
  emailAddress: string;
  telephone:    null;
  dateOfBirth:  null;
}
