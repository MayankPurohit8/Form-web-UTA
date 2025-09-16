import { useState } from "react";

function UserRegistration2() {
  // ✅ State for form data
  const [formData, setFormData] = useState({
    event1: "",
    partner1: "",
    event2: "",
    partner2: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Optional: You can send this data to your API here
    // fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <div className="bg-sky-100 w-full h-full py-10 flex items-center justify-center">
      <div className="min-w-lg mx-auto bg-white shadow-lg rounded-2xl h-full mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-sky-600 p-6 text-white">
          User Registration
        </h1>

        {/* ✅ Added onSubmit handler */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-5 p-6"
        >
          <div className="text-xl font-semibold">Event Details</div>

          {/* First Event */}
          <div className="w-full">
            <label htmlFor="event1" className="text-sm font-semibold">
              First Event
            </label>
            <select
              id="event1"
              name="event1"
              value={formData.event1}
              onChange={handleChange}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="75+">75+</option>
              <option value="90+">90+</option>
              <option value="105+">105+</option>
              <option value="120+">120+</option>
            </select>
          </div>

          {/* First Event Partner */}
          <div className="w-full">
            <label htmlFor="partner1" className="text-sm font-semibold">
              Name of First Event Partner
            </label>
            <select
              id="partner1"
              name="partner1"
              value={formData.partner1}
              onChange={handleChange}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="not-registered">Not Yet Registered</option>
            </select>
          </div>

          {/* Second Event */}
          <div className="w-full">
            <label htmlFor="event2" className="text-sm font-semibold">
              Second Event
            </label>
            <select
              id="event2"
              name="event2"
              value={formData.event2}
              onChange={handleChange}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="75+">75+</option>
              <option value="90+">90+</option>
              <option value="105+">105+</option>
              <option value="120+">120+</option>
            </select>
          </div>

          {/* Second Event Partner */}
          <div className="w-full">
            <label htmlFor="partner2" className="text-sm font-semibold">
              Name of Second Event Partner
            </label>
            <select
              id="partner2"
              name="partner2"
              value={formData.partner2}
              onChange={handleChange}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="not-registered">Not Yet Registered</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-4"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration2;
