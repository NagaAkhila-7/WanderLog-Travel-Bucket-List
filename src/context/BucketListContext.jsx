import { createContext, useState } from "react";

export const BucketListContext = createContext();

function BucketListProvider({ children }) {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || [],
  );

  const [visited, setVisited] = useState(
    JSON.parse(localStorage.getItem("visited")) || [],
  );

  const addToWishlist = (country) => {
    const updated = [...wishlist, country];

    setWishlist(updated);

    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToVisited = (country) => {
    const updated = [...visited, country];

    setVisited(updated);

    localStorage.setItem("visited", JSON.stringify(updated));
  };

  return (
    <BucketListContext.Provider
      value={{
        wishlist,
        visited,
        addToWishlist,
        addToVisited,
      }}
    >
      {children}
    </BucketListContext.Provider>
  );
}

export default BucketListProvider;
