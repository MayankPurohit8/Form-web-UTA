import { pool } from "../utils/db.js";
export async function registerPlayer(req, res) {
  const {
    name,
    whatsappNumber,
    dateOfBirth,
    city,
    shirtSize,
    foodPref,
    stayYorN,
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [existingUser] = await conn.query(
      `SELECT * FROM tbl_players WHERE whatsappNumber=(?)`,
      [whatsappNumber]
    );
    if (existingUser.length > 0) {
      await conn.rollback();
      return res
        .status(400)
        .json({ message: "User already registered with number" });
    }
    // Insert player
    const [playerResult] = await conn.query(
      `INSERT INTO tbl_players (name, whatsappNumber, dateOfBirth, city, shirtSize, foodPref, stayYorN)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, whatsappNumber, dateOfBirth, city, shirtSize, foodPref, stayYorN]
    );

    const playerId = playerResult.insertId;
    await conn.query(`INSERT INTO tbl_partners(userId,eventNum) VALUES (?,1)`, [
      playerId,
    ]);
    await conn.query(`INSERT INTO tbl_partners(userId,eventNum) VALUES (?,2)`, [
      playerId,
    ]);

    // Insert events into tbl_partners (partnerId initially NULL)

    await conn.commit();
    res.status(201).json({ success: true, id: playerId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({
      message: "something went wrong while registering",
      error: err.message,
    });
  } finally {
    conn.release();
  }
}

export async function loginPlayer(req, res) {
  const { whatsappNumber, dateOfBirth } = req.body;
  console.log(whatsappNumber, dateOfBirth);
  try {
    const [rows] = await pool.query(
      `SELECT * FROM tbl_players WHERE whatsappNumber = ? AND dateOfBirth = ?`,
      [whatsappNumber, dateOfBirth]
    );

    if (rows.length == 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json({ success: true, player: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateDetails(req, res) {
  const {
    id,
    name,
    whatsappNumber,
    dateOfBirth,
    city,
    shirtSize,
    foodPref,
    stayYorN,
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [existingNumber] = await conn.query(
      `select * from tbl_players where whatsappNumber=? AND id!=?`,
      [whatsappNumber, id]
    );
    if (existingNumber.length > 0) {
      conn.release();
      return res.status(400).json({ message: "Number already exists" });
    }

    const [result] = await conn.query(
      `UPDATE tbl_players 
       SET name = ?, whatsappNumber = ?, dateOfBirth = ?, city = ?, shirtSize = ?, foodPref = ?, stayYorN = ? 
       WHERE id = ?`,
      [
        name,
        whatsappNumber,
        dateOfBirth,
        city,
        shirtSize,
        foodPref,
        stayYorN,
        id,
      ]
    );

    await conn.commit();
    conn.release();

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Player not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Updated successfully" });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error("Update Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Update failed", error: err.message });
  }
}
