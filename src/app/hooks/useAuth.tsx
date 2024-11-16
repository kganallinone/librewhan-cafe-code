import { useEffect, useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { User } from "../../model/userModel";
import { userService } from "./../../api/services/firestore/userService";

export const useAuth = () => {
  const { saveLocalStorage, getLocalStorage } = useLocalStorage();
  const [auth, setAuth] = useState<User | null>(null);
  // const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const savedAuth = getLocalStorage("auth");
    if (savedAuth) {
      setAuth(savedAuth);
    }
  }, [getLocalStorage]);

  const authenticate = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; userData?: any; role?: string }> => {
    const result = await userService.login(email, password); // Ensure login is the correct function here

    console.log(result);
    if (result.success) {
      console.log("Login successful!");
      // console.log("User Data:", result.userData);
      saveLocalStorage("auth", {
        id: result.userData.id,
        isAuthenticated: true,
        email: result.userData.email,
        name: result.userData.name.first + " " + result.userData.name.last,
        role: result.userData.role || "user",
        avatar: result.userData.avatar || "",
      });
      return {
        success: true,
        userData: result.userData,
        role: result.userData.role,
      }; // Return success and userData
    } else {
      console.log("Login failed. Please check your username or password.");
      return { success: false }; // Return success with false and no userData
    }
  };

  const signup = async (data: any) => {
    try {
      const result = await userService.signup(data, undefined, data.email);

      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const logout = () => {
    setAuth(null);
    saveLocalStorage("auth", null);
  };

  const updateProfile = async (id: string, data: any) => {
    try {
      const result = await userService.update(id, data);

      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const updatePassword = async (
    id: string,
    currentPassword: string,
    newPassword: any
  ) => {
    try {
      const get = await userService.get(id);

      if (get?.password !== currentPassword) {
        return null;
      }

      const result = await userService.update(id, { password: newPassword });

      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const getProfile = (id: string) => {
    try {
      const result = userService.get(id);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const deleteProfile = (id: string) => {
    try {
      const result = userService.delete(id);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const getProfiles = async () => {
    try {
      const result = await userService.getAll();
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  return {
    auth,
    authenticate,
    signup,
    logout,
    setAuth,
    saveLocalStorage,
    getLocalStorage,
    updateProfile,
    updatePassword,
    getProfile,
    deleteProfile,
    getProfiles,
    // users,
  };
};
