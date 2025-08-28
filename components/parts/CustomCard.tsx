// components/parts/CustomCard.tsx

import React from "react";
import { Card, CardContent, Typography, CardActions } from "@mui/material";

// TODO: インターフェースを修正
interface CustomCardProps {
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "odd";
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
  variant,
}) => {
  const cardStyle = {
    minWidth: 275,
    mb: 2,
    boxshadow: "0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.22)",
    transition: ".3s",
    backgroundColor: variant === "odd" ? "#f5f5f5" : "inherit",

    "&:hover": {
      boxshadow: " 0 15px 30px -5px rgba(0,0,0,.15), 0 0 5px rgba(0,0,0,.1)",
      transform: "translateY(-4px)",
    },
  };

  return (
    <Card sx={cardStyle}>
      <CardContent>
        {/*TODO: [titel]と[description]を表示*/}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body1"> {description}</Typography>
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CustomCard;
