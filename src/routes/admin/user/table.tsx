import {
  LoadingOverlay,
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
import { useQuery } from "@tanstack/react-query";
import { GetUsers } from "../../../utils/api";

type Karyawan = {
  no: string;
  nama_pengguna: string;
  role: string;
};

const dataTable: Array<Karyawan> = [
  {
    no: "1",
    nama_pengguna: "SEMDO001",
    role: "Admin",
  },
  {
    no: "2",
    nama_pengguna: "SEMDO002",
    role: "SE",
  },
  {
    no: "3",
    nama_pengguna: "SEMDO003",
    role: "SPG",
  },
  {
    no: "4",
    nama_pengguna: "SEMDO004",
    role: "Rama Tolinggi",
  },
  {
    no: "5",
    nama_pengguna: "SEMDO005",
    role: "Kanzia Tolinggi",
  },
];

export function TableUser() {
  const { classes } = useStyles();
  const { isLoading } = useQuery(["GetUsers"], GetUsers);
  const columns = React.useMemo<ColumnDef<Karyawan, any>[]>(
    () => [
      {
        header: "No.",
        accessorKey: "no",
      },
      {
        header: "Nama Pengguna",
        accessorKey: "nama_pengguna",
      },
      {
        header: "Role",
        accessorKey: "role",
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
        <LoadingOverlay visible={isLoading} />
        <DataTable data={dataTable} columns={columns} visibility={{}} />
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
