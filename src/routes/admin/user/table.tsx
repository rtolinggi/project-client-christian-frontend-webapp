import { LoadingOverlay, Paper, createStyles } from '@mantine/core';
import type { ColumnDef } from '@tanstack/react-table';
import DataTable from '../../../components/dataTable';
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DeleteUserId, GetUsers } from '../../../utils/api';
import { type DataUsers } from '../../../utils/types';
import { ActionButton } from '../../../components/actionButton';
import { queryClient } from '../../../App';

type ResponseUsers = {
  code: number;
  data: Array<DataUsers>;
  errors: {} | null;
  status: string;
};

const dummyData = [
  {
    email: '',
    role: '',
    isActive: false,
    isVerified: false,
    CreatedAt: null,
  },
];

export function TableUser() {
  const { classes } = useStyles();
  const { data: users, isLoading } = useQuery<ResponseUsers>(
    {
      queryKey: ['GetUsers'],
      queryFn: GetUsers,
      // refetchInterval: 5000,
    },
    // ['GetUsers'],
    // GetUsers,
  );
  const mutation = useMutation((val: any) => DeleteUserId(val), {
    onSuccess: () => {
      queryClient.invalidateQueries(['GetUsers']);
    },
  });

  const dataTable = users
    ? users.data.map(item => {
        let data = {
          id: String(item.id),
          email: String(item.email),
          role: String(item.role),
          isActive: item.isActive ? 'AKTIF' : 'TIDAK AKTIF',
          CreatedAt: String(item.createdAt),
        };
        return data;
      })
    : dummyData;

  const columns = React.useMemo<ColumnDef<typeof dataTable, any>[]>(
    () => [
      {
        id: 'no',
        header: 'No.',
        cell: props => parseInt(props.row.id) + 1,
      },
      {
        id: 'id',
        accessorKey: 'id',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Role',
        accessorKey: 'role',
        sortDescFirst: true,
      },
      {
        header: 'Status',
        accessorKey: 'isActive',
        sortDescFirst: true,
      },
      {
        id: 'action',
        header: 'Aksi',
        cell: props => {
          const row = props.row.getAllCells().map(item => item.getValue());
          return (
            <ActionButton
              userId={row[1] as string}
              userName={row[2] as string}
              mutation={mutation}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Paper shadow='sm' radius='md' className={classes.container}>
        <LoadingOverlay visible={isLoading || mutation.isLoading} />
        <DataTable
          data={dataTable}
          columns={columns}
          visibility={{ id: false }}
        />
      </Paper>
    </>
  );
}

const useStyles = createStyles(theme => ({
  container: {
    width: '100%',
    padding: '20px',
    overflow: 'auto',
    marginTop: '1.2rem',
    position: 'relative',
  },
  loaderHeight: {
    height: '500px',
  },
}));
