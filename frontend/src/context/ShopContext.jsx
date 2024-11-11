import { createContext } from "react";
import { products } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
   
   const value = {
    products,
     currency: '$',
     delivery_fee: 10
   };

   return (
       <ShopContext.Provider value={value}>
           {children}
       </ShopContext.Provider>
   );
};

export default ShopContextProvider;
