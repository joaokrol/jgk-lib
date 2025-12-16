import "./App.css";
import { AuthProvider } from "./providers/AuthProvider";
import AppRouter from "./routes/router";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
