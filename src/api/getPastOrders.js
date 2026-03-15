export default async function getPastOrders(page) {
  const response = await fetch(`/api/past-orders?page=${page}`);
  return await response.json();
}
