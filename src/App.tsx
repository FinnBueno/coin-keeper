import { BrowserRouter, Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage";
import { AppLayout } from "./components/template/AppLayout";
import { DataClientProvider } from "./context/DatabaseContext";

function App() {
  return (
    <DataClientProvider>
      <AppLayout>
        <BrowserRouter>
          <Routes>
            <Route index element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </AppLayout>
    </DataClientProvider>
  );
}

export default App;
