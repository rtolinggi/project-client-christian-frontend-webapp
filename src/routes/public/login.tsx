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
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconLock, IconUser } from '@tabler/icons';
import { Form, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { SignIn } from '../../utils/api';
import { showNotification } from '@mantine/notifications';
import { useAuth } from '../../context/authContext';
import { useEffect } from 'react';

const schema = z.object({
  email: z
    .string({ required_error: 'email harus disi' })
    .email({ message: 'email tidak valid' }),
  passwordHash: z.string().min(1, { message: 'Kata Sandi Tidak Boleh Kosong' }),
});

type InputForm = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { signIn, isAuth, signOut } = useAuth();
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      passwordHash: '',
    },
  });

  const handleSubmit = (val: InputForm) => {
    mutation.mutate(val);
  };

  const mutation = useMutation(SignIn, {
    onError: (error: any) => {
      signOut();
      showNotification({
        title: 'Otentikasi Gagal',
        message: 'Nama Pengguna atau Kata Sandi Tidak Cocok',
        color: 'red',
      });
    },
    onSuccess: async data => {
      signIn(data?.data.access_token);
      showNotification({
        title: 'Otentikasi Berhasil',
        message: `Selamat datang`,
      });
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/admin/beranda');
    }
  }, [isAuth]);

  return (
    <>
      <Paper
        withBorder
        shadow='md'
        p={30}
        radius='md'
        sx={theme => ({
          background:
            theme.colorScheme === 'dark'
              ? 'rgba(0,0,0,0.6)'
              : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(5px)',
          minWidth: '320px',
          margin: 'auto',
        })}>
        <LoadingOverlay visible={mutation.isLoading} />
        <Center>
          <Image src={Logo} alt='logo' width={80} />
        </Center>
        <Center>
          <Title align='left' order={3}>
            Login
          </Title>
        </Center>
        <Space h='md' />
        <Divider my='xs' label={'Selamat Datang'} labelPosition='center' />
        <Form onSubmit={form.onSubmit(val => handleSubmit(val))}>
          <TextInput
            withAsterisk
            label='Nama Pengguna'
            autoComplete='email'
            icon={<IconUser size={18} />}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            label='Kata Sandi'
            autoComplete='current-password'
            icon={<IconLock size={18} />}
            mt='md'
            {...form.getInputProps('passwordHash')}
          />
          <Button fullWidth mt='xl' type='submit'>
            login
          </Button>
        </Form>
        <Space h='md' />
        <Divider my='xs' labelPosition='center' />
      </Paper>
    </>
  );
}
