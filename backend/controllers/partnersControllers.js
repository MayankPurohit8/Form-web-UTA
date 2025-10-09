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
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let { id, event1, event2, partner1, partner2 } = req.body;
    if (event1) {
      event1 = Number(event1);
      const [existingPartner] = await conn.query(
        `SELECT partnerId from tbl_partners where userId =? AND eventNum=1`,
        [id]
      );
      if (existingPartner.length > 0) {
        await conn.query(
          `UPDATE tbl_partners SET partnerId = NULL where userId =? AND eventNum=1`,
          [id]
        );
        await conn.query(
          `UPDATE tbl_partners Set partnerId=NULL where userId=? AND eventNum=1`,
          [existingPartner[0].partnerId]
        );
      }
      await conn.query(
        `UPDATE tbl_partners SET eventId=(?),partnerId=(?) WHERE userId=(?) AND eventNum=1`,
        [event1, partner1, id]
      );
      await conn.query(
        `UPDATE tbl_partners SET eventId=(?),partnerId=(?) WHERE userId=(?) AND eventNum=1`,
        [event1, id, partner1]
      );
    }
    if (event2) {
      event2 = Number(event2);
      const [existingPartner] = await conn.query(
        `SELECT partnerId from tbl_partners where userId =? AND eventNum=2`,
        [id]
      );
      if (existingPartner.length > 0) {
        await conn.query(
          `UPDATE tbl_partners SET partnerId = NULL where userId =? AND eventNum=2`,
          [id]
        );
        await conn.query(
          `UPDATE tbl_partners Set partnerId=NULL where userId=? AND eventNum=2`,
          [existingPartner[0].partnerId]
        );
      }
      await conn.query(
        `UPDATE tbl_partners SET eventId=(?),partnerId=(?) WHERE userId=(?) AND eventNum=2`,
        [event2, partner2, id]
      );
      await conn.query(
        `UPDATE tbl_partners SET eventId=(?),partnerId=(?) WHERE userId=(?) AND eventNum=2`,
        [event2, id, partner2]
      );
    }
    await conn.commit();
    res.status(200).json({ message: "Partners updated successfully" });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
}

export async function getListEvent1(req, res) {
  try {
    let [singles] = await pool.query(
      `SELECT pl.id,pl.name FROM tbl_partners tp JOIN tbl_players pl ON tp.userId = pl.id WHERE  tp.eventNum = 1 AND tp.partnerId IS NULL`
    );
    return res.status(200).json({ list: singles });
  } catch (err) {}
}

export async function getListEvent2(req, res) {
  try {
    let [singles] = await pool.query(
      `SELECT pl.id,pl.name FROM tbl_partners tp JOIN tbl_players pl ON tp.userId = pl.id WHERE  tp.eventNum = 2 AND tp.partnerId IS NULL`
    );
    return res.status(200).json({ list: singles });
  } catch (err) {}
}
