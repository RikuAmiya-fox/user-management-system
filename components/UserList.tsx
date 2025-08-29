"use client";

import { Box, Link, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { softDeleteUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";
import { useRouter } from "next/navigation";
import { roleOptions } from "./RegisterForm";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const router = useRouter();
  const [usersList, setUsersList] = useState<User[]>(users);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [selectRole, setSelectRole] = useState<string>("");
  const [selectId, setSelectId] = useState<string>("");

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

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectRole(event.target.value);
  };
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectId(event.target.value);
  };

  const filteredUsers = usersList
    .filter((user) => {
      return selectRole ? user.role === selectRole : true;
    })
    .filter((user) => {
      return selectId ? user.id === Number(selectId) : true;
    });

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, m: 2 }}>
        <TextField
          sx={{ width: 300 }}
          size="medium"
          id="role-selectbox"
          label="検索：役職"
          select
          name="role-select"
          value={selectRole}
          onChange={handleRoleChange}
        >
          <MenuItem value="">
            <em>全て</em>
          </MenuItem>
          {roleOptions.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ width: 300 }}
          size="medium"
          id="id-selectbox"
          label="検索：ID"
          select
          name="id-select"
          value={selectId}
          onChange={handleIdChange}
        >
          <MenuItem value="">
            <em>全て</em>
          </MenuItem>
          {usersList.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.id} : {user.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 2,
        }}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <CustomCard
              index={index + 1}
              variant={index % 2 !== 0 ? "odd" : undefined}
              key={user.id}
              title={user.name}
              description={
                <>
                  ID：{user.id}
                  <br />
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
                        ID：{user.id}
                        <br />
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
                        <strong>本当にこのユーザーを削除しますか？</strong>{" "}
                        <br />
                        ID：{user.id}
                        <br />
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
          ))
        ) : (
          <Typography sx={{ m: 2 }}>該当するユーザーはいません。</Typography>
        )}
      </Box>
    </>
  );
};

export default UserList;
