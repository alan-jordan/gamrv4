export const findUserByEmail = (connection, email) =>
  connection("users").where("email", email);
