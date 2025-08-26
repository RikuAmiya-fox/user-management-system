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

const roleOptions = [
  "研修生",
  "プログラマー",
  "SE",
  "PL",
  "PM",
  "EM",
  "事務",
  "人事",
  "その他",
];

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
            {...register("name", {
              required: "名前は必須項目です",
              minLength: {
                value: 1,
                message: "名前は1文字以上で入力してください",
              },
              maxLength: {
                value: 20,
                message: "名前は20文字以内で入力してください",
              },
              pattern: {
                value: /^[^!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~　]+$/,
                message: "名前に記号や全角スペースを含めることはできません",
              },
            })}
            placeholder="名前"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          ></TextField>
          <TextField
            {...register("email", {
              required: "メールアドレスは必須項目です",
              pattern: {
                value:
                  /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/,
                message: "メールアドレスの形式が不適切です",
              },
            })}
            placeholder="メール"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            {...register("role", {
              required: "役職は必須項目です",
              validate: (value) =>
                roleOptions.includes(value) ||
                `役職は[${roleOptions.join("、")}]のいずれかを入力してください`,
            })}
            placeholder="役職"
            fullWidth
            error={!!errors.role}
            helperText={errors.role?.message}
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
