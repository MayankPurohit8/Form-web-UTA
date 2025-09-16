import { useState } from "react";

function UserRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    dob: "",
    city: "",
    tshirt: "",
    food: "",
    stay: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*try {
      const response = await fetch("https://your-api-endpoint.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error connecting to server.");
    }
    */
  };

  return (
    <div className="bg-sky-100 w-full h-full py-10 flex items-center justify-center ">
      <div className="min-w-lg mx-auto  bg-white shadow-lg rounded-2xl  h-full mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-sky-600 p-6 text-white">
          User Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-5 p-6"
        >
          <div className="text-xl font-semibold ">General Details</div>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-semibold">
              Enter Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="mx-2 border py-3 px-2 rounded-lg"
              required
            />
          </div>

          {/* Whatsapp */}
          <div className="flex flex-col gap-1">
            <label htmlFor="whatsapp" className="text-sm font-semibold">
              Enter Whatsapp Number
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="10-digit number"
              className="mx-2 border py-3 px-2 rounded-lg"
              required
            />
          </div>

          {/* DOB & City */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="dob" className="text-sm font-semibold">
                Enter Date Of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="mx-2 border p-3 rounded-lg w-full"
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="city" className="text-sm font-semibold">
                Enter City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="City name"
                className="mx-2 border py-3 px-3 rounded-lg w-full"
                required
              />
            </div>
          </div>

          {/* T-shirt Size */}
          <div className="w-full">
            <label htmlFor="tshirt" className="text-sm font-semibold">
              Indian Tree T-Shirt Size
            </label>
            <select
              id="tshirt"
              name="tshirt"
              value={formData.tshirt}
              onChange={handleChange}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xl">X Large</option>
              <option value="xxl">XX Large</option>
              <option value="none">I don't need</option>
            </select>
          </div>

          {/* Food Preference */}
          <div className="w-full">
            <label htmlFor="food" className="text-sm font-semibold">
              Gala Dinner Food Preference
            </label>
            <select
              id="food"
              name="food"
              value={formData.food}
              onChange={handleChange}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="non-veg">Non-Vegetarian</option>
              <option value="veg">Vegetarian</option>
              <option value="not-attending">Not Attending</option>
            </select>
          </div>

          {/* Stay Preference */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">
              Do you want the Tournament Management to arrange for your stay?
            </label>
            <div className="flex space-x-4 text-lg">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="stay"
                  value="yes"
                  checked={formData.stay === "yes"}
                  onChange={handleChange}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="stay"
                  value="no"
                  checked={formData.stay === "no"}
                  onChange={handleChange}
                />
                <span>No</span>
              </label>
            </div>
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

export default UserRegistration;
