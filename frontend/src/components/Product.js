import React, { useEffect, useState } from "react";
import API from "../api";

function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [editId, setEditId] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchProducts = async () => {
        const res = await API.get(`/product?page=${page}&pageSize=${pageSize}`);
        setProducts(res.data);
    };

    const fetchCategories = async () => {
        const res = await API.get("/category");
        setCategories(res.data);
    };

    const addOrUpdateProduct = async () => {
        if (!name || !categoryId) {
            return alert("All fields required");
        }
        if (editId) {
            await API.put(`/product/${editId}`, {
                productname: name,
                categoryid: categoryId,
            });
            setEditId(null);
        } else {
            await API.post("/product", {
                productname: name,
                categoryid: categoryId,
            });
        }
        setName("");
        setCategoryId("");
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        await API.delete(`/product/${id}`);
        fetchProducts();
    };

    const editProduct = (p) => {
        setName(p.productname);
        setCategoryId(p.categoryid);
        setEditId(p.productid);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [page]);

    return (
        <div className="container mt-4">
            <div className="card p-3">
                <h3>Product Master</h3>

                <div className="d-flex gap-2 mb-3">
                    <input
                        className="form-control"
                        placeholder="Product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <select
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                            <option key={c.categoryid} value={c.categoryid}>
                                {c.categoryname}
                            </option>
                        ))}
                    </select>
                    <button className="btn btncustom" onClick={addOrUpdateProduct}>
                        {editId ? "Update" : "Add"}
                    </button>
                    {editId && (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setEditId(null);
                                setName("");
                                setCategoryId("");
                            }}
                        >Cancel
                        </button>
                    )}
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.productid}>
                                <td>{p.productid}</td>
                                <td>{p.productname}</td>
                                <td>{p.categoryname}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editProduct(p)}
                                    >Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteProduct(p.productid)}
                                    >Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between">    {/* PAGINATION */}
                    <button
                        className="btn btn-secondary"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >Prev
                    </button>
                    <span>Page {page}</span>
                    <button
                        className="btn btn-secondary"
                        disabled={products.length < pageSize}
                        onClick={() => setPage(page + 1)}
                    >Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;