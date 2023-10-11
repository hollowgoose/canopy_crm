const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const db = require("./models/db");

const port = 3000;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "X-Total-Pages",
};

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("It lives!");
});

// Add Client
app.post("/api/clients/add", (req, res) => {
  try {
    const {
      title,
      first_name,
      last_name,
      email,
      home_tel,
      mobile_tel,
      address_1,
      address_2,
      town,
      county,
      postcode,
      ec_name,
      ec_number,
      GAD7,
      PHQ9,
    } = req.body;

    // Check if a client with the same email or telephone already exists
    const checkSql =
      "SELECT COUNT(*) AS count FROM clients WHERE email = ? OR home_tel = ? OR mobile_tel = ?";
    db.query(
      checkSql,
      [email, home_tel, mobile_tel],
      (checkErr, checkResult) => {
        if (checkErr) {
          console.error(checkErr);
          return res
            .status(500)
            .json({ error: "Error checking for existing client" });
        }

        const existingClientCount = checkResult[0].count;

        if (existingClientCount > 0) {
          // A client with the same email or telephone already exists
          return res.status(400).json({
            error: "Client with the same email or telephone already exists",
          });
        }

        // Insert the new client if no duplicates found
        const insertSql =
          "INSERT INTO clients (title, first_name, last_name, email, home_tel, mobile_tel, address_1, address_2, town, county, postcode, ec_name, ec_number, GAD7, PHQ9) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        db.query(
          insertSql,
          [
            title,
            first_name,
            last_name,
            email,
            home_tel,
            mobile_tel,
            address_1,
            address_2,
            town,
            county,
            postcode,
            ec_name,
            ec_number,
            GAD7,
            PHQ9,
          ],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Error adding client" });
            }
            return res
              .status(201)
              .json({ message: "Client added successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
  }
});

// Get Client(s)
app.get("/api/clients", async (req, res) => {
  const page = req.query.page || 1;
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;
  const filterCriteria = req.query.filter;

  const countSql = "SELECT COUNT(*) AS total FROM clients";

  db.query(countSql, (countErr, countResult) => {
    if (countErr) {
      console.error(countErr);
      return res.status(500).json({ error: "Error fetching total count" });
    }

    const totalRows = countResult[0].total;
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    let sql;
    const sqlParams = [];

    if (filterCriteria && filterCriteria !== "All") {
      sql = `SELECT * FROM clients WHERE status = ? ORDER BY first_name ASC LIMIT ${itemsPerPage} OFFSET ${offset}`;
      sqlParams.push(filterCriteria);
    } else {
      sql = `SELECT * FROM clients ORDER BY first_name ASC LIMIT ${itemsPerPage} OFFSET ${offset}`;
    }

    db.query(sql, sqlParams, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error fetching clients" });
      }

      res.setHeader("Access-Control-Expose-Headers", "X-Total-Pages");
      res.setHeader("X-Total-Pages", totalPages);

      return res.json(data);
    });
  });
});

// Add Appintment
app.post("api/appointments/add", (req, res) => {
  try {
    const { date, start_time, end_time, client_id, user_id } = req.body;

    const insertApptSql =
      "INSERT INTO appointments (date, start_time, end_time, client_id, user_id) VALUES (?, ?, ?, ?, ?)";

    db.query(
      insertSql,
      [date, start_time, end_time, client_id, user_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error adding appointment" });
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
});

// Get Appointment
app.get("/api/appointments", (req, res) => {
  try {
    const { date, start_time, end_time, client_id, user_id } = req.body;

    const getApptSql = "SELECT * FROM appointments";

    db.query(
      getApptSql,
      [date, start_time, end_time, client_id, user_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error getting appointments" });
        }
        return res.status(201).json({ result });
      }
    );
  } catch (err) {
    console.error(err);
  }
});

// Client Details
app.get("/api/clients/:clientId", async (req, res) => {
  const clientId = req.params.clientId;

  const sql = "SELECT * FROM clients WHERE client_id = ?";
  db.query(sql, [clientId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching client details." });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    const clientDetails = data[0];
    return res.json(clientDetails);
  });
});

app.listen(port, () => {
  console.log(`Server now running at http://localhost:${port} ✅`);
});
