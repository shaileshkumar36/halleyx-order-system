import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";

import { BarChartWidget, LineChartWidget, PieChartWidget } from "./Charts";
import KPIWidget from "./KPIWidget";
import TableWidget from "./TableWidget";
import DateFilter from "./DateFilter";

function Dashboard({ widgets, setWidgets }) {

  const navigate = useNavigate();

  // Filter state
  const [filter, setFilter] = useState("all");

  // Orders data
  const [orders, setOrders] = useState([]);

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  // Fetch data from backend
useEffect(() => {
  setLoading(true);

  fetch("http://localhost:8080/orders")
    .then((res) => res.json())
    .then((data) => {
      setOrders(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to load data");
      setLoading(false);
    });

}, []);

  // Drag & Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
    setWidgets(items);
  };

  // Delete widget
  const removeWidget = (index) => {
    const updated = widgets.filter((_, i) => i !== index);
    setWidgets(updated);
  };

  // Resize widget
  const changeWidgetSize = (index, size) => {
    const updated = [...widgets];
    updated[index].size = size;
    setWidgets(updated);
  };

  if (loading) {
  return <h3 className="text-center mt-5">Loading...</h3>;
  }

  if (error) {
    return <h3 className="text-center text-danger mt-5">{error}</h3>;
  }

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1>Halleyx Order Dashboard</h1>

        <DateFilter setFilter={setFilter} />

        <button
          className="btn btn-dark"
          onClick={() => navigate("/dashboard/configure")}
        >
          Configure Dashboard
        </button>

      </div>

      {/* Drag Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div
              className="row"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >

              {widgets.map((widget, index) => (

                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (

                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}

                      className={
                        widget.size === "small"
                          ? "col-lg-3 col-md-6 mb-3"
                          : widget.size === "large"
                          ? "col-12 mb-3"
                          : "col-lg-6 col-md-12 mb-3"
                      }
                    >

                      <div className="card p-3 shadow-sm position-relative">

                        {/* Delete Button */}
                        <button
                          className="btn btn-danger btn-sm position-absolute rounded-circle"
                          style={{ top: "8px", right: "8px", width: "30px", height: "30px" }}
                          onClick={(e) => {
                            e.stopPropagation();   // 🔥 IMPORTANT
                            removeWidget(index);
                          }}
                        >
                          X
                        </button>

                        {/* Resize */}
                        <select
                          className="form-select form-select-sm mb-2"
                          value={widget.size}
                          onChange={(e) =>
                            changeWidgetSize(index, e.target.value)
                          }
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>

                        {/* Widgets */}
                        {widget.type === "kpi" && <KPIWidget data={orders} />}
                        {widget.type === "bar" && <BarChartWidget data={orders} />}
                        {widget.type === "line" && <LineChartWidget data={orders} />}
                        {widget.type === "pie" && <PieChartWidget data={orders} />}
                        {widget.type === "table" && <TableWidget data={orders} />}

                      </div>

                    </div>

                  )}
                </Draggable>

              ))}

              {provided.placeholder}

            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
}

export default Dashboard;