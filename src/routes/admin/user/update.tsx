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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { queryClient } from "../../../App";
import { GetUsersId, SignUp } from "../../../utils/api";
import { DataUsers, ErrorMutation } from "../../../utils/types";

const schema = z
  .object({
    nama_pengguna: z
      .string()
      .min(1, { message: "Nama Pengguna TIdak Boleh Kosong" }),
    role: z.string({ required_error: "Role Tidak Boleh Kosong" }),
    kata_sandi: z.string().min(6, { message: "Kata Sandi Minimal 6 Karakter" }),
    konfirmasi_sandi: z.string().optional(),
  })
  .refine((data) => data.kata_sandi === data.konfirmasi_sandi, {
    message: "Kati Sandi dan Konfirmasi Sandi Tidak Cocok",
    path: ["konfirmasi_sandi"],
  });

type InputForm = z.infer<typeof schema>;

type ResponseUsers = {
  code: number;
  status: string;
  data: Array<DataUsers>;
  errors: {} | null;
};

export const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = queryClient.getQueryState<ResponseUsers>(["GetUsers"]);
  const userData = data?.data?.data.filter(
    (item) => item.ID === parseInt(id as string)
  );

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      nama_pengguna: userData ? userData[0].nama_pengguna : "",
      kata_sandi: userData ? userData[0].kata_sandi : "",
      konfirmasi_sandi: userData ? userData[0].kata_sandi : "",
      role: userData ? userData[0].role : "",
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
    delete val.konfirmasi_sandi;
    mutation.mutate(val);
  };

  return (
    <Box style={{ position: "relative" }}>
      <Form onSubmit={form.onSubmit((val) => handleSubmit(val))}>
        <Paper shadow="md" radius="md" px="20px" py="20px">
          <Title order={4}>EDIT USER</Title>
          <Divider my="lg" />
          <TextInput
            withAsterisk
            label="Nama Pengguna"
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
          <PasswordInput
            withAsterisk
            label="Konfirmasi Sandi"
            autoComplete="current-password"
            icon={<IconLock size={18} />}
            mt="md"
            {...form.getInputProps("konfirmasi_sandi")}
          />
          <Select
            required
            description="Pilih role sesuai posisi Karyawan"
            label="Role"
            placeholder="Pilih Salah Satu"
            defaultValue={userData ? userData[0].role : ""}
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
