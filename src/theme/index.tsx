import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import type { MantineThemeOverride } from "@mantine/core";
import { type PropsWithChildren, useState } from "react";
import type { ColorScheme } from "@mantine/core";

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const myTheme: MantineThemeOverride = {
    colorScheme: colorScheme,
    primaryColor: "grape",
    primaryShade: { dark: 8, light: 7 },
    loader: "bars",
    focusRing: "never",
    components: {
      Breadcrumbs: {
        styles: (theme) => ({
          root: {
            fontWeight: 500,
            marginTop: 20,
            marginBottom: "20px",
            fontSize: theme.fontSizes.sm,
          },
          breadcrumb: {
            color: colorScheme === "dark" ? theme.white : theme.primaryColor,
            textDecoration: "none",
            fontStyle: "italic",
            "&:hover": {
              color:
                colorScheme === "dark"
                  ? theme.colors.gray[0]
                  : theme.primaryColor,
            },
          },
        }),
      },
    },
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={myTheme}>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;
