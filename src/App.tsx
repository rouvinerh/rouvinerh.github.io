import { useState } from 'react';
import './index.css';
import { LoadingView, AboutView, ResumeView, EducationView, ExperienceView, ProjectsView, FooterView } from "./views.js";

function App() {
    const [showAbout, setShowAbout] = useState(false);
  
    return (
      <div className="container">
        {!showAbout ? (
          <LoadingView onLoadingComplete={() => setShowAbout(true)} />
        ) : (
          <div className="portfolio">
            <AboutView />
            <ResumeView />
            <ExperienceView />
            <ProjectsView />
            <EducationView />
            <FooterView />
          </div>
        )}
      </div>
    );
}
export default App;