import { LoadingOverlay, Paper, createStyles } from "@mantine/core";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../components/dataTable";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetUsers } from "../../../utils/api";
import { type DataUsers } from "../../../utils/types";
import { ActionButton } from "../../../components/actionButton";

type ResponseUsers = {
  code: number;
  data: Array<DataUsers>;
  errors: {} | null;
  status: string;
};

const dummyData = [
  {
    nama_pengguna: "",
    role: "",
    CreatedAt: null,
  },
];

export function TableUser() {
  const { classes } = useStyles();
  const { data: users, isLoading } = useQuery<ResponseUsers>(
    ["GetUsers"],
    GetUsers
  );

  const dataTable = users
    ? users.data.map((item) => {
        let data = {
          id: item.ID,
          nama_pengguna: item.nama_pengguna,
          role: item.role,
          CreatedAt: item.CreatedAt,
        };
        return data;
      })
    : dummyData;

  const columns = React.useMemo<ColumnDef<typeof dataTable, any>[]>(
    () => [
      {
        id: "no",
        header: "No.",
        cell: (props) => parseInt(props.row.id) + 1,
      },
      {
        id: "id",
        accessorKey: "id",
      },
      {
        header: "Nama Pengguna",
        accessorKey: "nama_pengguna",
      },
      {
        header: "Role",
        accessorKey: "role",
        sortDescFirst: true,
      },
      {
        id: "action",
        header: "Aksi",
        cell: (props) => {
          const row = props.row.getAllCells().map((item) => item.getValue());
          return <ActionButton data={row[1] as string} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Paper shadow="sm" radius="md" className={classes.container}>
        <LoadingOverlay visible={isLoading} />
        <DataTable
          data={dataTable}
          columns={columns}
          visibility={{ id: false }}
        />
      </Paper>
    </>
  );
}

const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    padding: "20px",
    overflow: "auto",
    marginTop: "1.2rem",
    position: "relative",
  },
  loaderHeight: {
    height: "500px",
  },
}));
