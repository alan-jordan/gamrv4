export const findUserByEmail = email =>
  connection("users").where("email", email);
