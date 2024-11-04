import { paymentCol } from "./components/table/columns";
import { DataTable } from "./components/table/data-table";
import { payments } from "./dummyData/payments";

function App() {
  return <div className="p-5"><DataTable columns={paymentCol} data={payments} /></div>;
}

export default App;
