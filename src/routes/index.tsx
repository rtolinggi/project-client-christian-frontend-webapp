import { Container, Title } from "@mantine/core";
import { axios } from "../utils/axios";
import { type LoaderFunction, redirect } from "react-router-dom";
import { User } from "../utils/types";

interface Response {
  success: boolean;
  data: Array<User>;
}

export default function IndexPage(): JSX.Element {
  return (
    <Container>
      <h1>TESTING</h1>
    </Container>
  );
}

export const loader: LoaderFunction = async () => {
  try {
    const response = await axios.get("/user");
    if (response.status === 401) {
      return redirect("/login");
    }
    return redirect("/admin");
  } catch (error) {
    console.log(error);
    return redirect("/login");
  }
};
