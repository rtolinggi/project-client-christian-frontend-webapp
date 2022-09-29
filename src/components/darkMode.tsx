import {
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import type { ActionIconVariant } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

type Props = {
  variant?: ActionIconVariant;
  size?: number;
};
const DarkMode: React.FC<Props> = ({ variant, size }) => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant={variant}
      color={theme.primaryColor}
      onClick={() => toggleColorScheme()}
      title="Dark Mode">
      {dark ? (
        <IconSun size={size || 24} />
      ) : (
        <IconMoonStars size={size || 21} />
      )}
    </ActionIcon>
  );
};

export default DarkMode;
