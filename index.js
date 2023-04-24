var bodyParser = require("body-parser");
const express = require("express");
const app = express();
const sql = require("mssql/msnodesqlv8");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

let request = ''
const config = {
  server: "localhost",
  database: "mcqHunter",
  options: {
    encrypt: false,
    trustedConnection: true,
    trustServerCertificate: true
  }
}

sql.connect(config,(err)=>{
  if(err) console.log(err)
  else{
    console.log("database connected")
    request = new sql.Request();
    request.query("SELECT * FROM [mcqHunter].[dbo].[questions]",(err,result)=>{
      if(err) console.log(err)
      else console.log(result)
    })
    // request.query("INSERT INTO questions (id,quetion,option1,option2,option3,option4,answer,category) VALUES ('1','2','3','4','5','6','7','8')",(err,result)=>{
    //   if(err) console.log(err)
    //   else console.log(result)
    // })
  }
})





app.get("/", (req, res) => {
  res.render("addQuetion.ejs");
});

app.listen(3001, () => {
  console.log("server started at localhost:3001");
});
