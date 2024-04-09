const { Client } = require("pg");

const connect_client = () => {
  // * CONNECTING
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL database");
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err);
    });
};

const close_connection = () => {
  // * CONNECTION CLOSING
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  client
    .end()
    .then(() => {
      console.log("Connection to PostgreSQL closed");
    })
    .catch((err) => {
      console.error("Error closing connection", err);
    });
  return 1;
};

const read_total = async () => {
  // * SELECTING DATA from expenses
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  const query = `SELECT * FROM totals`;
  try {
    await client.connect();
    const { rows } = await client.query(query);
    // console.log(rows);
    console.log("FETCH | SUCCESS");
    return rows;
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end(); // closes connection
  }
};

const update_total_addition = async (new_insert_amount) => {
  // * SELECTING DATA from expenses
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  let old_amount = await read_total();
  new_insert_amount =
    parseInt(new_insert_amount) + parseInt(old_amount[0]["total"]);
  const query = `UPDATE totals SET total = ${new_insert_amount}`;
  try {
    await client.connect();
    const { rows } = await client.query(query);
    // console.log(rows);
    console.log("UPDATE| TOTAL | SUCCESS");
    return rows;
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end(); // closes connection
  }
};

const update_total_deletion = async (reduction_amount) => {
  // * SELECTING DATA from expenses
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  let old_total = await read_total();
  reduction_amount = parseInt(old_total[0]["total"]) - reduction_amount;
  const query = `UPDATE totals SET total = ${reduction_amount}`;
  try {
    await client.connect();
    await client.query(query);
    // console.log(rows);
    console.log("UPDATE | TOTAL | SUCCESS");
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end(); // closes connection
  }
};

const expendituredb_data_select = async () => {
  // * SELECTING DATA from expenditure
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  const query = `SELECT * FROM expenditure`;
  try {
    await client.connect();
    const { rows } = await client.query(query);
    // console.log(rows);
    console.log("FETCH | SUCCESS");
    return rows;
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end(); // closes connection
  }
};

const expendituredb_data_select_specific = async (id) => {
  // * SELECTING DATA from expenditure
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  const query = `SELECT amount FROM "expenditure" WHERE "id" = ${id}`;
  try {
    await client.connect();
    const { rows } = await client.query(query);
    // console.log(rows);
    console.log("FETCH | AMOUNT | SUCCESS");
    return rows;
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end(); // closes connection
  }
};

const data_insert_to_expendituredb = async (
  reason_of_expenditure,
  amount,
  created_time
) => {
  // * INSERTING DATA to expenditure
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  try {
    await client.connect(); // gets connection
    await client.query(
      `INSERT INTO "expenditure" ("reason", "amount","created_time")
             VALUES ($1, $2, $3)`,
      [reason_of_expenditure, amount, created_time]
    ); // sends queries
    console.log("INSERT | SUCCESS");
    return true;
  } catch (error) {
    console.error(error.stack);
    console.log(reason_of_expenditure);
    return false;
  } finally {
    close_connection();
  }
};

const delete_expenditure_from_db = async (id) => {
  //  * DELETING DATA from expenditure
  const client = new Client({
    user: "admins",
    host: "localhost",
    database: "expenses",
    password: "HLLhcs987",
    port: 5432, // Default PostgreSQL port
  });
  try {
    await client.connect(); // gets connection
    await client.query(`DELETE FROM "expenditure" WHERE "id" = $1`, [id]); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end(); // closes connection
  }
};

// ^ EXECUTIONS --------------------------------------------------------------------------------------------------------------------------------------------------------
// ^ EXECUTIONS --------------------------------------------------------------------------------------------------------------------------------------------------------
// ^ EXECUTIONS --------------------------------------------------------------------------------------------------------------------------------------------------------
// ^ EXECUTIONS --------------------------------------------------------------------------------------------------------------------------------------------------------
// ^ EXECUTIONS --------------------------------------------------------------------------------------------------------------------------------------------------------
// ^ EXECUTIONS --------------------------------------------------------------------------------------------------------------------------------------------------------

//  ? correct wayt to delete from db
// delete_center_from_db((center_name = "AIIMS BILASPUR")).then((result) => {
//   if (result) {
//     console.log("CENTER | DELETED | CENTERsDB");
//   }
// });
// ^ correct wayt to delete from db

// ? correct way to insert to db
// data_insert_to_districtsdb(
//   (district_name = "GURGAON"),
//   (state_name = "HARYANA"),
//   (date_of_initiation = "April 2018"),
//   (district_info =
//     "fbghjdfknmldkvmnbbdhdkdvgdsgbdbdadlkkajjhfsytdiyfjkefkvjacavnkdfjehifgieg")
// ).then((result) => {
//   if (result) {
//     console.log("INSERT | SUCCESS | DISTRICTsDB");
//   }
// });
// ^ correct way to insert to db

// districtsdb_data_select();

module.exports = {
  expendituredb_data_select,
  expendituredb_data_select_specific,
  delete_expenditure_from_db,
  data_insert_to_expendituredb,
  read_total,
  update_total_addition,
  update_total_deletion,
};
