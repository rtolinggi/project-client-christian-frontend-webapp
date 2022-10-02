/* eslint-disable jsx-a11y/anchor-has-content */
import {
  IconChevronRight,
  IconUserCheck,
  IconBuildingWarehouse,
  IconBrandAppgallery,
  IconLayoutDashboard,
  IconListDetails,
  IconReceipt,
  IconUserPlus,
} from "@tabler/icons";
import { Link, useLocation } from "react-router-dom";
import { Box, NavLink, ThemeIcon, useMantineTheme } from "@mantine/core";

const data = [
  {
    icon: IconLayoutDashboard,
    label: "Beranda",
    to: "beranda",
    pathName: "/beranda",
  },
  {
    icon: IconBuildingWarehouse,
    label: "Master Data",
    to: "setting",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    pathName: "/setting",
    subLink: [
      {
        label: "Store",
        to: "store",
        pathName: "/store",
      },
      {
        label: "Supplier",
        to: "supplier",
        pathName: "/supplier",
      },
      {
        label: "Cluster",
        to: "cluster",
        pathName: "/cluster",
      },
    ],
  },
  {
    icon: IconBrandAppgallery,
    label: "Products",
    to: "product",
    pathName: "/product",
  },
  {
    icon: IconReceipt,
    label: "Order",
    to: "order",
    pathName: "/order",
  },
  {
    icon: IconListDetails,
    label: "Task",
    to: "task",
    pathName: "/task",
  },
  {
    icon: IconUserCheck,
    label: "Karyawan",
    to: "karyawan",
    pathName: "/karyawan",
  },
  {
    icon: IconUserPlus,
    label: "user",
    to: "user",
    pathName: "/user",
  },
];

export const NavContent: React.FC = () => {
  const location = useLocation();
  const theme = useMantineTheme();
  const path = location.pathname.split("/");
  const pathSplit = "/" + path[2];
  const items = data.map((item, idx) => (
    <NavLink
      key={idx}
      variant="light"
      component={Link}
      to={item.to}
      active={pathSplit === item.pathName}
      label={item.label}
      rightSection={item.rightSection}
      icon={
        <ThemeIcon color={theme.primaryColor} variant="light">
          <item.icon size={16} stroke={1.5} />
        </ThemeIcon>
      }>
      {item.subLink
        ? item.subLink.map((subItem, idx) => (
            <NavLink
              key={idx}
              component={Link}
              to={subItem.to}
              active={location.pathname === subItem.pathName}
              label={subItem.label}
            />
          ))
        : null}
    </NavLink>
  ));

  return <Box sx={{ width: "100%" }}>{items}</Box>;
};
