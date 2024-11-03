import { paymentCol } from "./components/table/columns";
import { DataTable } from "./components/table/data-table";
import { payments } from "./dummyData/payments";

function App() {
  return <DataTable columns={paymentCol} data={payments} />;
}

export default App;
