import React from "react";

function DateFilter({ setFilter }) {

  return (
    <div className="mb-3">

      <label className="form-label me-2">
        Show data for
      </label>

      <select
        className="form-select w-auto d-inline"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
      </select>

    </div>
  );
}

export default DateFilter;