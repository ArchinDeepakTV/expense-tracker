require("dotenv").config();
const { MongoClient } = require("mongodb");
const { listenerCount } = require("process");
const {
  create_expense_listing,
  find_expense_listing,
  find_expenses_listing,
  delete_listing_by_name,
} = require("./mongoCRUD.js");

// * CREATE MAIN BELOW
async function new_expense_listing(new_expense) {
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    await create_expense_listing(client, new_expense);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
// * CREATE MAIN ABOVE

// ^ ---------------------------------------------

// * DETAILS MAIN BELOW
async function find_expense_details() {
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri);
  let res = "";
  try {
    await client.connect();
    res = await find_expense_listing(client, (name_of_listing = "bread"));
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
  return res;
}

async function find_all_expense_details() {
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri);
  let res = "";
  try {
    await client.connect();
    res = await find_expenses_listing(client);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
  return res;
}
// * DETAILS MAIN ABOVE

// ^ ---------------------------------------------

// * DELETE MAIN BELOW
async function delete_expense(name_to_delete) {
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    await delete_listing_by_name(client, name_to_delete);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
let name_to_delete = "AIIMS BILASPUR";
// * DELETE MAIN ABOVE

// ^ ---------------------------------------------

// * UPDATE MAIN BELOW

module.exports = {
  new_expense_listing,
  find_expense_details,
  find_all_expense_details,
  delete_expense,
};

async function a() {
  let new_expense = {
    name: "xm5",
    amount: 25000,
  };
  await new_expense_listing(new_expense);
}
a();
// ^ DB_URL=postgres://admins:HLLhcs987@127.0.0.1/hindlabs

// async function expenseFinder() {
//   let results = await find_all_expense_details();
//   if (results.length > 0) {
//     results.forEach((result, i) => {
//       console.log();
//       console.log(`   _id: ${result._id}`);
//       console.log(`   name: ${result.name}`);
//       console.log(`   amount: ${result.amount}`);
//     });
//   }
// }
// expenseFinder();
