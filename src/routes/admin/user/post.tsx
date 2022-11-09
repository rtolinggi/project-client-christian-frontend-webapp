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
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  IconArrowBack,
  IconDeviceFloppy,
  IconLock,
  IconUser,
} from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import { Form, useNavigate } from 'react-router-dom';
import z from 'zod';
import { SignUp } from '../../../utils/api';
import { ErrorMutation } from '../../../utils/types';

const ROLE = ['PROFCOLL', 'CLIENT', 'ADMIN'] as const;
const schema = z
  .object({
    email: z
      .string({ required_error: 'email harus di isi' })
      .email({ message: 'email tidak valid' }),
    role: z.enum(ROLE, {
      invalid_type_error: 'tipe data tidak valid',
    }),
    passwordHash: z
      .string()
      .min(6, { message: 'Kata Sandi Minimal 6 Karakter' }),
    confirmPassword: z.string().optional(),
  })
  .refine(data => data.passwordHash === data.confirmPassword, {
    message: 'Kati Sandi dan Konfirmasi Sandi Tidak Cocok',
    path: ['konfirmasi_sandi'],
  });

type InputForm = z.infer<typeof schema>;

export const PostUser: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      passwordHash: '',
      confirmPassword: '',
      role: '',
    },
  });

  const mutation = useMutation(SignUp, {
    onError: (error: ErrorMutation) => {
      if (error?.code === 409) {
        showNotification({
          title: 'Gagal',
          message: 'Email Sudah ada',
          color: 'red',
        });
      }

      if (error?.code === 400) {
        showNotification({
          title: 'Gagal',
          message: 'Role Tidak Boleh Kosong',
          color: 'red',
        });
      }
    },
    onSuccess: async () => {
      showNotification({
        title: 'Berhasil',
        message: 'User Berhasil di Buat',
      });
      navigate('/admin/user');
    },
  });

  const handleSubmit = (val: InputForm) => {
    mutation.mutate(val);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <LoadingOverlay visible={mutation.isLoading} />
      <Form onSubmit={form.onSubmit((val: any) => handleSubmit(val))}>
        <Paper shadow='md' radius='md' px='20px' py='20px'>
          <Title order={4}>TAMBAH USER</Title>
          <Divider my='lg' />
          <TextInput
            withAsterisk
            label='Email'
            autoComplete='email'
            icon={<IconUser size={18} />}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            label='Kata Sandi'
            icon={<IconLock size={18} />}
            mt='md'
            {...form.getInputProps('passwordHash')}
          />
          <PasswordInput
            withAsterisk
            label='Konfirmasi Sandi'
            icon={<IconLock size={18} />}
            mt='md'
            {...form.getInputProps('confirmPassword')}
          />
          <Select
            required
            description='Pilih role sesuai posisi user'
            label='Role'
            placeholder='Pilih Salah Satu'
            defaultValue={'PROFCOLL'}
            data={[
              { value: 'PROFCOLL', label: 'PROFCOLL' },
              { value: 'CLIENT', label: 'CLIENT' },
              { value: 'ADMIN', label: 'ADMIN' },
            ]}
            mt='md'
            {...form.getInputProps('role')}
          />
        </Paper>
        <Paper shadow='md' radius='md' px='20px' py='20px' mt='lg'>
          <Button type='submit' leftIcon={<IconDeviceFloppy size={16} />}>
            Simpan
          </Button>
          <Button
            ml='md'
            onClick={() => navigate('/admin/user')}
            leftIcon={<IconArrowBack size={16} />}>
            Batal
          </Button>
        </Paper>
      </Form>
    </Box>
  );
};
