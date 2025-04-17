import { useState, useRef, useEffect } from 'react';
import { ConsoleTyping, ConsoleOutput, ConsoleTypingWithBackspace } from './consoleSim';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGitbook } from "react-icons/si";


function LoadingView({ onLoadingComplete }: { onLoadingComplete: () => void }) {
    const commandLine = '$ ./load-portfolio';
    const outputLines = [
      '[+] Loading education...',
      '[+] Loading certifications...',
      '[+] Loading work experience...',
      '[+] Loading projects...',
      '[+] Loading resume...',
      '[+] Preparing to load website...',
      '[+] Website loaded!'
    ];
  
    const [showOutput, setShowOutput] = useState(false);
    const [outputComplete, setOutputComplete] = useState(false);
  
    return (
      <div className="console-container">
        <div className="command-line">
          <ConsoleTyping 
            lines={[commandLine]} 
            onTypingComplete={() => setTimeout(() => setShowOutput(true), 500)} 
            typingSpeed={50}
          />
        </div>
  
        {showOutput && (
          <ConsoleOutput
            lines={outputLines}
            onComplete={() => {
              setTimeout(() => {
                setOutputComplete(true);
                onLoadingComplete();
              }, 1300);
            }}
            nextLineDelay={500}
          />
        )}
      </div>
    );
  }

function AboutView() {
    const aboutPhrases = [
        "a cybersecurity enthusiast.",
        "a CTF player.",
        "an Offensive Security guy.",
        "an InfoSec student."
    ];

    return (
        <section id="about" className="about-view">
            <h1 className="section-heading">Rouvin Erh</h1>
            <p className="about-subheading">
                I'm <span className="typed-about-text"><ConsoleTypingWithBackspace texts={aboutPhrases} typingSpeed={70} backspaceSpeed={30} waitDuration={1000} /></span>
            </p>

            <p id="about-description" className="terminal-box" >
                whoami<span className={'blinking-cursor'}></span><p></p>Hello, I'm Rouvin, a cybersecurity student specialising in offensive security, and I love to break things.
                </p>
            <div className="social-icons-container">
                <a href="https://linkedin.com/in/rouvinerh" className="social-tooltip" data-tooltip="LinkedIn">
                    <FaLinkedin className="social-icon" />
                </a>
                <a href="https://github.com/rouvinerh" className="social-tooltip" data-tooltip="GitHub">
                    <FaGithub className="social-icon" />
                </a>
                <a href="https://rouvin.gitbook.io" className="social-tooltip" data-tooltip="Blog">
                    <SiGitbook className="social-icon" />
                </a>
            </div>

        </section>
    );
}

const EducationView = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
    return (
    <section 
        id="education" 
        ref={sectionRef}
        className={`education-view ${isVisible ? 'visible' : ''}`}
    >
        <div className="terminal-box">
            education --university --certs<span className={'blinking-cursor'}></span>
        </div>

        <div className="education-split">
            <div className="education-left">
                <span className="education-title">National University of Singapore</span>
                <div className="college-details">
                    <span className="degree">Bachelor of Computing in Information Security</span>
                    <span className="college-description">Expected Graduation: May 2026</span>
                    <span className="college-grade">Current GPA: 4.71 / 5.00</span>
                </div>
                <a href="https://credentials.nus.edu.sg/fdfc9ff6-b90c-4e0c-a705-c6fc0ad6b678" className="social-tooltip" data-tooltip="Dean's List AY23/24 Semester 2" target="_blank" rel="noopener noreferrer">
                        <img src="dean-list-logo.png" alt="DeanList" className="cert-logo" />
                    </a>
            </div>
            <div className="education-right">
                <span className="education-title">Certifications</span>
                <div className="cert-logos">
                    <a href="https://credentials.offsec.com/8cf53528-7f84-458e-b035-9109ba5af955" className="social-tooltip" data-tooltip="OSED - Achieved in 2025" target="_blank" rel="noopener noreferrer">
                        <img src="osed-logo.png" alt="OSED" className="cert-logo" />
                    </a>
                    <a href="https://credentials.offsec.com/e0767f9c-9826-4eac-806b-d63258d28256" className="social-tooltip" data-tooltip="OSWE - Achieved in 2025" target="_blank" rel="noopener noreferrer">
                        <img src="oswe-logo.png" alt="OSWE" className="cert-logo" />
                    </a>
                    <a href="https://www.credential.net/6d698072-51f3-43f7-83ac-27117c629a82" className="social-tooltip" data-tooltip="CRTE - Achieved in 2023" target="_blank" rel="noopener noreferrer">
                        <img src="crte-logo.webp" alt="CRTE" className="cert-logo" />
                    </a>
                    <a href="https://eu.badgr.com/public/assertions/Ie7VP__qSp-9gAxdwyB1rw?identity__email=rouvinerh@gmail.com" className="social-tooltip" data-tooltip="CRTO - Achieved in 2023" target="_blank" rel="noopener noreferrer">
                        <img src="crto-logo.png" alt="CRTO" className="cert-logo" />
                    </a>
                    <a href="https://www.credential.net/e1d80a61-7960-4164-ba82-bdba4292d50b#acc.nQho8jM2" className="social-tooltip" data-tooltip="OSCP - Achieved in 2022" target="_blank" rel="noopener noreferrer">
                        <img src="oscp-logo.png" alt="OSCP" className="cert-logo" />
                    </a>
                </div>
            </div>
        </div>
    </section>
    );
};

// const ExperienceView = () => (

// );

// const ProjectsView = () => (

// );

// const ResumeView = () => (

// );

// const ContactsView = () => (

// );

// const HeaderView = () => (

// );

// const HeroView = () => (

// );

// const FooterView = () => (

// );

export {
    LoadingView,
    AboutView,
    EducationView,
    // ExperienceView,
    // ProjectsView,
    // ResumeView,
    // ContactsView,
    // HeaderView,
    // HeroView,
    // FooterView,
};