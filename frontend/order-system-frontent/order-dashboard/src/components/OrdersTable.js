import { deleteOrder } from "../services/api";

function OrdersTable({ orders, reload }) {

  const remove = async (id) => {
    await deleteOrder(id);
    reload();
  };

  return (
    <div className="card p-3">

      <h4>Orders</h4>

      <table className="table table-striped table-hover table-bordered">

        <thead>
          <tr>
            <th>Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {orders?.map(o => (
            <tr key={o.id}>
              <td>{o.firstName}</td>
              <td>{o.product}</td>
              <td>{o.quantity}</td>
              <td>{o.totalAmount}</td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => remove(o.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OrdersTable;