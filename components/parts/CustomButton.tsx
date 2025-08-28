// components/parts/CustomButton.tsx

import React from "react";
import { Button, ButtonProps } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface CustomButtonProps extends ButtonProps {
  variantType?: "primary" | "secondary" | "danger" | "gradation";
  buttonRound?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variantType = "primary",
  buttonRound = false,
  ...props
}) => {
  let color: ButtonProps["color"] = "primary";
  let variant: ButtonProps["variant"] = "outlined";

  const buttonStyles = {
    padding: "0.8rem 1.8rem",
    borderRadius: "8px",
    boxShadow: `0px 3px 0px 0px #58514fff`,
    transform: "translateY(0)",
    transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",

    "&:hover": {
      boxShadow: `0px 4px 0px 0px #221815`,
      ...(variantType === "primary" && {
        backgroundColor: "#2b89f5ff",
        color: "#ffffff",
      }),
    },

    "&:active": {
      transform: "translateY(2px)",
      boxShadow: `0px 1px 0px 0px #221815`,
    },

    ...(variantType === "gradation" && {
      background: "linear-gradient(45deg, #07aeea 30%, #2bf598 90%)",
      color: "white",
    }),

    ...(buttonRound && {
      borderRadius: "1000px",
    }),
  };

  // TODO: variantTypeに応じてcolorを変化させる
  // colorに設定する色は調べて実装する
  if (variantType === "secondary") {
    color = "secondary";
  } else if (variantType === "danger") {
    color = "error";
  } else if (variantType === "gradation") {
    variant = "contained";
  }

  return (
    // TODO: <Button>の実装
    // プロップスには[color][variant]を設定し、{...props}を最後に設定する
    <Button sx={buttonStyles} color={color} variant={variant} {...props} />
  );
};

export default CustomButton;
