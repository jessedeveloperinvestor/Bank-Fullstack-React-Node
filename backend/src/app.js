import express from "express";
import morgan from "morgan";
import * as consign from 'consign';
import awsIot from 'aws-iot-device-sdk';
import { MongoClient } from "mongodb";
import cron  from 'node-cron';
import ObjectsToCsv from 'objects-to-csv';
import reader from 'xlsx';
import XLSX from 'xlsx';
import moment from 'moment';
import nodemailer from 'nodemailer';

import { Admin } from "../src/models/Admin.js";

const app = express();

// Import routes
import adminRoutes from "./routes/admin.routes.js";
import groupsRoutes from "./routes/groups.routes.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";
import old_productsRoutes from "./routes/old_products.routes.js";
import loginRoutes from "./routes/login.routes.js";
import iotRoutes from "./routes/iot.routes.js";

// Schedule tasks to be run on the server.
cron.schedule('* * * * * *', function() {//Production: '* 2 * * 6' Saturday at 3 am
  // QUERY MONGODBS:
  var url = "mongodb://localhost:27017/";//"mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.4.2";
  var timeNow = new Date();
  var timeNowSeconds = (timeNow.getTime())/1000;
  var oldestTimeToSave = timeNowSeconds - 7776000;//7776000 seconds = 90 days
  // var query = { ts: { $lt: oldestTimeToSave } };//$gte:timeNowSeconds
  var query = { ts: { $gte: 1 } };//DEVELOPMENT ENVIRONMENT
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hionmultscan");
    dbo.collection("bms").find(query).toArray(function(err, result) {
      if (err) throw err;
      global.idsList = [];
      for (var l = 0; l < result.length; l++) {
        if (idsList[idsList.length] != result[l].id) {
          idsList[idsList.length] = result[l].id;
        }
      }
      global.uniqueIdsArray = new Set(idsList);
      global.uniqueIds = [...uniqueIdsArray];
      for (var ad = 0; ad < 1; ad++) {
        global.headers = "id;tp;sc;ts;tz";
        for (var i = 0; i < result.length; i++) {
          if (true || result[i].id == uniqueIds[i]) {
            global.json = result[i];
            console.log(json);

            //DECIDE WHAT TYPE OF ARRAY TO BUILD (ARRAYBUILTWITHJSONSAMETYPES) BY READING MONGODB QUERIED DATA (ADMIN_ID & OLDER 90 DAYS):
            //Reads each ARRAY (JSON) of the Mongodb Output and with IF and ELSE IFs decides what CODE BLOCK to execute to append the ARRAYBUILTWITHJSONSAMETYPES

            function buildCSVs() {
              if (typeof(headersSet) == 'undefined' || headersSet == 0) {
                var oldDataErased = [ { DADOS:headers } ];
                var csv = new ObjectsToCsv(oldDataErased);//UPDATES WHOLE CSV
                csv.toDisk(`./oldDataErased-AdminId-${json.id}.csv`, { append: false });
                var oldDataErased = [ { data:headers } ];
                var csv = new ObjectsToCsv(oldDataErased);//UPDATES WHOLE CSV
                csv.toDisk(`./oldDataErased-AdminId-${json.id}.csv`, { append: false });
                var oldDataErased = [ { data:headers } ];
                var csv = new ObjectsToCsv(oldDataErased);//UPDATES WHOLE CSV
                csv.toDisk(`./oldDataErased-AdminId-${json.id}.csv`, { append: false });
                global.headersSet = 1;
                global.row = json.id + ';' + json.tp + ';' + json.sc + ';' + json.ts + ';' + json.tz + ';';
                var oldDataErased = [ { '':row } ];
                var csv = new ObjectsToCsv(oldDataErased);
                csv.toDisk(`./oldDataErased-AdminId-${json.id}.csv`, { append: true });//APPENDS ROW(S) TO CSV
              }
            }
            buildCSVs();
            headersSet = 0;
            buildCSVs();
          }
        }
      }
      //GET POSTGRES EMAILS AND SEND EMAILS
      async function getEmailsAndSends() {
        for (var ui = 0; ui < uniqueIds.length; ui++) {
          let id = uniqueIds[ui];
          const admin = await Admin.findOne({
            where: {
              id,
            },
          });
          console.log(admin.email);
        }
      }
      getEmailsAndSends();
      db.close();
      });
    });
  });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "jessedeveloperhacker@gmail.com",
        pass: "#HaCyInv1749"
    }
  });

  let message = {
  from: "jessedeveloperhacker@gmail.com",
  to: "jesseprofitableinvestor@gmail.com",
  subject: "Subject",
  html: "<h1>Hello SMTP Email</h1>",
  attachments: [
    {
        filename: 'demo.png',
        path: __dirname + '/demo.png',
        cid: 'uniq-demo.png'
    }
  ]
  }

  transporter.sendMail(message, function(err, info) {
  if (err) {
  console.log(err);
  } else {
  console.log(info);
  }
  })


  //BUILD XLSXs:
  const jsonData = [
    { name: 'Diary', code: 'diary_code', author: 'Pagorn' },
    { name: 'Note', code: 'note_code', author: 'Pagorn' },
    { name: 'Medium', code: 'medium_code', author: 'Pagorn' },
  ]
  const workSheet = XLSX.utils.json_to_sheet(jsonData);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
  XLSX.writeFile(workBook, "../Backend_HION/sample.xlsx");

  //DELETE ALL OLD DATA:
  var url = "mongodb://localhost:27017/";//"mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.4.2";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hionmultscan");
    var timeNow = new Date();
    var timeNowSeconds = (timeNow.getTime())/1000;
    var oldestTimeToSave = timeNowSeconds - 7776000;//7776000 seconds = 90 days
    var myquery = { ts: { $lt: oldestTimeToSave } };//$gte:timeNowSeconds
    // dbo.collection("bms").deleteMany(myquery, function(err, obj) {
    dbo.collection("bms").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("Old Document(s) deleted");
        db.close();
    });
  });
});
//   * * * * * *
//   | | | | | |
//   | | | | | day of week
//   | | | | month
//   | | | day of month
//   | | hour
//   | minute
//   second ( optional: aditional first * )

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/old_products", old_productsRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/iot", iotRoutes);

export default app;