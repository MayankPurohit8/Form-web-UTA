import { pool } from "../utils/db.js";
export async function registerPlayer(req, res) {
  const {
    name,
    whatsappNumber,
    dateOfBirth,
    city,
    shirtSize,
    shortSize,
    foodPref,
    stayYorN,
    feePaid,
    events,
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Insert player
    const [playerResult] = await conn.query(
      `INSERT INTO tbl_players (name, whatsappNumber, dateOfBirth, city, shirtSize, shortSize, foodPref, stayYorN, feePaid)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        whatsappNumber,
        dateOfBirth,
        city,
        shirtSize,
        shortSize,
        foodPref,
        stayYorN,
        feePaid,
      ]
    );

    const playerId = playerResult.insertId;

    // Insert events into tbl_partners (partnerId initially NULL)
    for (const eventId of events) {
      await conn.query(
        `INSERT INTO tbl_partners (eventId, userId, partnerId) VALUES (?, ?, NULL)`,
        [eventId, playerId]
      );
    }

    await conn.commit();
    res.status(201).json({ success: true, playerId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
}

export async function loginPlayer(req, res) {
  const { whatsappNumber, dateOfBirth } = req.body;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM tbl_players WHERE whatsappNumber = ? AND dateOfBirth = ?`,
      [whatsappNumber, dateOfBirth]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json({ success: true, player: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPlayerDetails(req, res) {
  try {
    const [rows] = await pool.query(`SELECT * FROM tbl_players WHERE id = ?`, [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Player not found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
