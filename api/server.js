const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const db = require("./models/db");

const port = 3000;

const app = express();

process.env.TZ = "Europe/London";

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "X-Total-Pages, Content-Type",
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
            "SELECT COUNT(*) AS count FROM clients WHERE email = ?";
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
                        error: "Client with the same email already exists",
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
                            return res
                                .status(500)
                                .json({ error: "Error adding client" });
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

// Get all Clients
app.get("/api/clients", (req, res) => {
    try {
        const sql = "SELECT * FROM clients";

        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error getting clients" });
            }
            return res.status(201).json({ result });
        });
    } catch (error) {
        console.error(error);
    }
});

// Get Client List for Display
app.get("/api/clients/list", async (req, res) => {
    const page = req.query.page || 1;
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;
    const filterCriteria = req.query.filter;

    const countSql = "SELECT COUNT(*) AS total FROM clients";

    db.query(countSql, (countErr, countResult) => {
        if (countErr) {
            console.error(countErr);
            return res
                .status(500)
                .json({ error: "Error fetching total count" });
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
                return res
                    .status(500)
                    .json({ error: "Error fetching clients" });
            }

            res.setHeader("Access-Control-Expose-Headers", "X-Total-Pages");
            res.setHeader("X-Total-Pages", totalPages);

            return res.json(data);
        });
    });
});

// Add Appointment
app.post("/api/appointments/add", (req, res) => {
    try {
        const { type, date, start_time, end_time, client_id, user_id } =
            req.body;

        const insertApptSql =
            "INSERT INTO appointments (type, date, start_time, end_time, client_id, user_id) VALUES (?, ?, ?, ?, ?, ?)";

        db.query(
            insertApptSql,
            [type, date, start_time, end_time, client_id, user_id],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ error: "Error adding appointment" });
                }
                return res
                    .status(201)
                    .json({ message: "Appointment added successfully" });
            }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error adding appointment" });
    }
});

// Get All Appointments
app.get("/api/appointments", (req, res) => {
    try {
        const getApptSql = "SELECT * FROM appointments";

        db.query(getApptSql, (err, result) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ error: "Error getting appointments" });
            }
            return res.status(201).json({ result });
        });
    } catch (err) {
        console.error(err);
    }
});

// Get Individual Appointment
app.get("/api/appointment/:apptId", async (req, res) => {
    const apptId = req.params.apptId;

    const sql = "SELECT * FROM appointments WHERE appt_id = ?";

    db.query(sql, [apptId], (err, data) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "Error fetching client appointments" });
        }
        if (data.length === 0) {
            console.log("No appointment found for apptId:", apptId);
            return res.status(404).json({ error: "Appointment not found" });
        }
        console.log("Found appointment for apptId:", apptId);
        return res.json({ data });
    });
});

// Get Specific Client Appointments
app.get("/api/appointments/:clientId", async (req, res) => {
    const clientId = req.params.clientId;

    const sql =
        "SELECT * FROM appointments WHERE client_id = ? AND date > CURDATE() ORDER BY date ASC";
    db.query(sql, [clientId], (err, data) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "Error fetching client appointments" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Appointments not found" });
        }
        return res.json({ data });
    });
});

// Client Details
app.get("/api/clients/:clientId", async (req, res) => {
    const clientId = req.params.clientId;

    const sql = "SELECT * FROM clients WHERE client_id = ?";
    db.query(sql, [clientId], (err, data) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "Error fetching client details." });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Client not found" });
        }

        const clientDetails = data[0];
        return res.json(clientDetails);
    });
});

// Get Users
app.get("/api/users", (req, res) => {
    try {
        const sql = "SELECT * FROM users";

        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error getting users" });
            }
            return res.status(201).json({ result });
        });
    } catch (err) {
        console.error(err);
    }
});

// Get Individual User
app.get("/api/users/:userId", (req, res) => {
    const userId = req.params.userId;

    const sql = "SELECT first_name, last_name FROM users WHERE user_id = ?";
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error fetching user" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(data);
    });
});

app.listen(port, () => {
    console.log(`Server now running at http://localhost:${port} ✅`);
});
