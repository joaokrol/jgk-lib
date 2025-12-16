import { useRouteError } from "react-router-dom";
import { Button, Result } from "antd";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  console.error(error);

  return (
    <Result
      status="500"
      title="Algo correu mal."
      subTitle={error.statusText || error.message}
      extra={<Button type="primary" href="/">Voltar ao Início</Button>}
    />
  );
}