import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ArrowRight } from "lucide-react";
function EditDetails() {
  let navigate = useNavigate();
  let location = useLocation();
  console.log(location.state.userData);
  const [update, setUpdate] = useState();
  const [name, setName] = useState(location.state.userData.name);
  const [whatsappNumber, setwhatsappNumber] = useState(
    location.state.userData.whatsappNumber
  );
  const [id, setId] = useState(location.state.userData.id);
  const [dob, setDob] = useState("");
  const [city, setCity] = useState(location.state.userData.city);
  const [tshirt, setTshirt] = useState(location.state.userData.shirtSize);
  const [food, setFood] = useState(location.state.userData.foodPref);
  const [stay, setStay] = useState(location.state.userData.stayYorN);
  useEffect(() => {
    const backendDate = location.state.userData.dateOfBirth;
    const formattedDate = new Date(backendDate).toISOString().split("T")[0];
    setDob(formattedDate);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !name ||
        !whatsappNumber ||
        !dob ||
        !dob ||
        !city ||
        !tshirt ||
        !food ||
        !stay
      ) {
        toast.error("Fill all the fields");
        return;
      }
      let res = await axios.post("http://localhost:3000/api/players/edit", {
        id,
        name,
        whatsappNumber,
        dateOfBirth: dob,
        city,
        shirtSize: tshirt,
        foodPref: food,
        stayYorN: stay,
      });
      console.log(res);
      toast.success("Updated Successfully");

      navigate("/registrationnext");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-sky-100 w-full h-full py-10 flex items-center justify-center ">
      <div className="min-w-lg mx-auto  bg-white shadow-lg rounded-2xl  h-full mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-sky-600 p-6 text-white">
          Edit Details
        </h1>

        <form className="flex flex-col w-full space-y-5 p-6">
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setUpdate(true);
              }}
              placeholder="Your full name"
              className="mx-2 border py-3 px-2 rounded-lg"
              required
            />
          </div>

          {/* whatsappNumber */}
          <div className="flex flex-col gap-1">
            <label htmlFor="whatsappNumber" className="text-sm font-semibold">
              Enter whatsappNumber Number
            </label>
            <input
              id="whatsappNumber"
              name="whatsappNumber"
              type="tel"
              value={whatsappNumber}
              onChange={(e) => {
                setwhatsappNumber(e.target.value);
                setUpdate(true);
              }}
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
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setUpdate(true);
                }}
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
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setUpdate(true);
                }}
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
              value={tshirt}
              onChange={(e) => {
                setTshirt(e.target.value);
                setUpdate(true);
              }}
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
              value={food}
              onChange={(e) => {
                setFood(e.target.value);
                setUpdate(true);
              }}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="Non-Veg">Non-Vegetarian</option>
              <option value="Veg">Vegetarian</option>
              <option value="NA">Not Attending</option>
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
                  value="Y"
                  checked={stay === "Y"}
                  onChange={(e) => {
                    setStay(e.target.value);
                    setUpdate(true);
                  }}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="stay"
                  value="N"
                  checked={stay === "N"}
                  onChange={(e) => setStay(e.target.value)}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="gap-5 w-full flex justify-center items-center">
            <div className="bg-blue-600 p-2 rounded-full hover:scale-110">
              <ArrowRight />
            </div>
            {update && (
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="text-blue-600 cursor-pointer hover:text-green-600"
              >
                update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDetails;
