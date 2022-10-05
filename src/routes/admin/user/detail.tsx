import { Title, Paper, Divider, Group, Box } from "@mantine/core";
import { useParams } from "react-router-dom";
import { DataUsers } from "../../../utils/types";
import { queryClient } from "../../../App";
type ResponseUsers = {
  code: number;
  status: string;
  data: Array<DataUsers>;
  errors: {} | null;
};

export function DetailUser() {
  const { id } = useParams();
  const data = queryClient.getQueryState<ResponseUsers>(["GetUsers"]);
  const userData = data?.data?.data.filter(
    (item) => item.ID === parseInt(id as string)
  );
  return (
    <>
      <Paper
        shadow="md"
        radius="md"
        px="20px"
        py="20px"
        style={{ position: "relative" }}>
        <Title order={4}>INFORMASI USER</Title>
        <Divider my="lg" />
        <Box px="2rem">
          <Group position="apart">
            <Title order={5}>Nama Pengguna</Title>
            <Title order={5}>{userData ? userData[0].nama_pengguna : ""}</Title>
          </Group>
        </Box>
        <Divider my="md" />
        <Box px="2rem">
          <Group position="apart">
            <Title order={5}>Role</Title>
            <Title order={5}>{userData ? userData[0].role : ""}</Title>
          </Group>
        </Box>
        <Divider my="md" />
        <Box px="2rem">
          <Group position="apart">
            <Title order={5}>Kata Sandi</Title>
            <Title order={5}>{userData ? userData[0].kata_sandi : ""}</Title>
          </Group>
        </Box>
        <Divider my="md" />
        <Box px="2rem">
          <Group position="apart">
            <Title order={5}>Tanggal Buat</Title>
            <Title order={5}>
              {userData ? new Date(userData[0].CreatedAt).toLocaleString() : ""}
            </Title>
          </Group>
        </Box>
        <Divider my="md" />
      </Paper>
    </>
  );
}
