import { Title, Paper, Divider, Group, Box } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { DataUsers } from '../../../utils/types';
import { queryClient } from '../../../App';
import { useEffect } from 'react';
type ResponseUsers = {
  code: number;
  status: string;
  data: Array<DataUsers>;
  errors: {} | null;
};

export function DetailUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = queryClient.getQueryState<ResponseUsers>(['GetUsers']);

  useEffect(() => {
    if (!data) {
      return navigate('/admin/user');
    }
  }, []);

  const userData = data?.data?.data.filter(item => item.id === id);

  return (
    <>
      <Paper
        shadow='md'
        radius='md'
        px='20px'
        py='20px'
        style={{ position: 'relative' }}>
        <Title order={4}>INFORMASI USER</Title>
        <Divider my='lg' />
        <Box px='2rem'>
          <Group position='apart'>
            <Title order={5}>Email</Title>
            <Title order={5}>{userData ? userData[0].email : ''}</Title>
          </Group>
        </Box>
        <Divider my='md' />
        <Box px='2rem'>
          <Group position='apart'>
            <Title order={5}>Role</Title>
            <Title order={5}>{userData ? userData[0].role : ''}</Title>
          </Group>
        </Box>
        <Divider my='md' />
        <Box px='2rem'>
          <Group position='apart'>
            <Title order={5}>Status Verifikasi Email</Title>
            <Title order={5}>
              {userData && userData[0].isVerified
                ? 'Sudah di verifikasi'
                : 'Belum di verifikasi'}
            </Title>
          </Group>
        </Box>
        <Divider my='md' />
        <Box px='2rem'>
          <Group position='apart'>
            <Title order={5}>Status Keanggotaan</Title>
            <Title order={5}>
              {userData && userData[0].isActive ? 'Aktif' : 'Tidak Aktif'}
            </Title>
          </Group>
        </Box>
        <Divider my='md' />
        <Box px='2rem'>
          <Group position='apart'>
            <Title order={5}>Tanggal Buat</Title>
            <Title order={5}>
              {userData ? new Date(userData[0].createdAt).toLocaleString() : ''}
            </Title>
          </Group>
        </Box>
        <Divider my='md' />
      </Paper>
    </>
  );
}
