import knex from "knex";
import { findUserByEmail, findUsers, createUser } from "../users";
const config = require("../../../knexfile").test;

let connection = knex(config);

beforeAll(() => {
  return connection.migrate.latest().then(() => {
    return connection.seed.run();
  });
});

afterAll(() => {
  return connection.destroy();
});

describe("Testing findUserByEmail", () => {
  it("should return the db entry for alanpjordan@gmail.com when that is passed", () => {
    return findUserByEmail(connection, "alanpjordan@gmail.com").then(data => {
      expect(data[0].id).toBe(1);
      expect(data[0].user_first_name).toBe("Alan");
      expect(data[0].user_surname).toBe("Jordan");
    });
  });

  it("should error return an emptry array when a user is not found", () => {
    return findUserByEmail(connection, "alordan@gmail.com").then(data => {
      expect(data[0]).toBeFalsy();
    });
  });

  it("should throw an error when no connection is available", () => {
    let brokenConnection = knex(config);
    brokenConnection.destroy().then(async () => {
      await findUserByEmail(brokenConnection, "test").then(err => {
        expect(err).toMatchObject(
          new Error(`Error: Error: Unable to acquire a connection`)
        );
      });
    });
  });
});

describe("Testing findUsers", () => {
  it("should return an array of users 3 in length from the seeds", () => {
    return findUsers(connection).then(data => {
      expect(data).toHaveLength(3);
    });
  });

  it("should throw an error when no connection is available", () => {
    let brokenConnection = knex(config);
    brokenConnection.destroy().then(async () => {
      await findUsers(brokenConnection).then(err => {
        expect(err).toMatchObject(
          new Error(`Error: Error: Unable to acquire a connection`)
        );
      });
    });
  });
});

describe("Testing createUser", () => {
  const userDetails = {
    user_email: "test@test.com",
    user_username: "testUser",
    user_first_name: "testFirstName",
    user_surname: "userSurname",
    user_password: "fakeStreet123"
  };
  it("should insert a user when provided with a userDetails Object", () => {
    return createUser(connection, userDetails).then(returnValue =>
      expect(returnValue).toEqual([4])
    );
  });

  it("should throw an error when no connection is available", () => {
    let brokenConnection = knex(config);
    brokenConnection.destroy().then(async () => {
      await createUser(brokenConnection, userDetails).then(err => {
        expect(err).toMatchObject(
          new Error(`Error: Error: Unable to acquire a connection`)
        );
      });
    });
  });

  it("should have the new user in the database", () => {
    return findUserByEmail(connection, "test@test.com").then(data => {
      expect(data[0].user_username).toBe("testUser");
      expect(data[0].user_surname).toBe("userSurname");
    });
  });
});
