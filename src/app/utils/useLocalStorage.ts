import { useCallback } from "react";

export const useLocalStorage = () => {
  const saveToken = useCallback((token: string) => {
    localStorage.setItem("authToken", token);
  }, []);

  const getToken = useCallback((): string | null => {
    return localStorage.getItem("authToken");
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem("authToken");
  }, []);

  const saveLocalStorage = useCallback((key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const getLocalStorage = useCallback((key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }, []);

  const removeLocalStorage = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return {
    saveLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    getToken,
    saveToken,
    removeToken,
  };
};
