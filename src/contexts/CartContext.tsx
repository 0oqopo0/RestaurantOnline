import { createContext, useContext, useState } from 'react';
import moment from 'moment-jalaali';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  addedAt: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'addedAt'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity' | 'addedAt'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      
      return [...prev, { 
        ...item, 
        quantity: 1, 
        addedAt: moment().format('jYYYY/jMM/jDD HH:mm:ss') 
      }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;