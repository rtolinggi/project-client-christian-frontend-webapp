import {
  Title,
  Paper,
  Divider,
  TextInput,
  Select,
  PasswordInput,
  Button,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  IconArrowBack,
  IconDeviceFloppy,
  IconLock,
  IconUser,
} from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { Form, useNavigate } from "react-router-dom";
import z from "zod";
import { SignUp } from "../../../utils/api";
import { ErrorMutation } from "../../../utils/types";

const schema = z.object({
  nama_pengguna: z
    .string()
    .min(1, { message: "Nama Pengguna TIdak Boleh Kosong" }),
  kata_sandi: z.string().min(6, { message: "Kata Sandi Minimal 6 Karakter" }),
  role: z.string({ required_error: "Role Tidak Boleh Kosong" }),
});

type InputForm = z.infer<typeof schema>;

export const PostUser: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      nama_pengguna: "",
      kata_sandi: "",
      role: "",
    },
  });

  const mutation = useMutation(SignUp, {
    onError: (error: ErrorMutation) => {
      if (error?.code === 409) {
        showNotification({
          title: "Gagal",
          message: "Nama Pengguna Sudah ada",
          color: "red",
        });
      }

      if (error?.code === 400) {
        showNotification({
          title: "Gagal",
          message: "Role Tidak Boleh Kosong",
          color: "red",
        });
      }
    },
    onSuccess: async () => {
      showNotification({
        title: "Berhasil",
        message: "User Berhasil di Buat",
      });
      navigate("/admin/user");
    },
  });

  const handleSubmit = (val: InputForm) => {
    mutation.mutate(val);
  };

  return (
    <Box style={{ position: "relative" }}>
      <LoadingOverlay visible={mutation.isLoading} />
      <Form onSubmit={form.onSubmit((val) => handleSubmit(val))}>
        <Paper shadow="md" radius="md" px="20px" py="20px">
          <Title order={4}>TAMBAH USER</Title>
          <Divider my="lg" />
          <TextInput
            withAsterisk
            label="Nama Pengguna"
            autoComplete="email"
            icon={<IconUser size={18} />}
            {...form.getInputProps("nama_pengguna")}
          />
          <PasswordInput
            withAsterisk
            label="Kata Sandi"
            autoComplete="current-password"
            icon={<IconLock size={18} />}
            mt="md"
            {...form.getInputProps("kata_sandi")}
          />
          <Select
            required
            description="Pilih role sesuai posisi Karyawan"
            label="Role"
            placeholder="Pilih Salah Satu"
            defaultValue={"SE"}
            data={[
              { value: "SE", label: "SE" },
              { value: "SPG", label: "SPG" },
              { value: "LEADER", label: "LEADER" },
            ]}
            mt="md"
            {...form.getInputProps("role")}
          />
        </Paper>
        <Paper shadow="md" radius="md" px="20px" py="20px" mt="lg">
          <Button type="submit" leftIcon={<IconDeviceFloppy size={16} />}>
            Simpan
          </Button>
          <Button
            ml="md"
            onClick={() => navigate("/admin/user")}
            leftIcon={<IconArrowBack size={16} />}>
            Batal
          </Button>
        </Paper>
      </Form>
    </Box>
  );
};
