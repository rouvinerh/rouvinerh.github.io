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
      '[+] Website loaded!'
    ];

    const [skipButtonVisible, setSkipButtonVisible] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [outputComplete, setOutputComplete] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setSkipButtonVisible(true);
        }, 50); 
    }, []);

    const skipAnimation = () => {
        setShowOutput(true);
        setOutputComplete(true);
        onLoadingComplete();
    };
  
    return (
        <div className="console-container">
          <div className="command-line">
            <ConsoleTyping 
              lines={[commandLine]} 
              onTypingComplete={() => setTimeout(() => setShowOutput(true), 500)} 
              typingSpeed={50}
            />
          </div>
  
          {showOutput && !outputComplete && (
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
  
            <button
                className={`skip-button ${skipButtonVisible ? 'visible' : ''}`}
                onClick={skipAnimation}
            >
                ./skip-animation<span className={'blinking-cursor'}></span>
            </button>
        </div>
      );
  }

function AboutView() {
    const aboutPhrases = [
        "a cybersecurity engineer.",
        "a CTF player.",
        "into Offensive Security.",
        "an InfoSec student.",
        "hacking for good."
    ];

    return (
        <section id="about" className="about-view">
            <h1 className="section-heading">Rouvin Erh</h1>
            <p className="about-subheading">
                I'm <span className="typed-about-text"><ConsoleTypingWithBackspace texts={aboutPhrases} typingSpeed={70} backspaceSpeed={30} waitDuration={1000} /></span>
            </p>

            <p id="about-description" className="terminal-box">
                whoami<span className={'blinking-cursor'}></span><br />
                Hello, I'm Rouvin, a cybersecurity student from Singapore specialising in offensive security, and I love to break things.
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
            <div className="cert-logos">
                    <a href="https://credentials.offsec.com/8cf53528-7f84-458e-b035-9109ba5af955" className="social-tooltip" data-tooltip="OffSec Exploit Developer" target="_blank" rel="noopener noreferrer">
                        <img src="osed-logo.svg" alt="OSED" className="cert-logo" />
                    </a>
                    <a href="https://credentials.offsec.com/e0767f9c-9826-4eac-806b-d63258d28256" className="social-tooltip" data-tooltip="OffSec Web Expert" target="_blank" rel="noopener noreferrer">
                        <img src="oswe-logo.svg" alt="OSWE" className="cert-logo" />
                    </a>
                    <a href="https://www.credential.net/6d698072-51f3-43f7-83ac-27117c629a82" className="social-tooltip" data-tooltip="Certified Red Team Expert" target="_blank" rel="noopener noreferrer">
                        <img src="crte-logo.webp" alt="CRTE" className="cert-logo" />
                    </a>
                    <a href="https://eu.badgr.com/public/assertions/Ie7VP__qSp-9gAxdwyB1rw?identity__email=rouvinerh@gmail.com" className="social-tooltip" data-tooltip="Certified Red Team Operator" target="_blank" rel="noopener noreferrer">
                        <img src="crto-logo.png" alt="CRTO" className="cert-logo" />
                    </a>
                    <a href="https://www.credential.net/e1d80a61-7960-4164-ba82-bdba4292d50b#acc.nQho8jM2" className="social-tooltip" data-tooltip="OffSec Certified Professional" target="_blank" rel="noopener noreferrer">
                        <img src="oscp-logo.svg" alt="OSCP" className="cert-logo" />
                    </a>
            </div>

        </section>
    );
}

const EducationView = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); 
                }
            },
            { threshold: 0.1 } 
        );
    
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
    
        return () => observer.disconnect();
    }, []);
    return (
    <section 
        id="education" 
        ref={sectionRef}
        className={`education-view ${isVisible ? 'visible' : ''}`}
    >
        <div className="terminal-box">
            ./education --uni --certs<span className={'blinking-cursor'}></span>
        </div>

        <div className="education-split">
            <div className="education-university">
                <span className="education-title">National University of Singapore</span>
                <div className="university-details">
                    <span className="degree">Bachelor of Computing in Information Security</span>
                    <span className="university-description">Expected Graduation: May 2026</span>
                    <span className="university-grade">Current GPA: 4.71 / 5.00</span>
                </div>
                <a href="https://credentials.nus.edu.sg/fdfc9ff6-b90c-4e0c-a705-c6fc0ad6b678" className="social-tooltip" data-tooltip="Dean's List AY23/24 Semester 2" target="_blank" rel="noopener noreferrer">
                        <img src="dean-list-logo.png" alt="DeanList" className="cert-logo" />
                    </a>
            </div>
        </div>
    </section>
    );
};

