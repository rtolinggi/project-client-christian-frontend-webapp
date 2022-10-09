import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconEdit, IconEyeCheck, IconTrash } from "@tabler/icons";
import type { UseMutationResult } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  userId: string;
  userName: string;
  mutation: UseMutationResult;
};

export const ActionButton: React.FC<PropsWithChildren<Props>> = ({
  userId,
  userName,
  mutation,
}) => {
  const navigate = useNavigate();

  return (
    <Group spacing="xs">
      <ThemeIcon
        color="red"
        variant="light"
        style={{ cursor: "pointer", marginRight: "6px" }}>
        <UnstyledButton
          onClick={() =>
            openConfirmModal({
              title: "Hapus",
              centered: true,
              children: (
                <Text size="sm">
                  Apakah yakin akan menghapus Data dengan User {userName}?
                </Text>
              ),
              labels: {
                confirm: "Hapus",
                cancel: "Batal",
              },
              onCancel: () => console.log("Cancel"),
              onConfirm: () => mutation.mutate(userId),
            })
          }>
          <IconTrash size={20} stroke={1.5} />
        </UnstyledButton>
      </ThemeIcon>
      <ThemeIcon
        color="lime"
        variant="light"
        style={{ cursor: "pointer", marginRight: "6px" }}>
        <UnstyledButton
          onClick={() => navigate(`${userId}/update`)}
          type="submit"
          name="action"
          value="updateStore">
          <IconEdit size={20} stroke={1.5} />
        </UnstyledButton>
      </ThemeIcon>
      <ThemeIcon color="grape" variant="light" style={{ cursor: "pointer" }}>
        <UnstyledButton onClick={() => navigate(`${userId}/detail`)}>
          <IconEyeCheck size={20} stroke={1.5} />
        </UnstyledButton>
      </ThemeIcon>
    </Group>
  );
};
