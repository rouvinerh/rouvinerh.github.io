import React, { useState } from 'react';
import './index.css';
import { LoadingView, AboutView, EducationView, ExperienceView, ProjectsView } from "./views.js";

function App() {
    const [showAbout, setShowAbout] = useState(false);
  
    return (
      <div className="container">
        {!showAbout ? (
          <LoadingView onLoadingComplete={() => setShowAbout(true)} />
        ) : (
          <div className="portfolio">
            <AboutView />
            <ExperienceView />
            <ProjectsView />
            <EducationView />

          </div>
        )}
      </div>
    );
}
export default App;