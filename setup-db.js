require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: true }
});

const sql = `
CREATE TABLE users (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact VARCHAR(10) NOT NULL,
    role VARCHAR(10) NOT NULL
);
`;

db.connect((err) => {
    if (err) {
        console.error('Connection failed:', err);
        return;
    }
    console.log('Connected to Aiven database!');
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Query failed:', err);
        } else {
            console.log('Table created successfully!', result);
        }
        db.end();
    });
});