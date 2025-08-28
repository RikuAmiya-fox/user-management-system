// components/parts/CustomModal.tsx

import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Slide,
  Fade,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

interface CustomModalProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm?: () => void;
  transitionType?: "slide" | "fade";
}

// TODO: propの設定
const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  transitionType = "slide",
}) => {
  const modalContent = (
    <Box sx={style}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "gray",
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography sx={{ mt: 2 }}>{content}</Typography>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onClose} sx={{ mr: 2 }}>
          キャンセル
        </Button>
        {onConfirm && (
          <Button variant="contained" color="primary" onClick={onConfirm}>
            確認
          </Button>
        )}
      </Box>
    </Box>
  );
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(59, 69, 78, 0.7)",
          },
        },
      }}
    >
      {transitionType === "fade" ? (
        <Fade in={open}>{modalContent}</Fade>
      ) : (
        <Slide direction="down" in={open}>
          {modalContent}
        </Slide>
      )}
    </Modal>
  );
};

export default CustomModal;