const ExperienceView = () => {
    const experienceData = [
        {
            role: 'Bug Bounty Intern',
            company: 'PayPal',
            period: 'May 2025 — Oct 2025',
            description: 'Summer Intern with Bug Bounty team.',
            logoSrc: 'paypal-logo.png',
        },
        {
            role: 'Sentinel Instructor',
            company: 'DART',
            period: 'Mar 2024 — Present',
            description: 'Taught cybersecurity to students as part of Sentinel programme by MINDEF.',
            logoSrc: 'dart-logo.jpg'
        },
        {
            role: 'Security Engineer Intern',
            company: 'Ascenda Loyalty',
            period: 'May 2024 - Aug 2024',
            description: 'White-box web application pentesting, identified 20+ security flaws, remediated them with developers, and DAST tool development.',
            logoSrc: 'ascenda-logo.png',
        },
        {
            role: 'Attack Simulation Intern',
            company: 'Cyber Security Agency of Singapore',
            period: 'May 2023 - Aug 2023',
            description: 'Created Caldera adversary profiles and built a simulated Active Directory network using Vagrant for running exploits.',
            logoSrc: 'csa-logo.jpg',
        },
    ];

    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [terminalVisible, setTerminalVisible] = useState(false);

    useEffect(() => {
        const terminalObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTerminalVisible(true);
                    terminalObserver.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const terminalElement = document.querySelector('#experience .terminal-box');
        if (terminalElement) {
            terminalObserver.observe(terminalElement);
        }

        return () => terminalObserver.disconnect();
    }, []);

    useEffect(() => {
        const items = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Array.from(items).indexOf(entry.target);
                        setVisibleItems((prev) => [...new Set([...prev, index])]);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const animatedElements = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Array.from(animatedElements).indexOf(entry.target);
                        setVisibleItems((prev) => [...new Set([...prev, index])]);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" className="experience-section">
            <div className={`terminal-box ${terminalVisible ? 'visible' : ''}`}>
                ./experiences --all<span className="blinking-cursor"></span>
            </div>

            <div className="timeline">
                {experienceData.map((exp, index) => (
                    <div
                        key={index}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${
                            visibleItems.includes(index) ? 'visible' : ''
                        }`}
                    >
                        <div className="timeline-circle">
                            {exp.logoSrc && <img src={exp.logoSrc} alt={`${exp.company} logo`} />}
                        </div>
                        <div className="timeline-content">
                            <span className="timeline-role">{exp.role}</span>
                            <span className="timeline-company">{exp.company}</span>
                            <span className="timeline-date">{exp.period}</span>
                            <span className="timeline-description">{exp.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const ProjectsView = () => {
    const projectsData = [
        {
            title: '📚 Security Journal',
            description: 'Writing about web vulnerabilities, security blogs, and just about any of security-related adventures in a GitBook.',
            link: 'https://rouvin.gitbook.io',
        },
        {
            title: '🐛 Bug Bounties',
            description: 'Hunting and reporting bugs on YesWeHack or VDPs when I am free.',
            link: '#',
        },
        {
            title: '💀 Malware Development',
            description: 'Learning defence evasion techniques and various methods of making calc.exe run with Maldev Academy.',
            imageSrc: '/images/portfolio_opt.png',
            link: 'https://github.com/rouvinerh/Malware-Tech',
        },
        {
            title: '🖥️ Boot2Root',
            description: 'Rooted 264 machines on HTB and 99 machines on Proving Grounds and still going!',
            imageSrc: '/images/portfolio_opt.png',
            link: 'https://app.hackthebox.com/profile/814999',
        },
    ];

    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [flippedStates, setFlippedStates] = useState<boolean[]>(Array(projectsData.length).fill(false));
    const [showBugImage, setShowBugImage] = useState(false);

    useEffect(() => {
        const terminalObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTerminalVisible(true);
                terminalObserver.disconnect();
            }
        }, { threshold: 0.1 });

        const terminalElement = document.querySelector('#projects .terminal-box');
        if (terminalElement) terminalObserver.observe(terminalElement);

        return () => terminalObserver.disconnect();
    }, []);

    const handleFlip = (index: number) => {
        setFlippedStates(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          const popup = document.querySelector('.bug-image-popup.visible');
          if (popup && !popup.contains(event.target as Node)) {
            setShowBugImage(false);
          }
        };
      
        if (showBugImage) {
          document.addEventListener('mousedown', handleOutsideClick);
          document.body.style.overflow = 'hidden';
          document.body.classList.add('popup-active');
        } else {
          document.removeEventListener('mousedown', handleOutsideClick);
          document.body.style.overflow = '';
          document.body.classList.remove('popup-active');
        }
      
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
          document.body.style.overflow = '';
          document.body.classList.remove('popup-active'); 
        };
      }, [showBugImage]);
    useEffect(() => {
        const animatedElements = document.querySelectorAll('.flip-card');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Array.from(animatedElements).indexOf(entry.target);
                        setVisibleItems((prev) => [...new Set([...prev, index])]);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    

    return (
        <section id="projects" className="projects-section">
            <div className={`terminal-box ${terminalVisible ? 'visible' : ''}`}>
                    ./projects --list<span className="blinking-cursor"></span>
            </div>
            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <div
                        key={index}
                        className={`flip-card ${flippedStates[index] ? 'flipped' : ''} ${
                            visibleItems.includes(index) ? 'visible' : ''
                        }`}
                        onClick={() => handleFlip(index)}
                    >
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <h3 className="project-title">{project.title}</h3>
                            </div>
                            <div className="flip-card-back">
                                <p className="project-description">{project.description}</p>
                                <a
                                    href={project.link}
                                    className="about-button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (index === 1) {
                                        e.preventDefault();
                                        setShowBugImage(true);
                                        }
                                    }}
                                    >
                                    About
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
                <div className={`bug-image-popup ${showBugImage ? 'visible' : ''}`}>
                    <p className="bug-image-caption">The funniest thing I own:</p>
                    <img src="best_tshirt.jpg" alt="Bug Hunter Mode" />
                    <button onClick={() => setShowBugImage(false)} className="close-button">✖</button>
                </div>
            </div>
        </section>
    );
}
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
    ExperienceView,
    ProjectsView,
    // ResumeView,
    // ContactsView,
    // HeaderView,
    // HeroView,
    // FooterView,
};