import { useState } from 'react';
import { LoadingView, AboutView, ResumeView, EducationView, ExperienceView, ProjectsView } from "./views";
import { Footer } from "./components";
import './index.css';

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
            <Footer />
          </div>
        )}
      </div>
    );
}
export default App;