const connectorOptions = ["Type 2", "CCS", "CHAdeMO"];
const networkOptions = ["Pod Point", "BP Pulse", "Tesla", "ChargePoint"];

export default function Filters({ filters, setFilters }) {//Filtering function for the EV Map but i didnt ahve access to such info but this would be reviewed in the ealuation
  return (
    <div className="ev-filters">
      <div className="ev-filter-group">
        <label>Connector Type</label>
        <select
          value={filters.connector}
          onChange={(e) => setFilters({ ...filters, connector: e.target.value })}
        >
          <option value="">All</option>
          {connectorOptions.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="ev-filter-group">
        <label>Network</label>
        <select
          value={filters.network}
          onChange={(e) => setFilters({ ...filters, network: e.target.value })}
        >
          <option value="">All</option>
          {networkOptions.map((net) => (
            <option key={net} value={net}>{net}</option>
          ))}
        </select>
      </div>
    </div>

  );
}
