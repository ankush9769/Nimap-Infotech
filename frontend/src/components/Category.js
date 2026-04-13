import React from "react";
import { useEffect,useState } from "react";
import API from "../api";

function Category() {
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [editId,setEditId] = useState(null);

  const fetchCategories = async ()=>{
    const res = await API.get("/category");
    setCategories(res.data);
  };

  const addOrUpdateCategory = async ()=>{
    if (!name){
        return alert("Enter category name");
    }
    if (editId) {
      await API.put(`/category/${editId}`,{categoryname: name,});
      setEditId(null);
    } else {
      await API.post("/category", { categoryname: name });
    }
    
    setName("");
    fetchCategories();
  };

  const deleteCategory = async (id)=> {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await API.delete(`/category/${id}`);
    fetchCategories();
  };

  const editCategory = (cat) => {
    setName(cat.categoryname);
    setEditId(cat.categoryid);
  };

  useEffect(()=>{
    fetchCategories();
  },[]);

  return (
    <div className="container mt-4">
      <div className="card p-3 cardcustomize">
        <h3>Category Master</h3>
        <div className="d-flex gap-2">
          <input
            className="form-control"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            placeholder="Enter category"/>
          <button className="btn btncustom" onClick={addOrUpdateCategory}>{editId ? "Update" : "Add"}
          </button>
            {editId && <button className="btn btn-secondary" onClick={()=>{setEditId(null); setName("");}}>Cancel</button>}
        </div>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.categoryid}>
                <td>{c.categoryid}</td>
                <td>{c.categoryname}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={()=> editCategory(c)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(c.categoryid)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;