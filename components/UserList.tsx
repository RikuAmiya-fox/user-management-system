"use client";

import { Box, Button, Link } from "@mui/material";
import React, { useState } from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { softDeleteUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";
import Image from "next/image";
import typingImage from "../components/parts/image/神速の打鍵術師_20250827130703.jpg";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [usersList, setUsersList] = useState<User[]>(users);
  const [confirmId, setConfirmId] = useState<Number | null>(null);

  const handleSoftDelete = async (deleteUserID: number) => {
    try {
      await softDeleteUser(deleteUserID);
      setUsersList((filterUsers) =>
        filterUsers.filter((user) => user.id !== deleteUserID)
      );
    } catch (e) {
      console.log("ユーザーの削除に失敗しました。" + e);
    } finally {
      setConfirmId(null);
    }
  };

  return (
    <Box>
      {usersList.map((user, index) => (
        <CustomCard
          variant={index % 2 !== 0 ? "odd" : undefined}
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
                onClick={() => {
                  setConfirmId(user.id);
                }}
              >
                削除
              </CustomButton>
              <CustomModal
                open={confirmId === user.id}
                title={"COUTION!!"}
                content={"本当にこのユーザーを削除しますか？"}
                onClose={() => setConfirmId(null)}
                onConfirm={() => handleSoftDelete(user.id)}
              />
            </>
          }
        />
      ))}
    </Box>
  );
};

export default UserList;
