import { Box, createStyles, Burger, Group, Menu, Paper } from "@mantine/core";
import React, { useState } from "react";
import DarkMode from "../darkMode";
import UserButton from "../userButton";
import avatar from "../../assets/avatar.jpg";
import { IconLogout, IconMessageCircle, IconSettings } from "@tabler/icons";
import { axios } from "../../utils/axios";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 20px",
    boxShadow: theme.shadows.sm,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderRadius: theme.radius.md,
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 50,
  },
  wShowNav: {
    width: "calc(100% - 40px)",
  },
  wHideNav: {
    width: "calc(100% - 310px)",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
}));

type Props = {
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ setShowNavbar }) => {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Paper
      className={cx(
        classes.container,
        opened ? classes.wShowNav : classes.wHideNav
      )}>
      <Burger
        opened={opened}
        onClick={() =>
          setShowNavbar((a) => {
            setOpened((o) => !o);
            return !a;
          })
        }
        size="sm"
      />
      <Box className={classes.wrapper}>
        <Group position="center">
          <Menu withArrow width={200}>
            <Menu.Target>
              <UserButton image={avatar} email={"rtolinggi@gmail.com"} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
              <Menu.Item icon={<IconMessageCircle size={14} />}>
                Messages
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={async () => {
                  await axios.get("/auth/signout");
                  navigate("/login");
                }}
                color="grape"
                icon={<IconLogout size={14} />}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <DarkMode />
      </Box>
    </Paper>
  );
};
