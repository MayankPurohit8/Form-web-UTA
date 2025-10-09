import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
function UserLogin() {
  let navigate = useNavigate();
  const [no, setNo] = useState("");
  const [dob, setDob] = useState("");
  const [userData, setUserdate] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3000/api/players/login", {
        whatsappNumber: no,
        dateOfBirth: dob,
      });
      setUserdate(res.data.player);
      console.log(res.data.player);
      navigate("/edit", { state: { userData: res.data.player } });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-sky-100 w-full h-screen py-10 flex items-center justify-center">
      <div className="min-w-lg mx-auto bg-white shadow-lg rounded-2xl  mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-sky-600 p-6 text-white">
          User Login
        </h1>

        {/* ✅ Added onSubmit handler */}
        <form className="flex flex-col w-full space-y-5 p-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="whatsapp" className="text-sm font-semibold">
              Enter Whatsapp Number
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="10-digit number"
              className="mx-2 border py-3 px-2 rounded-lg"
              required
              value={no}
              onChange={(e) => setNo(e.target.value)}
            />
          </div>

          {/* DOB & City */}
          <div className="flex flex-col gap-1">
            <label htmlFor="dob" className="text-sm font-semibold">
              Enter Date Of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className="mx-2 border p-3 rounded-lg"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* First Event */}

          {/* Submit Button */}
          <button
            onClick={(e) => handleLogin(e)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default UserLogin;
