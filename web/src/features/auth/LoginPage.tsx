import { loginWithEmail, mapFirebaseError } from "@services/auth";
import { Flex, theme, Typography } from "antd";
import { CSSProperties, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import z from "zod";
import s from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@components/layout";
import { Button } from "@components/primary";
import { Form } from "@components/form";
import { TextField } from "@components/inputs";
import { Alert } from "@components/feedback";
import type { Resolver } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { getValidation } from "@utils/inputValidations";
const { Title, Text } = Typography;

const schema = z.object({
  email: getValidation("email"),
  password: getValidation("password").transform((val) => val || ""),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();
  const resolver = zodResolver(schema) as Resolver<LoginForm>;

  const methods = useForm<LoginForm>({
    resolver: resolver,
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const { formState } = methods;

  const redirectTo = location?.state?.from?.pathname ?? "/";

  const onLogin = async (data: LoginForm) => {
    setError(null);
    try {
      await loginWithEmail(
        (data.email as string) || "",
        data.password as string
      );
      navigate(redirectTo, { replace: true });
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        setError(mapFirebaseError(e?.code));
      } else {
        console.error("Erro desconhecido", e);
      }
    }
  };

  return (
    <div
      className={s.wrapper}
      style={
        {
          "--pad": `${token.paddingLG}px`,
          "--bg": token.colorBgLayout,
          "--radius": `${token.borderRadiusLG}px`,
        } as CSSProperties
      }
    >
      <Card style={{ minWidth: 350 }}>
        <Flex vertical align="center" style={{ marginBottom: "1rem" }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Nome do App
          </Title>
          <Text>Acesse com seu e-mail e senha</Text>
        </Flex>

        <Form methods={methods} onSubmit={onLogin} showErrorSummary={false}>
          {error && (
            <Alert
              type="error"
              description={error}
              style={{ padding: "10px", marginBottom: "10px" }}
            />
          )}
          <TextField name="email" label="Email" />
          <TextField name="password" label="Senha" type="password" />
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Form>
        <Flex justify="end">
          <Button
            type="link"
            size="small"
            style={{ padding: 0, height: "auto", marginBottom: 16 }}
            onClick={() => navigate("/esqueceu-senha")}
          >
            Esqueceu a senha?
          </Button>
        </Flex>
      </Card>
    </div>
  );
}
