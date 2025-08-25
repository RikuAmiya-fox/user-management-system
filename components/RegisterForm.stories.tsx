// components/RegisterForm.stories.tsx

import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

// TODO: メタデータ
const meta: Meta<typeof RegisterForm> = {
  title: "Components/RegisterForm",
  component: RegisterForm,
};

export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof RegisterForm>;

// TODO: デフォルトストーリーの設定
export const Default: Story = {
  args: {
    user: {
      name: "",
      email: "",
      role: "",
    },
  },
};
