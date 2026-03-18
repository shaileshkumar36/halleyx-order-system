function TableWidget() {

  const data = [
    { name: "John", product: "Internet 300", qty: 2, total: 100 },
    { name: "Shailesh", product: "Phone", qty: 1, total: 40000 }
  ];

  return (
    <table className="table">

      <thead>
        <tr>
          <th>Name</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.product}</td>
            <td>{item.qty}</td>
            <td>{item.total}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default TableWidget;