// ! SRC : PART 1 : https://www.youtube.com/watch?v=fbYExfeFsI0
// ! PART 2 : https://www.youtube.com/watch?v=iz37fDe1XoM

const { MongoClient } = require("mongodb");
const { listenerCount } = require("process");

async function listDatabases(client) {
  // ? For listing databases
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

// ^ LISTING CREATION BELOW
async function createListing(client, newListing) {
  const results = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);
  console.log(results.insertedId);
}

async function createMultipleListings(client, newListings) {
  const results = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);
  console.log(results.insertedCount);
  console.log(results.insertedIds);
}
// ^ LISTING CREATION ABOVE
// & LISTING READING BELOW
async function findOneListingByName(client, name) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: name });
  if (result) {
    console.log(`found`);
    console.log(result);
  } else {
    console.log(`Not found`);
  }
}
// & LISTING READING ABOVE

async function main() {
  // ? For connecting with Mongo DB and retreiving data
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://hcsncrit:HLLhcs987@mis-dashboard.kwjsvsc.mongodb.net/?retryWrites=true&w=majority&appName=MIS-Dashboard";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    // await listDatabases(client);

    // await createListing(client, {
    //   name: "A",
    //   summary: "work in progress",
    //   bedrooms: 1,
    //   bathrooms: 1,

    // });

    // await createMultipleListings(client, [
    //   {
    //     name: "AA",
    //     summary: "work in progress",
    //     bedrooms: 1,
    //     bathrooms: 1,
    //     last_review: new Date(),
    //   },
    //   {
    //     name: "B",
    //     summary: "working in progress",
    //     bedrooms: 3,
    //     bathrooms: 6,
    //     beds: 5,
    //   },
    //   {
    //     name: "C",
    //     summary: "works in progress",
    //     bedrooms: 2,
    //     bathrooms: 4,
    //   },
    // ]);

    // await findOneListingByName(client, "C");
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
