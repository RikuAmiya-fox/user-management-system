"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import UserCard from "./UserCard";
import { User } from "../types/User";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [usersList, setUsersList] = useState<User[]>(users);

  const handleDelete = (deletedId: number) => {
    setUsersList((filterUsers) => filterUsers.filter((user) => user.id !== deletedId));
  };

  return (
    <Box>
      {usersList.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </Box>
  );
};

export default UserList;
