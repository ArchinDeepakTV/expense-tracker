const cors = require("cors");
const express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");

// ! IMPORTS ABOVE
const app = express();
const PORT = process.env.PORT || 5050;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const {
  insert_expense,
  delete_expense,
  utc_to_ist,
  reduce_total,
} = require("./postgres/postgreControl");
const {
  expendituredb_data_select,
  read_total,
  update_total_addition,
} = require("./postgres/postgre");

// ! RENDER FUNCTIONS BELOW
app.post("/DB-insert", async (req, res) => {
  let name = req.body.name;
  let amount = req.body.amount;
  if (parseInt(amount) > 0) {
    await update_total_addition(amount);
    await insert_expense(name, amount);
  }

  res.status(200).json(`Inserted ${name} @ ${amount}`);
});

app.get("/select-from", async (req, res) => {
  let result = await expendituredb_data_select();
  if (result.length != 0) {
    let r = await utc_to_ist(result[0]["created_time"]);
    result[0]["created_time"] = r;
  }
  res.status(200).json(result);
});

app.get("/select-total", async (req, res) => {
  let total = await read_total();
  // console.log(total[0]["total"]);
  res.status(200).json(total);
});

app.post("/expense-delete", async (req, res) => {
  let id = req.body.id;
  await delete_expense(id);
  await reduce_total(id);
  res.status(200).json(`Deleted item @ ${id}`);
});

app.get("/", (req, res) => {
  res.status(200).json("Expense Tracker");
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
