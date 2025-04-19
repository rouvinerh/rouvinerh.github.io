import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './index.css';
import { LoadingView, AboutView, EducationView, ExperienceView, ProjectsView } from "./views.js";
function App() {
    const [showAbout, setShowAbout] = useState(false);
    return (_jsx("div", { className: "container", children: !showAbout ? (_jsx(LoadingView, { onLoadingComplete: () => setShowAbout(true) })) : (_jsxs("div", { className: "portfolio-content fade-in", children: [_jsx(AboutView, {}), _jsx(EducationView, {}), _jsx(ExperienceView, {}), _jsx(ProjectsView, {})] })) }));
}
export default App;
