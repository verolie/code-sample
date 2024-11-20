import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext"; // Adjust the path if needed

export function useContextUpdate(isLogin, sessionId) {
  const context = useContext(AppContext);

  useEffect(() => {
    if (isLogin && sessionId && context) {
      context.updateSessionId(sessionId);
    }
  }, [isLogin, sessionId, context]);
}
