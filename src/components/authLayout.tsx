import { Box, Center, createStyles } from "@mantine/core";
import { Outlet } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background:
      theme.colorScheme === "dark"
        ? "rgba(0,0,0,0.9)"
        : "rgba(255,255,255,0.05)",
  },
  circle: {
    position: "absolute",
    width: "180px",
    height: "180px",
    borderRadius: "100%",
  },
  positionCircleTop: {
    top: "calc(20% - 90px)",
    left: "calc(45% - 180px)",
  },
  positionCircleBottom: {
    bottom: "calc(20% - 90px)",
    right: "calc(45% - 180px)",
  },
  gardient1: {
    background:
      "linear-gradient(90deg, rgba(148,153,233,1) 0%, rgba(212,148,233,1) 100%)",
  },
  gardient2: {
    background:
      "linear-gradient(90deg, rgba(111,113,214,1) 0%, rgba(231,133,171,1) 100%)",
  },
}));

const AuthLayout: React.FC = () => {
  const { classes, cx } = useStyles();
  return (
    <Box className={classes.root}>
      <Box
        className={cx(
          classes.circle,
          classes.positionCircleTop,
          classes.gardient1
        )}
      />
      <Box
        className={cx(
          classes.circle,
          classes.positionCircleBottom,
          classes.gardient2
        )}
      />
      <Center style={{ minHeight: "100vh", width: "100%" }}>
        <main>
          <Outlet />
        </main>
      </Center>
    </Box>
  );
};

export default AuthLayout;
