// components/UserDetails.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import UserDetails from "./UserDetails";

const meta: Meta<typeof UserDetails> = {
  title: "components/UserDetails",
  component: UserDetails,
};

export default meta;

type Story = StoryObj<typeof UserDetails>;

export const Default: Story = {
  args: {
    user: {
      id: 1,
      name: "山田 太郎",
      email: "test@example.com",
      role: "管理者",
      deleted: false,
    },
  },
};
