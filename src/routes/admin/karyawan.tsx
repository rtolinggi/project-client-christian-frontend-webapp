import { Outlet } from "react-router-dom";
import { Title } from "@mantine/core";

export default function Karyawan() {
  return (
    <>
      <Title>HALAMAN KARYAWAN</Title>
      <Outlet />
    </>
  );
}
