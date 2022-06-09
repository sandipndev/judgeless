import { User } from "firebase/auth";
import type { NextPage } from "next";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type UserContextType = [
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>
]

export const UserContext = createContext<UserContextType>([null, () => null]);

const UserContextProvider: NextPage = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
