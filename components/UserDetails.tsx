import { Box, Link } from "@mui/material";
import React, { useState } from "react";
import { User } from "../types/User";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import CustomModal from "./parts/CustomModal";
import { softDeleteUser } from "@/utils/api";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const [confirmId, setConfirmId] = useState<Number | null>(null);

  const handleSoftDelete = async (deleteUserID: number) => {
    try {
      await softDeleteUser(deleteUserID);
    } catch (e) {
      console.log("ユーザーの削除に失敗しました。" + e);
    } finally {
      setConfirmId(null);
    }
  };

  return (
    <CustomCard
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
            display: "flex",
            gap: 1,
            justifyContent: "center",
          }}
        >
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
            content={"本当にこのユーザーを削除しますか？"}
            onClose={() => setConfirmId(null)}
            onConfirm={() => handleSoftDelete(user.id)}
          />
        </Box>
      }
    />
  );
};

export default UserDetails;
