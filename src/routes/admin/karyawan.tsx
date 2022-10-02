import { Outlet } from "react-router-dom";
import { Title } from "@mantine/core";

export default function PageKaryawan() {
  return (
    <>
      <Title>HALAMAN KARYAWAN</Title>
      <Outlet />
    </>
  );
}
