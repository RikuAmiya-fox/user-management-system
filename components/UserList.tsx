"use client";

import { Box, Link } from "@mui/material";
import React, { useState } from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { softDeleteUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";
import { useRouter } from "next/navigation";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const router = useRouter();
  const [usersList, setUsersList] = useState<User[]>(users);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);

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

  const handleDetail = (userId: number) => {
    setDetailId(null);
    router.push(`/users/${userId}/details`);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 2,
      }}
    >
      {usersList.map((user, index) => (
        <CustomCard
          index={index + 1}
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
            <Box
              sx={{
                width: "85%",
                margin: "0 auto",
                display: "flex",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <CustomButton
                variantType="primary"
                onClick={() => {
                  setDetailId(user.id);
                }}
              >
                詳細
              </CustomButton>
              <CustomModal
                open={detailId === user.id}
                title={"ユーザー詳細"}
                content={
                  <>
                    名前：{user.name}
                    <br />
                    メール：{user.email}
                    <br />
                    役職：{user.role}
                  </>
                }
                onClose={() => setDetailId(null)}
                onConfirm={() => handleDetail(user.id)}
              />
              <CustomButton
                variantType="secondary"
                component={Link}
                href={`/users/${user.id}/edit`}
              >
                編集
              </CustomButton>

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
                content={
                  <>
                    <strong>本当にこのユーザーを削除しますか？</strong> <br />
                    名前：{user.name} <br />
                    メール：{user.email}
                    <br />
                    役職：{user.role}
                  </>
                }
                onClose={() => setConfirmId(null)}
                onConfirm={() => handleSoftDelete(user.id)}
              />
            </Box>
          }
        />
      ))}
    </Box>
  );
};

export default UserList;
