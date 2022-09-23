import {
  Button,
  Center,
  Divider,
  Image,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconLock, IconUser } from "@tabler/icons";
import {
  Form,
  LoaderFunction,
  redirect,
  useNavigation,
  useSubmit,
  type ActionFunction,
} from "react-router-dom";
import Logo from "../../assets/logo.svg";
import z from "zod";
import { SignIn } from "../../utils/api";
import { axios } from "../../utils/axios";

export const loader: LoaderFunction = async () => {
  try {
    const response = await axios.get("/user");
    if (response.status !== 401) {
      return redirect("/admin");
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const FormInput = {
    nama_pengguna: formData.get("nama_pengguna") as string,
    kata_sandi: formData.get("kata_sandi") as string,
  };
  try {
    const response = await SignIn(FormInput);
    if (response.status === 401) {
      return response.data;
    }
  } catch (error) {
    return null;
  }

  return redirect("/admin");
};

const schema = z.object({
  nama_pengguna: z
    .string()
    .min(1, { message: "Nama Pengguna TIdak Boleh Kosong" }),
  kata_sandi: z.string().min(1, { message: "Kata Sandi Tidak Boleh Kosong" }),
});

export default function Login() {
  const submit = useSubmit();
  const navigation = useNavigation();

  const isLoading = navigation.state === "submitting";

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      nama_pengguna: "",
      kata_sandi: "",
    },
  });

  return (
    <Paper
      withBorder
      shadow="md"
      p={30}
      radius="md"
      sx={(theme) => ({
        background:
          theme.colorScheme === "dark"
            ? "rgba(0,0,0,0.6)"
            : "rgba(255,255,255,0.1)",
        backdropFilter: "blur(5px)",
        minWidth: "320px",
        margin: "auto",
      })}>
      <LoadingOverlay visible={isLoading} />
      <Center>
        <Image src={Logo} alt="logo" width={80} />
      </Center>
      <Center>
        <Title align="left" order={3}>
          Login
        </Title>
      </Center>
      <Space h="md" />
      <Divider my="xs" label={"Selamat Datang"} labelPosition="center" />
      <Form
        onSubmit={form.onSubmit((val) =>
          submit(val, { method: "post", action: "/login?index" })
        )}>
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
        <Button fullWidth mt="xl" type="submit">
          login
        </Button>
      </Form>
      <Space h="md" />
      <Divider my="xs" labelPosition="center" />
    </Paper>
  );
}
