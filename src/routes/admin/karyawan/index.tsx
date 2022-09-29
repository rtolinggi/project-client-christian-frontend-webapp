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

type Karyawan = {
  no: number;
  userId: string;
  namaLengkap: string;
  alamat: string;
};

type KaryawanProps = {
  data: Array<Karyawan>;
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

export default function KaryawanTable() {
  const { classes } = useStyles();
  console.log("Index Karywawan");
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
          return (
            <Group spacing="xs">
              <ThemeIcon
                color="red"
                variant="light"
                style={{ cursor: "pointer", marginRight: "10px" }}>
                <UnstyledButton
                  onClick={() =>
                    openConfirmModal({
                      title: "Delete Store",
                      centered: true,
                      children: (
                        <Text size="sm">
                          Are you sure you want to delete Store{" "}
                          {idSupplier[2] as string}?
                        </Text>
                      ),
                      labels: {
                        confirm: "Delete Store",
                        cancel: "No don't delete it",
                      },
                      onCancel: () => console.log("Cancel"),
                    })
                  }>
                  <IconTrash size={20} stroke={1.5} />
                </UnstyledButton>
              </ThemeIcon>
              <ThemeIcon
                color="lime"
                variant="light"
                style={{ cursor: "pointer" }}>
                <UnstyledButton type="submit" name="action" value="updateStore">
                  <IconEdit size={20} stroke={1.5} />
                </UnstyledButton>
              </ThemeIcon>
            </Group>
          );
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
