exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          user_email: "alanpjordan@gmail.com",
          user_username: "eljordy",
          user_first_name: "Alan",
          user_surname: "Jordan",
          user_password:
            "$2a$10$lnPF9CbdjY5hLCq39avC6OVUNN8okk6WS/kOcmoNiRoS4MDysM64G"
        },
        {
          user_email: "fail@gmail.com",
          user_username: "test123",
          user_first_name: "GI",
          user_surname: "Joe",
          user_password:
            "$2a$10$lnPF9CbdjY5hLCq39avC6OVUNN8okk6WS/kOcmoNiRoS4MDysM64G"
        },
        {
          user_email: "optimus@gmail.com",
          user_username: "matrix123",
          user_first_name: "Optimus",
          user_surname: "Prime",
          user_password:
            "$2a$10$lnPF9CbdjY5hLCq39avC6OVUNN8okk6WS/kOcmoNiRoS4MDysM64G"
        }
      ]);
    });
};
