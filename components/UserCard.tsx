import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { User } from "../types/User";
import CustomButton from "./parts/CustomButton";
import { softDeleteUser } from "@/utils/api";

interface UserCardProps {
  user: User;
  onDelete: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const handleSoftDelete = async () => {
    try {
      if (confirm("本当にこのユーザーを削除しますか？")) {
        await softDeleteUser(user.id);
        onDelete(user.id);
      }
    } catch (e) {
      console.log("ユーザーの削除に失敗しました。" + e);
    }
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography variant="body2">役割: {user.role}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          href={`/users/${user.id}/details`}
        >
          詳細
        </Button>
        <Button size="small" component={Link} href={`/users/${user.id}/edit`}>
          編集
        </Button>
        {/* 削除ボタン */}
        <CustomButton variantType="danger" onClick={handleSoftDelete}>
          削除
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
