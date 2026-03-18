import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";

const data = [
  { name: "Jan", orders: 4 },
  { name: "Feb", orders: 7 },
  { name: "Mar", orders: 5 },
  { name: "Apr", orders: 8 }
];

export function BarChartWidget() {

  const [data, setData] = useState([]);

  useEffect(() => {

    getOrders().then((orders) => {

      const productCount = {};

      orders.forEach(order => {
        productCount[order.product] =
          (productCount[order.product] || 0) + 1;
      });

      const chartData = Object.keys(productCount).map(product => ({
        name: product,
        orders: productCount[product]
      }));

      setData(chartData);

    });

  }, []);

  return (
    <BarChart width={300} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="orders" fill="#8884d8" />
    </BarChart>
  );
}

export function LineChartWidget() {
  return (
    <LineChart width={300} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
    </LineChart>
  );
}

export function PieChartWidget() {
  return (
    <PieChart width={300} height={200}>
      <Pie data={data} dataKey="orders" nameKey="name" outerRadius={80} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={index} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}