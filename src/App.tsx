import { BrowserRouter, Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage";
import { AppLayout } from "./components/template/AppLayout";

function App() {
  return (
    <AppLayout>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </AppLayout>
  );
}

export default App;
