import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { User } from "../types/User";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <Card sx={{ minWidth: 275}}>
      <CardContent>
        <Typography>名前: {user.name}</Typography>
        <Typography>メール: {user.email}</Typography>
        <Typography>役割: {user.role}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
