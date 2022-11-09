import { Outlet } from "react-router-dom";
import { Title, createStyles, Paper } from "@mantine/core";

export default function PageKaryawan() {
  const { classes } = useStyles();
  return (
    <>
      <Paper radius="md" shadow="md" className={classes.container}>
        <Title order={3}>HALAMAN KARYAWAN</Title>
      </Paper>
      <Outlet />
    </>
  );
}

const useStyles = createStyles({
  container: {
    width: "100%",
    padding: "20px 40px",
  },
});
