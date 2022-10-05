import { Button, createStyles, Box, Breadcrumbs, Group } from "@mantine/core";
import {
  Outlet,
  useLocation,
  useMatch,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { CNavbar } from "../components/nav";
import { IconEdit, IconPlus } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    position: "relative",
  },
  leftColumn: {
    width: 250,
    boxShadow: theme.shadows.xl,
    borderRadius: theme.radius.md,
    margin: "20px 0px 20px 20px",
    height: "calc(100vh - 40px)",
  },
  rightColumn: {
    flexGrow: 1,
    paddingRight: "20px",
    paddingLeft: "20px",
    paddingBottom: "20px",
  },
  headertWrapper: {
    width: "100%",
    height: "75px",
  },
  contentWrapper: {},
  footerWrapper: {},
  loadingContet: {
    height: "80%",
    position: "relative",
    borderRadius: theme.radius.lg,
    padding: "1rem",
  },
}));

const LoaderData = {
  userData: {
    name: "SEMDO001",
    fullName: "Rio Tolinggi",
    role: "admin",
    token: "Token",
  },
};

export default function AdminLayout() {
  const { classes } = useStyles();
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const navigate = useNavigate();
  let location = useLocation().pathname;
  let matches = useMatches();
  const { id } = matches.map((item) => item.params)[0];
  const routeUrl = matches.map((item) => item.pathname.toString());
  const updateSomeUrl = `${routeUrl[1]}/${id}/update` === location;
  let crumbs = matches
    .filter((match: any) => Boolean(match.handle?.crumb))
    .map((match: any) => match.handle.crumb(match.data));
  const [hideButtonPost, setHideButtonPost] = useState<boolean>(false);

  useEffect(() => {
    const path = matches.map((e) => e.pathname).pop();
    if (path === location) {
      setHideButtonPost(true);
    } else {
      setHideButtonPost(false);
    }
  }, [navigate]);

  return (
    <Box className={classes.container}>
      <Box hidden={showNavbar} className={classes.leftColumn}>
        <CNavbar userData={LoaderData.userData} />
      </Box>
      <Box className={classes.rightColumn}>
        <Box className={classes.headertWrapper}>
          <Header setShowNavbar={setShowNavbar} />
        </Box>
        <Box mt="10px"></Box>
        <Box>
          <Group position="apart" px="md">
            <Breadcrumbs>{crumbs.map((crumb) => crumb)}</Breadcrumbs>
            {id ? (
              <Button
                hidden={updateSomeUrl}
                onClick={() => navigate(`${routeUrl[1]}/${id}/update`)}
                leftIcon={<IconEdit size={16} />}>
                Edit
              </Button>
            ) : (
              <Button
                hidden={hideButtonPost}
                onClick={() => navigate(`${location}/post`)}
                leftIcon={<IconPlus size={16} />}>
                Tambah
              </Button>
            )}
          </Group>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
