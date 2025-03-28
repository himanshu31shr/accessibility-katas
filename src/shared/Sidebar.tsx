import { NavLink } from "react-router-dom";

export const Sidebar = () => (
  <nav className="sidebar">
    <div className="sidebar-list">
      <NavLink
        key={"accordion"}
        to="/accordion"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Accordion
      </NavLink>
      <NavLink
        key={"combo-box"}
        to="/combo-box"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Combo Box
      </NavLink>
      <NavLink
        key={"modal"}
        to="/modal"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Modal
      </NavLink>
    </div>
  </nav>
);
