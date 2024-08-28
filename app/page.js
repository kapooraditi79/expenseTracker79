"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getDoc, querySnapshot, query, onSnapshot } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

export default function Home() {
  const [items, setItems] = useState([
    // { name: "Coffee", price: 9.37 },
    // { name: "Book", price: 7.1 },
    // { name: "Laptop", price: 89.3 },
  ]);

  const [newItem, setnewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState([0]);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      setItems([...items, newItem]);
      setnewItem({ name: "", price: "" });

      //ADD DATA TO FIREBASE
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(), //to trim any spaces in between
        price: newItem.price,
      });
    }
  };

  //READ DATA FROM FIREBASE DATASTORE DIRECTLY
  //DONE USING USEFFECT
  //MAKE SURE TO IMPORT IT

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      //dont know the hell unsubscribe means

      querySnapshot.forEach((doc) => {
        //essentially taking a snapshot of each doc in the database
        itemsArr.push({ ...doc.data(), id: doc.id });
      }); //IMPORT all the extra stuff you used here
      setItems(itemsArr);

      //The data of DATABASE is pushed into ItemsArr
      //And our application or state reads it from ItemsArr
      //So Technically we are going to read the total from ItemsArr

      //READING TOTAL FROM ItemsArr
      const calculateTotal = () => {
        //building calculating function
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price), //dont know the hell this is
          0
        );
        setTotal(totalPrice); //setting the total to calculated price
      };
      calculateTotal(); //calling this function, everytime inside if

      return () => unsubscribe(); //dont know the hell this is
    });
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setnewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border mx-2"
              type="text"
              placeholder="enter-item"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setnewItem({ ...newItem, price: e.target.value })
              }
              className="col-span-2 p-3 border"
              type="number"
              placeholder="enter-$"
            />
            <button
              onClick={addItem}
              className="col-span-1 p-3  text-white hover:bg-slate-950 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="bg-slate-900 p-3 border my-2 flex w-full justify-between "
              >
                <div className="border p-4 flex justify-between w-full">
                  <span className="w-full flex justify-begin">{item.name}</span>
                  <span className="w-full flex justify-end">${item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 mx-2 my-2 hover:bg-red-500 flex justify-center w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="border flex w-full justify-between">
              <span className=" p-4 w-full flex justify-begin">Total</span>
              <span className=" w-full p-4 flex justify-end">${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
