import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AccessibleAccordian from "./components/AccessibleAccordian/AccessibleAccordian";
import AccessibleComboBox from "./components/AccessibleComboBox/AccessibleComboBox";
import AccessibleModal from "./components/AccessibleModal/AccessibleModal";
import { Sidebar } from "./shared/Sidebar";
import { Dashboard } from "./shared/dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <header>
            <p>Accessible Components</p>
          </header>
          <section>
            <Routes>
              <Route path="/accordion" Component={AccessibleAccordian} />
              <Route path="/combo-box" Component={AccessibleComboBox} />
              <Route path="/modal" Component={AccessibleModal} />
              <Route path="/" Component={Dashboard} />
            </Routes>
          </section>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
