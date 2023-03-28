const express = require("express");
const cors = require('cors')
const app = express();
const port = 3001;
const db = require("./config/db");
const character_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

app.use(express.json());
app.use(cors());

app.post("/add", async (req, res) => {
  if (req.body.name.length === 0 || req.body.phone_number.length !== 11) {
    return;
  }
  const phone_number = req.body.phone_number.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  const [coupon_rows] = await db.query("SELECT id FROM coupon WHERE phone_number = ?", [phone_number]);
  if (coupon_rows.length > 0) {
    res.send(["no"]);
    return;
  }

  while (true) {
    var coupon_number = "";
    for (var i = 0; i < 12; i++) {
      coupon_number += character_list[Math.floor(Math.random() * character_list.length)];
    }
    coupon_number = coupon_number.replace(/^(\w{4})(\w{4})(\w{4})$/, `$1-$2-$3`);
    const [coupon_number_rows] = await db.query("SELECT id FROM coupon WHERE coupon_number = ?", [coupon_number]);
    if (coupon_number_rows.length === 0) {
      await db.query("INSERT INTO coupon VALUES (null,?,?,?,?);", [req.body.name, phone_number, coupon_number, new Date().getTime()]);
      res.send(["ok", coupon_number]);
      return;
    }
  }
});

app.post("/list", async (req, res) => {
  const [coupon_rows] = await db.query("SELECT * FROM coupon ORDER BY id DESC");
  res.send(coupon_rows);
});

app.post("/search", async (req, res) => {
  if (req.body.name.length === 0 || req.body.phone_number.length !== 11) {
    return;
  }
  const phone_number = req.body.phone_number.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  const [coupon_rows] = await db.query("SELECT coupon_number,timestamp FROM coupon WHERE name = ? AND phone_number = ?", [req.body.name,phone_number]);
  if (coupon_rows.length > 0) {
    res.send(["ok", coupon_rows[0]]);
  } else {
    res.send(["no"]);
  }
});

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});