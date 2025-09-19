import { pool } from "../utils/db.js";
export async function getPairsByEvent(req, res) {
  const { eventId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT t.id, p1.name AS player1, p2.name AS player2, t.ranking
       FROM tbl_partners t
       LEFT JOIN tbl_players p1 ON t.userId = p1.id
       LEFT JOIN tbl_players p2 ON t.partnerId = p2.id
       WHERE t.eventId = ?`,
      [eventId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateRankings(req, res) {
  const { rankings } = req.body; // [{id: 1, ranking: 3}, ...]

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const r of rankings) {
      await conn.query(`UPDATE tbl_partners SET ranking = ? WHERE id = ?`, [
        r.ranking,
        r.id,
      ]);
    }

    await conn.commit();
    res.json({ success: true });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
}
