export const findUserByEmail = (connection, email) => {
  return connection("users")
    .where("user_email", email)
    .on("query-error", (err, obj) => {
      return new Error(`Error: ${err}`);
    });
};
