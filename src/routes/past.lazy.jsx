import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense, use, useState } from "react";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
import { priceConverter } from "../useCurrencty";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrapperPastOrderRoutes,
});

function ErrorBoundaryWrapperPastOrderRoutes() {
  const [page, setPage] = useState(1);

  // Fetching past orders
  const loadedPromise = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  }).promise;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Loading Past Order ...</h2>
          </div>
        }
      >
        <PastOrdersRoute
          loadedPromise={loadedPromise}
          page={page}
          setPage={setPage}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

function PastOrdersRoute(props) {
  const { loadedPromise, page, setPage } = props;
  const data = use(loadedPromise);

  console.log(data);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetching order details
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", selectedOrderId],
    queryFn: () => getPastOrder(selectedOrderId),
    staleTime: 86400000, // one day in milliseconds
    enabled: !!selectedOrderId,
  });

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setSelectedOrderId(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {selectedOrderId && (
        <Modal>
          <h2>Order# {selectedOrderId}</h2>
          {isLoadingPastOrder ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((order) => (
                  <tr key={`${order.pizzaTypeId}_${order.size}`}>
                    <td>
                      <img src={order.image} alt={order.name} />
                    </td>
                    <td>{order.name}</td>
                    <td>{order.size}</td>
                    <td>{order.quantity}</td>
                    <td>{priceConverter(order.price)}</td>
                    <td>{priceConverter(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button onClick={() => setSelectedOrderId()}>Close</button>
        </Modal>
      )}
    </div>
  );
}
