import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = (props) => {
  const list = props.items.map((x) => {
    const { id, title } = x;
    return (
      <article key={id} className=" grocery-item">
        <h4 className="title">{title}</h4>
        <div>
          <FaEdit className="edit-btn" onClick={() => props.handleUpdate(id)} />
          <FaTrash
            className="delete-btn"
            onClick={() => props.handleDelete(id)}
          />
        </div>
      </article>
    );
  });

  return <>{list}</>;
};

export default List;
