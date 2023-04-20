import mysql from "mysql";

const DB_USER = "root";
const DB_PASS = "";
const DB_NAME = "buy-and-sell";
const DB_SERV = "localhost";

const connection = mysql.createConnection({
  host: DB_SERV,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

export const db = {
  connect: () => connection.connect(),
  query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
      connection.query(queryString, escapedValues, (error, results, fields) => {
        if (error) reject(error);
        resolve({ results, fields });
      });
    }),
  end: () => connection.end(),
};
