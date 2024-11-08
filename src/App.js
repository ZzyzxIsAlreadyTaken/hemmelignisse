import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import { DrawPage } from "./routes/DrawPage";
import { AssignmentsPage } from "./routes/AssignmentsPage";
import "./App.css";
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(DrawPage, {}) }), _jsx(Route, { path: "/oversikt", element: _jsx(AssignmentsPage, {}) })] }));
}
export default App;
