import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequireAuth } from "@app/guards/RequireAuth";
import LoginPage from "@features/auth/LoginPage";
import AppLayout from "@layout/AppLayout";
import PlanilhasPage from "@features/planilhas/PlanilhasPage";
import InputExamples from "@features/example/InputExamples";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <h2>Home</h2> },
      { path: "example", element: <InputExamples /> },
      { path: "planilhas", element: <PlanilhasPage /> },
      { path: "*", element: <h2>Página não encontrada.</h2> },
      // { path: "planilhas/:id", element: <PlanilhasPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
