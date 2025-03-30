const connectorOptions = ["Type 2", "CCS", "CHAdeMO"];
const networkOptions = ["Pod Point", "BP Pulse", "Tesla", "ChargePoint"];

export default function Filters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4">
      <select
        className="border p-2 rounded"
        value={filters.connector}
        onChange={(e) => setFilters({ ...filters, connector: e.target.value })}
      >
        <option value="">All Connectors</option>
        {connectorOptions.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={filters.network}
        onChange={(e) => setFilters({ ...filters, network: e.target.value })}
      >
        <option value="">All Networks</option>
        {networkOptions.map((net) => (
          <option key={net} value={net}>{net}</option>
        ))}
      </select>
    </div>
  );
}
