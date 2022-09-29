import { Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";

type Props = {
  message: string;
};

const ErrorLogin: React.FC<Props> = ({ message }) => {
  return (
    <>
      <Notification
        disallowClose
        title="Otorisasi Gagal"
        icon={<IconX size={15} />}
        color="red"
        mb={10}>
        {message}
      </Notification>
    </>
  );
};

export default ErrorLogin;
