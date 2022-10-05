import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../components/dataTable";
import { openConfirmModal } from "@mantine/modals";
import React from "react";
import { IconEdit, IconTrash } from "@tabler/icons";
import { ActionButton } from "../../../components/actionButton";

type Karyawan = {
  no: number;
  userId: string;
  namaLengkap: string;
  alamat: string;
};

const data: Array<Karyawan> = [
  {
    no: 1,
    userId: "SEMDO001",
    namaLengkap: "Rio Tolinggi",
    alamat: "Manado",
  },
  {
    no: 2,
    userId: "SEMDO002",
    namaLengkap: "Regina Rumengan",
    alamat: "Manado",
  },
  {
    no: 3,
    userId: "SEMDO003",
    namaLengkap: "lovely Tolinggi",
    alamat: "Manado",
  },
  {
    no: 4,
    userId: "SEMDO004",
    namaLengkap: "Rama Tolinggi",
    alamat: "Manado",
  },
  {
    no: 5,
    userId: "SEMDO005",
    namaLengkap: "Kanzia Tolinggi",
    alamat: "Manado",
  },
];

export default function TableKaryawan() {
  const { classes } = useStyles();
  const columns = React.useMemo<ColumnDef<Karyawan, any>[]>(
    () => [
      {
        id: "no",
        header: "No.",
      },
      {
        id: "userId",
        header: "User ID",
        accessorKey: "userId",
      },
      {
        id: "namaLengkap",
        header: "Nama Lengkap",
        accessorKey: "namaLengkap",
        enableGlobalFilter: true,
        filterFn: "arrIncludesAll",
      },
      {
        id: "alamat",
        header: "Alamat",
        accessorKey: "alamat",
      },
      {
        id: "action",
        header: "Actions",
        cell: (props) => {
          const idSupplier = props.row
            .getAllCells()
            .map((item) => item.getValue());
          return <ActionButton data={idSupplier[1] as string} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Paper shadow="sm" radius="md" className={classes.container}>
        <DataTable data={data} columns={columns} visibility={{}} />
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
  },
  loaderHeight: {
    height: "500px",
  },
}));
