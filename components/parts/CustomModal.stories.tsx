// components/parts/CustomModal.stories.tsx

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Box } from "@mui/material";

// TODO: メタデータ
const meta: Meta<typeof CustomModal> = {
  title: "Components/Parts/CustomModal",
  component: CustomModal,
};

export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomModal>;

// TODO: デフォルトストーリーの作成
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box>
        {/* TODO: クリックでモーダル開閉させる */}
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          モーダルを開く
        </CustomButton>
        <CustomModal
          // TODO: Propを渡す
          open={open}
          title="サンプルモーダル"
          content="サンプルです"
          // onCloceはsetOpenにfalseを渡す
          onClose={() => setOpen(false)}
          // onConfirmはalert()を使ってクリックしたことを知らせてsetOpenにfalseを渡す
          onConfirm={() => {
            alert("クリックされました");
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};


export const backgroundColor: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box>
        {/* TODO: クリックでモーダル開閉させる */}
        <CustomButton variantType="primary" onClick={() => setOpen(true)}>
          モーダルを開く
        </CustomButton>
        <CustomModal
          // TODO: Propを渡す
          open={open}
          title="サンプルモーダル"
          content="サンプルです"
          // onCloceはsetOpenにfalseを渡す
          onClose={() => setOpen(false)}
          // onConfirmはalert()を使ってクリックしたことを知らせてsetOpenにfalseを渡す
          onConfirm={() => {
            alert("クリックされました");
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};
