import knex from "knex";
import { findUserByEmail } from "../users";
const config = require("../../../knexfile").test;

beforeEach(() => {
  const connection = knex(config);
  connection.migrate.latest().then(() => {
    connection.seed.run();
  });
});

afterEach(() => {
  connection.destroy();
});

describe("testing findUserByEmail", () => {
  it("should return the db entry for alanpjordan@gmail.com when that is passed", () => {
    expect(findUserByEmail(connection, "alanpjordan@gmail.com"));
  });
});
