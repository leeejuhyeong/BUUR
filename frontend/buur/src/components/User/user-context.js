import React, { createContext, useState, useContext } from "react";


const Context = createContext();

export function UserContextProvider({ children }) {
  const [JWT, setUser] = useState(null);
  const [review, setReview] = useState("");

  return (
    <Context.Provider
      value={{
        JWT,
        setUser,
        review,setReview
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
