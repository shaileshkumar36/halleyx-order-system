import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./components/Dashboard";
import DashboardConfig from "./pages/DashboardConfig";

function App() {

  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem("dashboardWidgets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (type) => {
    const newWidget = { type, size: "medium" };
    setWidgets([...widgets, newWidget]);
  };

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={<Dashboard widgets={widgets} setWidgets={setWidgets} />}
        />

        <Route
          path="/dashboard/configure"
          element={<DashboardConfig addWidget={addWidget} />}
        />

      </Routes>
    </Router>
  );
}

export default App;