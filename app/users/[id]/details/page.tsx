// app/users/[id]/details/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { fetchUserById } from "@/utils/api";
import { User } from "@/types/User";
import UserDetails from "@/components/UserDetails";

const UserDetailsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>();
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    const getUser = async () => {
      try {
        const userdata = await fetchUserById(Number(userId));
        setUser(userdata);
      } catch (err) {
        console.error("ユーザー情報の取得に失敗しました。" + err);
      }
    };
    getUser();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー詳細
      </Typography>
      <Box>{user && <UserDetails user={user} />}</Box>
    </Box>
  );
};

export default UserDetailsPage;
