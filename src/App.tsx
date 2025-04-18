import React, { useState } from 'react';
import './index.css';
import { LoadingView, AboutView, EducationView, ExperienceView } from "./views.js";

function App() {
    const [showAbout, setShowAbout] = useState(false);
  
    return (
      <div className="container">
        {!showAbout ? (
          <LoadingView onLoadingComplete={() => setShowAbout(true)} />
        ) : (
          <div className="portfolio-content fade-in">
            <AboutView />
            <EducationView />
            <ExperienceView />
          </div>
        )}
      </div>
    );
}
export default App;