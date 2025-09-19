import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "uta",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function setupDatabase() {
  try {
    // 1️⃣ Connect to MySQL (no database selected yet)
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root123",
    });

    // 2️⃣ Create database if not exists
    await connection.query("CREATE DATABASE IF NOT EXISTS uta");
    console.log("✅ Database 'uta' ensured.");

    // 3️⃣ Switch to the database
    await connection.changeUser({ database: "uta" });

    // 4️⃣ Create tables
    const createEventTable = `
      CREATE TABLE IF NOT EXISTS tbl_eventName (
        id INT AUTO_INCREMENT PRIMARY KEY,
        eventName VARCHAR(100) NOT NULL UNIQUE
      );
    `;

    const createPlayersTable = `
      CREATE TABLE IF NOT EXISTS tbl_players (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        whatsappNumber VARCHAR(15) NOT NULL,
        dateOfBirth DATE,
        city VARCHAR(100),
        shirtSize VARCHAR(10),
        shortSize VARCHAR(10),
        foodPref ENUM('Veg', 'Non-Veg', 'Vegan') DEFAULT 'Veg',
        stayYorN ENUM('Y', 'N') DEFAULT 'N',
        feePaid BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createPartnersTable = `
      CREATE TABLE IF NOT EXISTS tbl_partners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        eventId INT NOT NULL,
        userId INT NOT NULL,
        partnerId INT NULL,
        ranking INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (eventId) REFERENCES tbl_eventName(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES tbl_players(id) ON DELETE CASCADE,
        FOREIGN KEY (partnerId) REFERENCES tbl_players(id) ON DELETE SET NULL
      );
    `;

    await connection.query(createEventTable);
    await connection.query(createPlayersTable);
    await connection.query(createPartnersTable);

    console.log("✅ Tables created successfully (if they didn't exist).");

    const events = ["75+", "90+", "105+", "120+"];

    for (const eventName of events) {
      await connection.query(
        `INSERT INTO tbl_eventName (eventName) VALUES (?) 
         ON DUPLICATE KEY UPDATE eventName = eventName`,
        [eventName]
      );
    }

    // 5️⃣ Close connection
    await connection.end();
    console.log("✅ Setup completed and connection closed.");
  } catch (err) {
    console.error("❌ Error setting up database:", err);
  }
}
