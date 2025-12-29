import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { RequireAuth } from "@app/guards/RequireAuth";
import AppLayout from "@layout/AppLayout";

import { Suspense, lazy } from "react";
import { Spin } from "antd";
import ErrorPage from "./ErrorPage";

const LoginPage = lazy(() => import("@features/auth/LoginPage"));
const PlanilhasListPage = lazy(
  () => import("@features/planilhas/pages/PlanilhasList")
);
const PlanilhasWorkspacePage = lazy(
  () => import("@features/planilhas/pages/PlanilhasWorkspace")
);
const InputExamples = lazy(() => import("@features/example/InputExamples"));

const PageLoader = () => (
  <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
    <Spin size="large" />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <h2>Home</h2> },
      {
        path: "example",
        element: (
          <Suspense fallback={<PageLoader />}>
            <InputExamples />
          </Suspense>
        ),
      },
      {
        path: "planilhas",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <PlanilhasListPage />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense>
                <PlanilhasWorkspacePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
