import { Container, LoadingOverlay } from "@mantine/core";
import { Suspense } from "react";
import {
  type LoaderFunction,
  defer,
  useLoaderData,
  Await,
  Navigate,
} from "react-router-dom";
import { GetSession } from "../utils/api";

export default function IndexPage(): JSX.Element {
  const loaderData: any = useLoaderData();
  return (
    <Container>
      <Suspense fallback={<LoadingOverlay visible={loaderData} />}>
        <Await
          resolve={loaderData.session}
          errorElement={<p>Terjadi Ganguan di Server...</p>}>
          {(data) =>
            data ? <Navigate to={"/admin"} /> : <Navigate to={"/login"} />
          }
        </Await>
      </Suspense>
    </Container>
  );
}

export const loader: LoaderFunction = () => {
  return defer({ session: GetSession() });
};
