"use client";

import { Button } from "@mui/material";
import React from "react";
import { softDeleteUser } from "../utils/api";

interface DeleteUserButtonProps {
  userId: number;
  onDelete: (userId: number) => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDelete,
}) => {
  const handleSoftDelete = async () => {
    try {
      if (confirm("本当にこのユーザーを削除しますか？")) {
        await softDeleteUser(userId);
        onDelete(userId);
      }
    } catch (e) {
      console.log("ユーザーの削除に失敗しました。" + e);
    }
  };

  return (
    <Button onClick={handleSoftDelete} size="small" color="error">
      削除
    </Button>
  );
};

export default DeleteUserButton;
