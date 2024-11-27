import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Index";
import Layout from "../layout/Index";
import History from "../pages/History/Index";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/historico" element={<History />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
