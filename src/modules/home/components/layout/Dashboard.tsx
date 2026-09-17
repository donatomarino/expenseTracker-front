import ExpenseControls from "../dashboard/ExpenseControls";
import ExpenseTable from "../dashboard/ExpenseTable";
import SummaryCards from "../dashboard/SummaryCards";
import Toolbar from "../dashboard/Toolbar";

const Dashboard = () => {
  return (
    <div className="container-fluid p-3">
      <Toolbar />
      <SummaryCards />
      <ExpenseControls />
      <ExpenseTable />
    </div>
  )
}

export default Dashboard;