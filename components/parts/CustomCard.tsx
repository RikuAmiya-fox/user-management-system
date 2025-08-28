// components/parts/CustomCard.tsx

import React from "react";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import { Padding, WidthFull } from "@mui/icons-material";

// TODO: インターフェースを修正
interface CustomCardProps {
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "odd";
  index?: number;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
  variant,
  index,
}) => {
  const cardStyle = {
    position: "relative",
    minWidth: 275,
    width: "100%",
    padding: "8px",
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
      {index && (
        <Typography
          sx={{
            position: "absolute",
            top: 8,
            right: 16,
            color: "grey.500",
            fontWeight: "bold",
          }}
        >
          {index}
        </Typography>
      )}
      <CardContent>
        {/*TODO: [titel]と[description]を表示*/}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography component="div" variant="body1"> {description}</Typography>
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CustomCard;
