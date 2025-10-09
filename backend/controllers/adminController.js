import { pool } from "../utils/db.js";
export async function getPairsByEvent(req, res) {
  let { eventId } = req.query;
  try {
    const [rows] = await pool.query(
      ` SELECT  a.id as id1 , b.id as id2 , p1.name as player1,p2.name as player2 ,a.ranking from tbl_partners a join tbl_partners b on a.userId = b.partnerId and a.partnerId =b.userId and a.id<b.id join tbl_players p1 on a.userId=p1.id join tbl_players p2 on a.partnerId=p2.id where a.eventId=(?)`,
      [eventId]
    );
    const dataWithSerial = rows.map((row, ind) => ({
      sno: ind + 1,
      ...row,
    }));
    res.status(200).json({ data: dataWithSerial });
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
      await conn.query(
        `UPDATE tbl_partners SET ranking = ? WHERE id = ? or id =?`,
        [r.ranking, r.id1, r.id2]
      );
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
