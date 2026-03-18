import axios from "axios";

const API = "http://localhost:8080/orders";

export const getOrders = () => axios.get(API);

export const createOrder = (order) => axios.post(API, order);

export const deleteOrder = (id) => axios.delete(`${API}/${id}`);