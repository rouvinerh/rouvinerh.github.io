import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './index.css';
import { LoadingView, AboutView, ResumeView, EducationView, ExperienceView, ProjectsView } from "./views.js";
function App() {
    const [showAbout, setShowAbout] = useState(false);
    return (_jsx("div", { className: "container", children: !showAbout ? (_jsx(LoadingView, { onLoadingComplete: () => setShowAbout(true) })) : (_jsxs("div", { className: "portfolio", children: [_jsx(AboutView, {}), _jsx(ResumeView, {}), _jsx(ExperienceView, {}), _jsx(ProjectsView, {}), _jsx(EducationView, {})] })) }));
}
export default App;
