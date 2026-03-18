const API_URL = "http://localhost:8080/orders";

export const getOrders = async () => {
  const response = await fetch(API_URL);
  return response.json();
};