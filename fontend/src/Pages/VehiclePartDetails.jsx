import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import ReactToPrint from "react-to-print";

export const VehiclePartDetails = () => {
  const [part, setPart] = useState([]);
  const pdfRef = useRef();
  const [search, setSearch] = useState("");
  const componentRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5000/item").then((res) => {
      setPart(res.data.data);
    });
  }, []);

  const handleDeleteVehicle = (id) => {
    axios
      .delete(`http://localhost:5000/item/${id}`)
      .then(() => {
        alert("Delete successful");
        window.location.reload();
      })
      .catch((error) => {
        alert("There was an error deleting the vehicle part");
        console.log(error);
      });
  };

  const filteredParts = part.filter(
    (item) =>
      item.item_name.toLowerCase().includes(search.toLowerCase()) ||
      item.quantity.toString().includes(search)
  );

  return (
    <section ref={pdfRef}>
      <div className="bg-black h-20 flex flex-row justify-center items-center">
        <h1
          className="text-white text-3xl"
          style={{ fontFamily: "Roboto slab" }}
        >
          Vehicle Parts
        </h1>
      </div>

      <Link to={`/itemregister`}>
        <div className="float-right flex flex-row items-center px-10 mt-5 gap-x-5">
          <IoAddCircleOutline size={40} />
          <h1 className="text-xl font-semibold">Add Vehicle Part</h1>
        </div>
      </Link>

      <div className="mb-2 mt-2 mx-5  w-full ">
        <Link to={`/dashboard`}>
          <button className="bg-black text-white px-6 py-1 rounded-lg">
            Dashboard
          </button>
        </Link>
      </div>

      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search"
          className="w-80 px-5 h-10 rounded-lg border-2 border-black mx-5 mt-5"
        />
      </div>

      

      <div className="mt-2 float-right px-5">
        <ReactToPrint
          trigger={() => (
            <button className="bg-lime-500 text-black px-2 py-1 w-20 rounded-lg">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>

      <div ref={componentRef} className="px-5 mt-3">
        <table
          id="item-table"
          className="w-full border-separate border-spacing-2"
        >
          <thead className="text-lg lg:text-lg">
            <tr>
              <th className="border-2 border-black rounded-lg text-center">
                No
              </th>
              <th className="border-2 border-black rounded-lg text-center">
                Vehicle Part
              </th>
              <th className="border-2 border-black rounded-lg text-center">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.map((item, i) => (
              <tr
                key={i}
                className={`${
                  (i + 1) % 2 === 0 ? "bg-gray-200" : ""
                } border-black border-b text-lg font-mono`}
              >
                <td className="text-center">{i + 1}</td>
                <td className="text-center">{item.item_name}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center flex flex-row justify-center items-center gap-x-2 text-white">
                  <Link to={`/updatevehiclepart/${item._id}`}>
                    <button className="bg-cyan-700 px-4 py-1 rounded-lg my-1 text-base">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteVehicle(item._id)}
                    className="bg-red-700 px-4 py-1 rounded-lg my-1 text-base"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
