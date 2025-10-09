import { useState } from "react";
import { useNavigate } from "react-router";
//Registration page1
function RuleList() {
  let navigate = useNavigate();
  const [cont, setCont] = useState();
  return (
    <>
      <div className="bg-sky-100 text-gray-800 w-full py-10 h-full ">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl  mb-8 ">
          <h1 className="text-3xl font-bold text-center mb-6  ">
            Tennis Doubles Tournament - Factsheet and rules
          </h1>

          <ul className="list-disc pl-6 space-y-3 ">
            <li>
              <strong>Categories:</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>A (Open)</li>
                <li>B (90+ combined)</li>
                <li>C (105+ combined)</li>
                <li>D (120+ combined)</li>
                <li>Lucky Doubles</li>
              </ul>
              <p className="mt-1 text-sm text-gray-600">
                This is an Only Doubles Tournament.
              </p>
            </li>

            <li>
              <strong>Lucky Doubles Format:</strong>
              <p className="mt-1">
                Any participant who loses both matches in the first round shall
                be considered for the draw of Lucky Doubles. Any participant who
                opted for one event and loses in the first round will also be
                eligible.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Participants will be divided into:
                  <ul className="list-disc pl-6">
                    <li>X (Age &le; 50 years)</li>
                    <li>Y (Age &gt; 50 years)</li>
                  </ul>
                </li>
                <li>
                  Each pair will have one person from X and one from Y, selected
                  via lottery system.
                </li>
              </ul>
            </li>

            <li>Age Limit is 30 years.</li>

            <li>
              Age of any participant shall be calculated as running age as on
              9th December. Example: If a participant turns 29 on 8th December,
              he will be considered as 30.
              <span className="font-semibold">Please carry age proof.</span>
            </li>

            <li>
              One player can participate in max 2 categories (excluding Lucky
              Doubles which could be the 3rd).
            </li>

            <li>
              Coaches are allowed to play in Category A only.{" "}
              <span className="italic">
                Coach = Anyone who earns via tennis coaching.
              </span>
            </li>

            <li>
              <strong>Entry Fee:</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Two events: ₹4500 (
                  <span className="italic">
                    ₹6000 with double sharing accommodation up to 2 days
                  </span>
                  )
                </li>
                <li>
                  One event: ₹3000 (
                  <span className="italic">
                    ₹4500 with double sharing accommodation up to 2 days
                  </span>
                  )
                </li>
              </ul>
            </li>

            <li>
              Breakfast and Lunch shall be provided on both days and Gala dinner
              on 9th December.
            </li>

            <li>
              Every participant shall get:
              <ul className="list-disc pl-6 grid grid-cols-2 gap-1">
                <li>T-Shirt</li>
                <li>Shorts</li>
                <li>Socks</li>
                <li>Cap</li>
                <li>Wristband</li>
              </ul>
              <p className="text-sm text-gray-600">(MRP more than ₹3000)</p>
            </li>

            <li>
              <strong>Prize Money:</strong>
              <ul className="list-disc pl-6 space-y-1">
                <li>Winner Team: ₹21,000</li>
                <li>Runners-Up Team: ₹11,000</li>
                <li>Semi-Finalist Teams: ₹4,000 each</li>
                <li>
                  Lucky Doubles:
                  <ul className="list-disc pl-6">
                    <li>Winner: ₹10,500</li>
                    <li>Runner-Up: ₹5,500</li>
                    <li>Semi-Finalists: ₹2,000 each</li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <strong>Last date</strong> for entry fee payment: 7th December.
            </li>
            <li>No entry fee shall be accepted after 7th December.</li>

            <li>Draws and Order of Play shall be published on 8th December.</li>

            <li>
              If any team does not turn up at scheduled time, walkover shall be
              given to the opponent within 15 minutes.
            </li>

            <li>
              Balls for the Tournament:{" "}
              <span className="font-semibold">Head Tour</span>.
            </li>

            <li>
              For queries, contact:
              <span className="font-semibold">
                Tournament Director Sumit Goel
              </span>{" "}
              (Ph: 9412977857)
            </li>

            <li>
              Venue of the Tournament:
              <a
                href="https://maps.app.goo.gl/fPLo9aK52WSihktY6"
                className="text-blue-600 underline"
                target="_blank"
              >
                Shanti Tennis Academy
              </a>
            </li>

            <li>
              Venue for Gala Party and Stay: OM Farms, 8-A, Jogiwala, Badripur,
              Dehradun, Uttarakhand 248005
            </li>

            <li>Maximum draw size in any category: 32.</li>

            <li>
              There are 4 hard courts (and 4 additional hard courts at a nearby
              venue if required).
            </li>

            <li>
              List of Participants Registered So Far:
              <a
                href="https://tinyurl.com/UK2023ENTRIES"
                className="text-blue-600 underline"
                target="_blank"
              >
                View List
              </a>
            </li>

            <li>
              After registration, join the participants WhatsApp group:
              <a
                href="https://chat.whatsapp.com/JTvbjXSOolF7KI5ORr46DY"
                className="text-blue-600 underline"
                target="_blank"
              >
                Join Group
              </a>
            </li>
          </ul>
          <label className="flex items-center space-x-2 f w-full justify-center mt-5 ">
            <input
              type="checkbox"
              onChange={(e) => setCont(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
            />
            <span className="font-serif font-bold ">I agree to the terms</span>
          </label>
        </div>
        <div className="w-full flex justify-center space-x-10 ">
          <button className="text-red-500 cursor-pointer">Back</button>
          <button
            onClick={() => cont && navigate("/registration")}
            className={` px-7 text-xl py-3 rounded-xl text-white ${
              cont
                ? "bg-sky-500 cursor-pointer"
                : "bg-sky-300 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
export default RuleList;
