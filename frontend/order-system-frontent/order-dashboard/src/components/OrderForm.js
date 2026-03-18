import { useState } from "react";
import { createOrder } from "../services/api";

function OrderForm({ reload }) {

  const [order, setOrder] = useState({
    firstName: "",
    product: "",
    quantity: 1,
    unitPrice: 0
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await createOrder({
      ...order,
      status: "Pending",
      createdBy: "Admin"
    });

    reload();
  };

  return (
    <div className="card p-3 mb-4">

      <h4>Create Order</h4>

      <form onSubmit={submit} className="row g-3">

        <div className="col-md-4">
          <input
            name="firstName"
            className="form-control"
            placeholder="Customer Name"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <input
            name="product"
            className="form-control"
            placeholder="Product"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            name="quantity"
            type="number"
            className="form-control"
            placeholder="Qty"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <input
            name="unitPrice"
            type="number"
            className="form-control"
            placeholder="Price"
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary">
            Create Order
          </button>
        </div>

      </form>

    </div>
  );
}

export default OrderForm;