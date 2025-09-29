import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '../store/useCartStore';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCartStore();

  // Validar y calcular el total
  const total = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return acc + price * quantity;
  }, 0);

  return (
    <>
      <Navbar />
      <section className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-manga-blue mb-6">Tu carrito</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={item.id || Math.random()} // Fallback para evitar errores si no hay id
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-manga-darkBlue">
                      {item.title || 'Producto sin nombre'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${item.price?.toFixed(2) || '0.00'} x {item.quantity || 0}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-lg font-bold text-manga-blue">
                Total: ${total.toFixed(2)}
              </p>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Cart;