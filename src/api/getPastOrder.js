export default async function getPastOrder(orderId) {
  const response = await fetch(`/api/past-order/${orderId}`);
  return await response.json();
}
