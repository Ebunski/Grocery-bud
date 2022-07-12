import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function getData() {
  let data = JSON.parse(localStorage.getItem("grocery"));
  if (data) return data;
  return [];
}

function App() {
  const [addItem, setAddItem] = useState("");
  const [items, setItems] = useState(getData());
  const [edit, setEdit] = useState({
    id: null,
    active: false,
  });
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  function showAlert(show = false, msg = "", type = "") {
    setAlert({ show, msg, type });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (addItem === "") return showAlert(true, "Enter an item", "danger");
    if (edit.active) {
      setItems((prev) =>
        prev.map((x) => (x.id === edit.id ? { ...prev, title: addItem } : x))
      );
      showAlert(true, "Edited successfully", "success");
      setEdit((prev) => ({ id: null, active: false }));
      setAddItem("");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: addItem,
      };
      showAlert(true, "Added successfully", "success");
      setItems((prev) => [...prev, newItem]);
      setAddItem("");
    }
  }

  useEffect(
    () => localStorage.setItem("grocery", JSON.stringify(items)),
    [items]
  );

  function handleDelete(id) {
    if (id === "all") {
      setItems([]);
      setEdit((prev) => ({ id: null, active: false }));
    }
    if (id !== "all") setItems(items.filter((x) => x.id !== id));

    showAlert(true, "Deleted successfully", "danger");
  }

  function handleUpdate(id) {
    const grocery = items.find((x) => x.id === id);
    setAddItem(grocery.title);
    setEdit({ active: true, id });
  }

  return (
    <main>
      <section className="section-center">
        {alert.show && (
          <Alert alert={alert} removeAlert={showAlert} items={items} />
        )}
        <div className="grocery-form">
          <h3>Grocery bud</h3>
          <form className="form-control" onSubmit={handleSubmit}>
            <input
              className="grocery"
              type="text"
              placeholder="e.g eggs"
              value={addItem}
              onChange={(e) => setAddItem(e.target.value)}
            />
            <button className="submit-btn">
              {edit.active ? "Edit" : "submit"}
            </button>
          </form>
        </div>

        {items !== [] && (
          <section className="grocery-container">
            <List
              items={items}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />

            <button className="clear-btn" onClick={() => handleDelete("all")}>
              clear Items
            </button>
          </section>
        )}
      </section>
    </main>
  );
}

export default App;
