"use client";

import { Box, Button, Link } from "@mui/material";
import React, { useState } from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { softDeleteUser } from "@/utils/api";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [usersList, setUsersList] = useState<User[]>(users);

  const handleSoftDelete = async (deleteUserID: number) => {
    try {
      if (confirm("本当にこのユーザーを削除しますか？")) {
        await softDeleteUser(deleteUserID);
        setUsersList((filterUsers) =>
          filterUsers.filter((user) => user.id !== deleteUserID)
        );
      }
    } catch (e) {
      console.log("ユーザーの削除に失敗しました。" + e);
    }
  };

  return (
    <Box>
      {usersList.map((user) => (
        <CustomCard
          key={user.id}
          title={user.name}
          description={
            <>
              メール：{user.email}
              <br />
              役職：{user.role}
            </>
          }
          actions={
            <>
              <Button
                size="small"
                component={Link}
                href={`/users/${user.id}/details`}
              >
                詳細
              </Button>
              <Button
                size="small"
                component={Link}
                href={`/users/${user.id}/edit`}
              >
                編集
              </Button>
              <CustomButton
                variantType="danger"
                onClick={() => handleSoftDelete(user.id)}
              >
                削除
              </CustomButton>
            </>
          }
        />
      ))}
    </Box>
  );
};

export default UserList;
