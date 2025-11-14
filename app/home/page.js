"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [productForm, setproductForm] = useState({});
  const [products, setProduct] = useState([]);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [loadingaction, setloadingaction] = useState(false)
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      const rjson = await response.json();
      setProduct(rjson.products);
    };
    fetchProducts();
  }, []);

  const buttonAction = async (action, product, initialQuantity) => {
    //immediately change the quantity of the product
    let index= products.findIndex((item)=>item.product ==product)
    let newProducts= JSON.parse(JSON.stringify(products))
    if(action=="plus"){
    newProducts[index].quantity=parseInt(initialQuantity) +1
    }else{
newProducts[index].quantity=parseInt(initialQuantity) -1
    }
    setProduct(newProducts)

    let indexdrop= dropdown.findIndex((item)=>item.product == product)
    let newDropdown= JSON.parse(JSON.stringify(dropdown))
    if(action=="plus"){
    newDropdown[indexdrop].quantity=parseInt(initialQuantity) +1
    }else{
newDropdown[indexdrop].quantity=parseInt(initialQuantity) -1
    }
    setDropdown(newDropdown)
  console.log(action, product);
  setloadingaction(true);

  try {
    const res = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, product, initialQuantity }),
    });

    const datajson = await res.json();
    console.log(datajson);
  } catch (error) {
    console.error("Error in buttonAction:", error);
  } finally {
    setloadingaction(false);
  }
};


  const addProduct = async (e) => {
    
    e.preventDefault();

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      const data = await res.json();
      if (res.ok) {
        setAlert("✅ Product added successfully!");
        setAlert("Your Product has been added");
        setproductForm({});
      } else {
        alert("❌ Failed to add product: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the product.");
    }
    //fetch the product again 
   const response = await fetch("/api/product");
      const rjson = await response.json();
      setProduct(rjson.products);
  };

  const handleChange = (e) => {
    setproductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropdownEdit = async (e) => {
    let value= (e.target.value)
    setQuery(value);
    if (value.length>3) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch("/api/search?query=" + query);
      const rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    }else{
      setDropdown([])
    }
  };
  return (
    <>
      <Header />

      {/* Main Container */}
      <div className=" bg-violet-300 pt-5">
        <div className="container bg-violet-100 w-[980px] mx-auto mt-5 p-6 rounded-lg shadow-lg ">
          <div className="text-green-800 text-center">{alert}</div>
          {/*search section*/}
          <h1 className="text-1xl  mt-[50px] font-light text-gray-800 mb-2 flex items-center justify-between divide-black">
            <span className="text-2xl font-semibold text-gray-800 mb-4">
              Search a Product
            </span>

            {/* Input + Dropdown */}
            <div className="flex items-center gap-3">
              <input
                onChange={onDropdownEdit}
                type="text"
                placeholder="Search by name..."
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-400 w-90"
              />

              
            </div>
          </h1>
          {loading && (
            <div className=" flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                width="40"
                height="40"
              >
                <circle
                  fill="black"
                  stroke="black"
                  strokeWidth="1"
                  r="7"
                  cx="15"
                  cy="40"
                >
                  <animate
                    attributeName="cx"
                    dur="1.5s"
                    values="15;65;65;15;15"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  fill="black"
                  stroke="black"
                  strokeWidth="1"
                  opacity=".8"
                  r="7"
                  cx="15"
                  cy="40"
                >
                  <animate
                    attributeName="cx"
                    dur="1.5s"
                    values="15;65;65;15;15"
                    repeatCount="indefinite"
                    begin="0.05s"
                  />
                </circle>
                <circle
                  fill="black"
                  stroke="black"
                  strokeWidth="1"
                  opacity=".6"
                  r="7"
                  cx="15"
                  cy="40"
                >
                  <animate
                    attributeName="cx"
                    dur="1.5s"
                    values="15;65;65;15;15"
                    repeatCount="indefinite"
                    begin="0.1s"
                  />
                </circle>
                <circle
                  fill="black"
                  stroke="black"
                  strokeWidth="1"
                  opacity=".4"
                  r="7"
                  cx="15"
                  cy="40"
                >
                  <animate
                    attributeName="cx"
                    dur="1.5s"
                    values="15;65;65;15;15"
                    repeatCount="indefinite"
                    begin="0.15s"
                  />
                </circle>
                <circle
                  fill="black"
                  stroke="black"
                  strokeWidth="1"
                  opacity=".2"
                  r="7"
                  cx="15"
                  cy="40"
                >
                  <animate
                    attributeName="cx"
                    dur="1.5s"
                    values="15;65;65;15;15"
                    repeatCount="indefinite"
                    begin="0.2s"
                  />
                </circle>
              </svg>
            </div>
          )}
          <div className="dropcontainer absolute w-[70vw]  border-cyan-100 rounded-md bg-purple-200">
            {dropdown.map((item) => {
              return (
                <div
                  key={item.product}
                  className="container flex justify-between border-b p-2 my-1"
                >
                  <span className="product">
                    {item.product} ({item.quantity} available for ₹{item.price}{" "}
                    )
                  </span>
                  <div className="mx-5">
                    <button  onClick={()=>{buttonAction("minus",item.product,item.quantity)}} disabled={loadingaction}  className="px-3 py-1 cursor-pointer bg-gradient-to-r from-purple-400 to-purple-500 text-black rounded-lg font-semibold shadow-sm cursor-pointer hover:from-purple-400 hover:to-purple-500 transition disabled:bg-purple-200">
                      −
                    </button>
                    <span className="quantity inline-block w-4 mx-3">{item.quantity}</span>
                    <button  onClick={()=>{buttonAction("plus",item.product,item.quantity)}}  disabled={loadingaction}  className="px-3 py-1 cursor-pointer bg-gradient-to-r from-purple-400 to-purple-500 text-black rounded-lg font-semibold shadow-sm cursor-pointer hover:from-purple-400 hover:to-purple-500 transition disabled:bg-purple-200">
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Product Section */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">
            Add a Product
          </h1>

          {/* Add Product Form */}
          <form className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                value={productForm.product || ""}
                name="product"
                onChange={handleChange}
                type="text"
                placeholder="Enter product name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Category
              </label>
              <input
                value={productForm.category || ""}
                name="category"
                onChange={handleChange}
                type="text"
                placeholder="Enter category"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Quantity
              </label>
              <input
                value={productForm.quantity || ""}
                name="quantity"
                onChange={handleChange}
                type="number"
                placeholder="Enter quantity"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Price (₹)
              </label>
              <input
                value={productForm.price || ""}
                name="price"
                onChange={handleChange}
                type="number"
                placeholder="Enter price"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div className="col-span-2 flex justify-end">
              <button
  onClick={addProduct}
  type="submit"
  className="bg-violet-500/80 hover:bg-violet-600/80 backdrop-blur-md text-white font-semibold px-6 py-2 rounded-lg border border-violet-400/50 shadow-sm hover:shadow-md transition-all duration-300"
>
  Add Product
</button>

            </div>
          </form>

          {/* Display Current Stock Section */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Displaying Current Stock
          </h1>

          {/* Table UI */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-left text-sm">
              <thead className="bg-violet-300 text-gray-800 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3 border-b">Product</th>
                  <th className="px-4 py-3 border-b">Category</th>
                  <th className="px-4 py-3 border-b">Quantity</th>
                  <th className="px-4 py-3 border-b">Price (₹)</th>
                  

                
                </tr>
              </thead>
              <tbody>
                {/*sample data*/}
                {products.map((product) => {
                  return (
                    <tr key={product.product} >
                      <td className="px-4 py-3 border-b">{product.product}</td>
                      <td className="px-4 py-3 border-b">{product.category}</td>
                      <td className="px-4 py-3 border-b">{product.quantity}</td>
                      <td className="px-4 py-3 border-b">₹{product.price}</td>
                      
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
