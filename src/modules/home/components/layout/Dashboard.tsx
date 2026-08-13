import SummaryCards from "../dashboard/SummaryCards";
import Toolbar from "../dashboard/Toolbar";

const Dashboard = () => {
  return (
    <div className="container-fluid p-3">
      <Toolbar />
      <SummaryCards />
    </div>
  )
}

export default Dashboard;