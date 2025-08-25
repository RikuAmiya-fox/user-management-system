// app/register/page.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

// TODO: 新規登録ページを実装し、RegisterFormコンポーネントを使用する
const RegisterPage: React.FC = () => {
  const router = useRouter();

  const hundleSuccess = () => {
    console.log("登録成功");
    router.push("/users");
  };
  const hundleError = () => {
    console.log("エラー");
  };
  return (
    <Box>
      <Typography component="h1" variant="h4">
        ユーザー新規登録
      </Typography>
      <Box>
        <RegisterForm onSuccess={hundleSuccess} onError={hundleError} />
      </Box>
    </Box>
  );
};

export default RegisterPage;
