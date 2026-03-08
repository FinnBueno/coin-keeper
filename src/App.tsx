import { AppLayout } from "./components/template/AppLayout";
import { DataClientProvider } from "./context/DatabaseContext";
import { useAuth } from "./hooks/useAuth";
import { AuthPage } from "./pages/AuthPage";
import { LoadingPage } from "./pages/LoadingPage";
import { MainPage } from "./pages/MainPage";

function App() {
  const { userId, hasLoaded } = useAuth();
  if (!hasLoaded) return <LoadingPage />;
  if (!userId) return <AuthPage />;
  return (
    <DataClientProvider>
      <AppLayout>
        <MainPage />
      </AppLayout>
    </DataClientProvider>
  );
}

export default App;
