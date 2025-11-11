import { Link } from "react-router-dom";
import "./Sidebar.css";
import { Dashboard, List, People, RateReview } from "@mui/icons-material";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <Dashboard /> Dashboard
        </p>
      </Link>
      <Link to="/admin/dashboard">
        <SimpleTreeView>
          <TreeItem itemId="1" label="products">
            <Link to="/admin/products">
              <TreeItem itemId="2" label="all" />
            </Link>
            <Link to="/admin/product">
              <TreeItem itemId="3" label="Create" />
            </Link>
          </TreeItem>
        </SimpleTreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <List /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <People />
          Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReview />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
