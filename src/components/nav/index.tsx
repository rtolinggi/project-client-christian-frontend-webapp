import {
  Navbar,
  createStyles,
  ScrollArea,
  Group,
  Divider,
} from "@mantine/core";
import { UserButton } from "./navFooter";
import image from "../../assets/avatar.jpg";
import { NavHeader } from "./navHeader";
import { NavContent } from "./navContent";

const useStyles = createStyles((theme) => ({
  body: {
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    boxShadow: theme.shadows.xl,
    borderRadius: theme.radius.md,
    height: "calc(100vh - 40px)",
    width: 250,
    position: "fixed",
    top: "20px",
    left: "20px",
    bottom: "20px",
  },
}));

interface Props {
  name: string;
  fullName: string;
  role: string;
  token: string;
}

export type UserData = { userData: Props };

export const CNavbar: React.FC<UserData> = ({ userData }) => {
  const { classes } = useStyles();
  return (
    <Navbar classNames={{ root: classes.body }}>
      <Navbar.Section>
        <NavHeader />
        <Divider />
      </Navbar.Section>

      <Navbar.Section grow mt="md" pl="20px" pr="20px" component={ScrollArea}>
        <NavContent />
      </Navbar.Section>

      <Navbar.Section>
        <Divider />
        <Group p="5px">
          <UserButton
            image={image}
            user={userData.role}
            name={userData.fullName}
          />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};
