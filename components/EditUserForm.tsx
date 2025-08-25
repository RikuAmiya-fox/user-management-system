// components/EditUserForm.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { fetchUserById, updateUser } from "../utils/api";
import { User } from "../types/User";

// 必要に応じて利用する
interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}

interface EditUserFormProps {
  userId: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

// TODO: ユーザー編集フォームコンポーネントを実装する
const EditUserForm: React.FC<EditUserFormProps> = ({
  onSuccess,
  onError,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const user: User | null = await fetchUserById(userId);
        if (user) {
          setValue("name", user.name);
          setValue("email", user.email);
          setValue("role", user.role);
        } else {
          console.error("ユーザーが見つかりません。");
        }
      } catch (err) {
        console.error("ユーザー情報の取得に失敗しました。" + err);
      }
    };
    getUser();
  }, []);

  const onSubmit: SubmitHandler<EditUserFormInputs> = async (data) => {
    try {
      await updateUser(userId, data);
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      if (onError) {
        onError(e);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー情報編集
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            {...register("name")}
            placeholder="名前"
            fullWidth
          ></TextField>
          <TextField
            {...register("email")}
            placeholder="メール"
            fullWidth
          ></TextField>
          <TextField
            {...register("role")}
            placeholder="役職"
            fullWidth
          ></TextField>
          <Button type="submit" variant="contained" fullWidth>
            更新
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditUserForm;
