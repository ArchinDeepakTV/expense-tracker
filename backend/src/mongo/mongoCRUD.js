const { collection } = require("firebase/firestore");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { listenerCount } = require("process");

// const DB_NAME = "expenses";
// const collection_name = "expense_tracker";

// ! FOR LISTING VARIOUS DATABASES
// ? ACTUALLY USELESS FOR THIS PROJECT. because we are dealing with a single DB
async function listDatabases(client) {
  //   ? For listing databases
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function create_expense_listing(client, newListing) {
  const result = await client
    .db("expenses")
    .collection("expense_tracker")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
  return result.insertedId;
}

// ! FIND LISTING
async function find_expense_listing(client, name_of_listing) {
  let DB_NAME = "expenses";
  let collection_name = "expense_tracker";
  const result = await client
    .db(DB_NAME)
    .collection(collection_name)
    .findOne(name_of_listing);
  if (result) {
    console.log(`found`);
    console.log(result);
    return result;
  } else {
    console.log(`Not found`);
  }
}

async function find_expenses_listing(client) {
  const result = client.db("expenses").collection("expense_tracker").find({});
  if (result) {
    console.log(`found`);
    console.log(result);
    return result;
  } else {
    console.log(`Not found`);
  }
}

// ! DELETE LISTING
async function delete_listing_by_name(client, nameOfListing) {
  const result = await client
    .db(DB_NAME)
    .collection(collection_name)
    .deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

module.exports = {
  create_expense_listing,
  find_expense_listing,
  find_expenses_listing,
  delete_listing_by_name,
};
