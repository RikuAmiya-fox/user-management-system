// app/users/[id]/edit/page.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React from "react";
import EditUserForm from "../../../../components/EditUserForm";
import { useParams } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

// TODO: URLパラメータからユーザーIDを取得し、EditUserFormコンポーネントに渡す

const EditUserPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const handleSuccess = () => {
    console.log("登録成功");
    router.push("/users");
  };
  const handleError = () => {
    console.log("エラー");
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー編集
      </Typography>
      <Box>
        <EditUserForm
          userId={Number(userId)}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Box>
    </Box>
  );
};

export default EditUserPage;
