import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconEdit, IconEyeCheck, IconTrash } from "@tabler/icons";
import { PropsWithChildren } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

type Props = {
  data: string;
};

export const ActionButton: React.FC<PropsWithChildren<Props>> = ({ data }) => {
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
                  Apakah yakin akan menghapus Data dengan ID {data}?
                </Text>
              ),
              labels: {
                confirm: "Hapus",
                cancel: "Batal",
              },
              onCancel: () => console.log("Cancel"),
            })
          }>
          <IconTrash size={20} stroke={1.5} />
        </UnstyledButton>
      </ThemeIcon>
      <ThemeIcon
        color="lime"
        variant="light"
        style={{ cursor: "pointer", marginRight: "6px" }}>
        <UnstyledButton type="submit" name="action" value="updateStore">
          <IconEdit size={20} stroke={1.5} />
        </UnstyledButton>
      </ThemeIcon>
      <ThemeIcon color="grape" variant="light" style={{ cursor: "pointer" }}>
        <UnstyledButton onClick={() => navigate(`${data}/detail`)}>
          <IconEyeCheck size={20} stroke={1.5} />
        </UnstyledButton>
      </ThemeIcon>
    </Group>
  );
};
