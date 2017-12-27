import knex from "knex";
import { findUserByEmail } from "../users";
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

describe("testing findUserByEmail", () => {
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
    expect(() => findUserByEmail(noconnection, "test")).toThrowError();
  });
});
