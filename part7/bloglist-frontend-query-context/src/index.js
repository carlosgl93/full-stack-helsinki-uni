import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UiProvider } from "./state/ui/UiProvider";
import AuthProvider from "./state/auth/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UiProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </UiProvider>
  </QueryClientProvider>,
);
