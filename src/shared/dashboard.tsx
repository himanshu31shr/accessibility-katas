import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <ul className="dashboard-list">
      <li>
        <Link to="/accordion">Accordion</Link>
      </li>
      <li>
        <Link to="/combo-box">Combo Box</Link>
      </li>
      <li>
        <Link to="/modal">Modal</Link>
      </li>
    </ul>
  );
};
