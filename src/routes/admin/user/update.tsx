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
import { IconArrowBack, IconDeviceFloppy, IconUser } from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import z from 'zod';
import { queryClient } from '../../../App';
import { UpdateUserId } from '../../../utils/api';
import { DataUsers, ErrorMutation } from '../../../utils/types';

const ROLE = ['PROFCOLL', 'CLIENT', 'ADMIN'] as const;
const schema = z.object({
  id: z.string().uuid().optional(),
  role: z.enum(ROLE, {
    invalid_type_error: 'tipe data tidak valid',
  }),
  isActive: z.boolean({
    invalid_type_error: 'type data tidak valid',
  }),
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
  const data = queryClient.getQueryState<ResponseUsers>(['GetUsers']);

  useEffect(() => {
    if (!data) {
      return navigate('/admin/user');
    }
  }, []);

  const userData = data?.data?.data.filter(item => item.id === id);

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      id: userData && userData[0].id,
      email: userData ? userData[0].email : '',
      role: userData ? userData[0].role : '',
      isActive: userData && userData[0].isActive ? 'AKTIF' : 'TIDAK AKTIF',
    },
  });

  const mutation = useMutation(UpdateUserId, {
    onError: (error: ErrorMutation) => {
      if (error?.code === 409) {
        showNotification({
          title: 'Gagal',
          message: 'Nama Pengguna Sudah ada',
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
        message: 'User Berhasil di Ubah',
      });
      navigate('/admin/user');
    },
  });

  const handleSubmit = (val: InputForm) => {
    const data = {
      id: val.id,
      role: val.role,
      isActive: val.isActive,
    };
    mutation.mutate(data);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <LoadingOverlay visible={mutation.isLoading} />
      <Form onSubmit={form.onSubmit((val: any) => handleSubmit(val))}>
        <Paper shadow='md' radius='md' px='20px' py='20px'>
          <Title order={4}>EDIT USER</Title>
          <Divider my='lg' />
          <TextInput
            withAsterisk
            label='Email'
            disabled
            icon={<IconUser size={18} />}
            {...form.getInputProps('email')}
          />
          <Select
            required
            description='Pilih role sesuai user'
            label='Role'
            placeholder='Pilih Salah Satu'
            defaultValue={userData ? userData[0].role : ''}
            data={[
              { value: 'PROFCOLL', label: 'PROFCOLL' },
              { value: 'CLIENT', label: 'CLIENT' },
              { value: 'ADMIN', label: 'ADMIN' },
            ]}
            mt='md'
            {...form.getInputProps('role')}
          />
          <Select
            required
            description='Pilih status keanggotan aktif atau tidak'
            label='Keanggotaan'
            placeholder='Pilih Salah Satu'
            defaultValue={userData ? 'AKTIF' : 'TIDAK AKTIF'}
            data={[
              { value: true, label: 'AKTIF' },
              { value: false, label: 'TIDAK AKTIF' },
            ]}
            mt='md'
            {...form.getInputProps('isActive')}
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
