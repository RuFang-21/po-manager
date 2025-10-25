import { createContext, FC, PropsWithChildren, useContext } from "react"
import { useMMKVString } from "react-native-mmkv"

export type AuthContextType = {
  isAuthenticated: boolean
  authToken?: string
  authEmail?: string
  setAuthToken: (token?: string) => void
  setAuthEmail: (email: string) => void
  logout: () => void
  validationError: string
}

export const AuthContext = createContext<AuthContextType | null>(null)

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ children }) => {
  const [authToken, setAuthToken] = useMMKVString("AuthProvider.authToken")
  const [authEmail, setAuthEmail] = useMMKVString("AuthProvider.authEmail")

  const isAuthenticated = !!authToken

  const logout = () => {
    setAuthToken(undefined)
    setAuthEmail(undefined)
  }

  const contextValue: AuthContextType = {
    isAuthenticated,
    authToken,
    authEmail,
    setAuthToken,
    setAuthEmail: (email: string) => setAuthEmail(email),
    logout,
    validationError: "", // Add validation logic if needed
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
