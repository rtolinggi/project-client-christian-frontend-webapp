import { useRouteError } from "react-router-dom";

type ErrorPage = {
  statusText: string;
  message: string;
};

export default function ErrorNotFound() {
  const error = useRouteError() as ErrorPage;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
