export const findUserByEmail = (connection, user_email) => {
  return connection("users")
    .where("user_email", user_email)
    .catch(err => {
      return new Error(`Error: ${err}`);
    });
};
