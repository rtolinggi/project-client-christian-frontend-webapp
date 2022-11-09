import { Paper, Title, createStyles } from "@mantine/core";

export default function NewKaryawan() {
  const { classes } = useStyles();
  return (
    <>
      <Paper className={classes.container}>
        <Title order={1}>Halaman Tambah Karyawan</Title>
      </Paper>
    </>
  );
}

const useStyles = createStyles({
  container: {
    padding: "20px 40px",
    width: "100%",
  },
});
