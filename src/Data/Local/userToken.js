import { useState } from "react";
import { TOKEN } from "./constants";

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem(TOKEN); // ✅ just get it as string
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    // Save as plain string, no JSON.stringify needed
    localStorage.setItem(TOKEN, userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
