import React, { useState } from "react";
import { UserService } from "../../../../api/services/mongoDB/userService";
import { User } from "../../../../model/userModel"; // Adjust the import path accordingly

const CreateUserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    role: "user",
    name: "",
    username: "",
    avatar: "",
    isAuthenticated: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await UserService.create(user);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="text"
        name="name"
        value={user.name || ""}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="username"
        value={user.username || ""}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="text"
        name="avatar"
        value={user.avatar || ""}
        onChange={handleChange}
        placeholder="Avatar URL"
      />
      <select name="role" value={user.role} onChange={() => handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
