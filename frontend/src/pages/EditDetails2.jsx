import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
function EditDetails2() {
  let navigate = useNavigate();
  const [playerList, setPlayerList] = useState();
  // ✅ State for form data
  const [event1, setEvent1] = useState(null);
  const [event2, setEvent2] = useState(null);
  const [partner1, setPartner1] = useState(null);
  const [partner2, setPartner2] = useState(null);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  useEffect(() => {
    try {
      const getLists = async () => {
        let res1 = await axios.get(
          "http://localhost:3000/api/partners/getList1"
        );
        let res2 = await axios.get(
          "http://localhost:3000/api/partners/getList2"
        );

        setList1(res1.data.list);
        setList2(res2.data.list);
      };
      getLists();
    } catch (err) {
      console.log(err);
    }
  }, []);
  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(event1, partner1, event2, partner2);
    if (!event1 && !event2) {
      toast.error("Select at least 1 event");
      return;
    }
    if (event1 == event2) {
      toast.error("Same Events cannot be selected twice");
      return;
    }

    try {
      let res = await axios.put("http://localhost:3000/api/partners/update", {
        event1,
        partner1,
        event2,
        partner2,
        id: 4,
      });
      toast.success("Partners Updated Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-sky-100 w-full h-full py-10 flex items-center justify-center">
      <div className="min-w-lg mx-auto bg-white shadow-lg rounded-2xl h-full mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-sky-600 p-6 text-white">
          User Registration
        </h1>

        {/* ✅ Added onSubmit handler */}
        <form className="flex flex-col w-full space-y-5 p-6">
          <div className="text-xl font-semibold">Event Details</div>

          {/* First Event */}
          <div className="w-full">
            <label htmlFor="event1" className="text-sm font-semibold">
              First Event
            </label>
            <select
              id="event1"
              name="event1"
              value={event1}
              onChange={(e) => {
                setEvent1(e.target.value);
              }}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
            >
              <option value="">Select</option>
              <option value="1">75+</option>
              <option value="2">90+</option>
              <option value="3">105+</option>
              <option value="4">120+</option>
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
              value={partner1}
              onChange={(e) => {
                setPartner1(e.target.value);
              }}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
            >
              <option value="">Select</option>
              {list1 &&
                list1.map((partner) => (
                  <option value={partner.id}>{partner.name}</option>
                ))}
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
              value={event2}
              onChange={(e) => {
                setEvent2(e.target.value);
              }}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
            >
              <option value="">Select</option>
              <option value="1">75+</option>
              <option value="2">90+</option>
              <option value="3">105+</option>
              <option value="4">120+</option>
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
              value={partner2}
              onChange={(e) => {
                setPartner2(e.target.value);
              }}
              className="mx-2 w-full flex px-3 mt-1 py-2 border rounded-lg"
            >
              <option value="">Select</option>
              {list2 &&
                list2.map((partner) => (
                  <option value={partner.id}>{partner.name}</option>
                ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-4"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDetails2;
