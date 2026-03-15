import { useCurrency } from "./useCurrencty";

function Cart({ cart, checkout }) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const currentItem = cart[i];
    totalPrice += currentItem.pizza.sizes[currentItem.size];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size} - </span>
            <span className="type">{item.pizza.name} - </span>
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total price: {useCurrency(totalPrice)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default Cart;
