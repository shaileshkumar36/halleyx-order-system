import { useNavigate } from "react-router-dom";

function DashboardConfig({ addWidget }) {

  const navigate = useNavigate();

  const handleAdd = (type) => {
    addWidget(type);
    navigate("/");
  };

  return (
    <div className="container mt-4">

      <h2>Configure Dashboard</h2>

      <div className="d-flex gap-2 mt-3">

        <button className="btn btn-primary" onClick={() => handleAdd("kpi")}>
          Add KPI
        </button>

        <button className="btn btn-primary" onClick={() => handleAdd("bar")}>
          Add Bar Chart
        </button>

        <button className="btn btn-primary" onClick={() => handleAdd("line")}>
          Add Line Chart
        </button>

        <button className="btn btn-primary" onClick={() => handleAdd("pie")}>
          Add Pie Chart
        </button>

        <button className="btn btn-primary" onClick={() => handleAdd("table")}>
          Add Table
        </button>

      </div>

    </div>
  );
}

export default DashboardConfig;