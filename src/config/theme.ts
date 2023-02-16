import { makeTheme } from "dripsy";

export const theme = makeTheme({
  colors: {
    $primary: "#622490",
    $background: "#F0EDF5",
    $income: "#1BA803",
    $expense: "#E28856",
    $destructive: "#FF6680",
    $white: "#fff",
    $text: "#6A6A6A",
    $highlight: "#3D3D4C",
    $muted: "#A0A0B2",
    $placeholder: "#C4C4D1",
  },
  fontSizes: {
    $xl: 22,
    $lg: 20,
    $md: 15,
    $sm: 12,
  },
  radii: {
    $full: 9999,
    $xl: 24,
    $lg: 16,
    $sm: 10,
  },
  space: {
    $xl: 36,
    $lg: 26,
    $md: 18,
    $sm: 12,
    $xs: 8,
  },
});

type AppTheme = typeof theme;

declare module "dripsy" {
  export interface DripsyTheme extends AppTheme {}
}