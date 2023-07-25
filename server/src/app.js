// contains the business logic for the app.

const express= require("express");
const dotenv= require("dotenv");
const cors= require("cors");
const dbConnect= require("./config/dbConnect");

const {errorHandler, notFound} = require("./middlewares/errorMiddleware");

const userRoute= require("./routes/users/usersRoute");
const incomeRoute= require("./routes/income/incomeRoute");
const expenseRoute= require("./routes/expenses/expenseRoute");
const accountStatsRoute= require("./routes/accountStatsRoute/accountStatsRoute");

const app= express();
//env
dotenv.config();

//database connection
dbConnect();

app.use(express.json());
app.use(cors());
// User Routes
app.use("/api/users", userRoute); 

//Account Statistics Route
app.use("/api/accounts-statistics", accountStatsRoute);

// Income Routes
app.use("/api/income", incomeRoute);

//Expenses Route
app.use("/api/expenses", expenseRoute);

// Errors
app.use(notFound);
app.use(errorHandler);

module.exports= app;

 