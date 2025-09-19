import { pool } from "../utils/db.js";
export async function getPlayersByEvent(req, res) {
  const { eventId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.name 
       FROM tbl_players p
       JOIN tbl_partners t ON p.id = t.userId
       WHERE t.eventId = ?`,
      [eventId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePartner(req, res) {
  const { id } = req.params;
  const { partnerId } = req.body;
  try {
    await pool.query(`UPDATE tbl_partners SET partnerId = ? WHERE id = ?`, [
      partnerId,
      id,
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
