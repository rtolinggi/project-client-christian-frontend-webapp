import { Group, Image, Code, Title, useMantineTheme } from "@mantine/core";
import Logo from "../../assets/logo.svg";

export const NavHeader: React.FC = () => {
  const theme = useMantineTheme();
  return (
    <Group position="apart" p="20px">
      <Group>
        <Image src={Logo} width={30} alt="logo" />
        <Title order={5}>SalesSystem</Title>
      </Group>
      <Code color={theme.primaryColor} sx={{ fontWeight: 700 }}>
        v1.2
      </Code>
    </Group>
  );
};
