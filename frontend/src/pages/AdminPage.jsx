import axios from "axios";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [event, setEvent] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch pairs when event changes
  useEffect(() => {
    const updateEventTable = async () => {
      if (!event) return;
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/admin/event", {
          params: { eventId: event },
        });
        console.log(res);
        setData(res.data.data || []);
      } catch (err) {
        console.error(err);
        alert("Error fetching event data");
      } finally {
        setLoading(false);
      }
    };

    updateEventTable();
  }, [event]);

  // Update ranking in state
  const handleRankingChange = (sno, value) => {
    const newData = data.map((row) =>
      row.sno === sno ? { ...row, ranking: value } : row
    );
    setData(newData);
  };

  // Submit rankings to backend
  const submitNewRankings = async () => {
    try {
      const payload = data.map((row) => ({
        id1: row.id1,
        id2: row.id2,
        ranking: row.ranking,
      }));

      await axios.post("http://localhost:3000/api/admin/rankings", {
        rankings: payload,
      });

      alert("Rankings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating rankings");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-sky-800">
            Uttaranchal Tennis Association
          </h1>
          <nav className="space-x-3 hidden md:flex gap-5 font-semibold text-gray-500">
            <button className="rounded-2xl hover:text-gray-900">Admin</button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row justify-between px-6 py-10 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="w-full space-y-6 text-center md:text-left">
          {/* Event Selection */}
          <div className="flex items-center gap-5">
            <h2 className="text-2xl font-semibold">SELECT EVENT</h2>
            <select
              className="bg-sky-200 px-3 py-2 shadow-2xl shadow-gray-400 outline-none transition-all delay-100"
              onChange={(e) => setEvent(e.target.value)}
              value={event}
            >
              <option value="">Select Event</option>
              <option value="1">75+</option>
              <option value="2">90+</option>
              <option value="3">105+</option>
              <option value="4">120+</option>
            </select>
          </div>

          {/* Player Pairs Table */}
          {loading ? (
            <p className="text-gray-500 mt-4">Loading...</p>
          ) : (
            <div className="p-6">
              <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="min-w-full bg-white border border-gray-200 rounded-2xl">
                  <thead className="bg-gray-100 text-gray-700 text-lg">
                    <tr>
                      <th className="px-6 py-3 border-b text-left">S.No.</th>
                      <th className="px-6 py-3 border-b text-left">Player 1</th>
                      <th className="px-6 py-3 border-b text-left">Player 2</th>
                      <th className="px-6 py-3 border-b text-left">Ranking</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {data.map((row) => (
                      <tr
                        key={row.sno}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-3 border-b">{row.sno}</td>
                        <td className="px-6 py-3 border-b">{row.player1}</td>
                        <td className="px-6 py-3 border-b">{row.player2}</td>
                        <td className="px-6 py-3 border-b font-semibold flex gap-2 relative">
                          <input
                            type="number"
                            min="1"
                            className="w-20 bg-sky-200 px-2"
                            value={row.ranking || ""}
                            onChange={(e) =>
                              handleRankingChange(row.sno, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={submitNewRankings}
              className="bg-sky-600 text-white px-6 py-2 rounded-xl hover:bg-sky-700 transition-all"
            >
              Submit Rankings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
