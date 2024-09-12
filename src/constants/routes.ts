import Home from "../pages/Home";

export interface RouteConfig {
  path: string;
  Component: React.ReactNode;
}

export const ROUTES = [
  {
    path: "/",
    Component: Home,
  },
];
