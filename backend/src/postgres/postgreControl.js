const {
  delete_expenditure_from_db,
  data_insert_to_expendituredb,
  update_total_deletion,
  expendituredb_data_select_specific,
} = require("./postgre.js");

async function utc_to_ist(date_time) {
  // Given UTC time
  const utcTime = new Date(date_time);

  // Convert UTC time to IST (Indian Standard Time)
  const istTime = utcTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // console.log(istTime); // Output: 08/04/2024, 17:25:15
  return istTime;
}

function get_time() {
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    ", " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  console.log(datetime);
  return datetime;
}

async function reduce_total(id) {
  let amount = await expendituredb_data_select_specific(id);
  console.log(amount[0]["amount"]);
  try {
    parseInt(amount[0]["amount"]);
    update_total_deletion(amount[0]["amount"]);
  } catch (error) {
    console.error(error.stack);
  }
}

// ? correct way to insert to db
async function insert_expense(reason, amount) {
  data_insert_to_expendituredb(reason, parseInt(amount), get_time()).then(
    (result) => {
      if (result) {
        console.log("INSERT | SUCCESS : " + reason);
        return result;
      }
    }
  );
}

// ^ correct way to insert to db

//  ? correct wayt to delete from db
const delete_expense = async (id) => {
  delete_expenditure_from_db((id = id)).then((result) => {
    if (result) {
      console.log("EXPENSE | DELETED : ", id);
    }
  });
};
// ^ correct wayt to delete from db

const a = async () => {
  await delete_expense("swartpilen 401");
};

// a();

module.exports = {
  insert_expense,
  delete_expense,
  utc_to_ist,
  reduce_total,
};
