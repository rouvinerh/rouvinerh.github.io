import { useState, useRef, useEffect } from 'react';
import { ConsoleTyping, ConsoleOutput, ConsoleTypingWithBackspace } from './consoleSim';
import { FaLinkedin, FaGithub, FaDownload, FaTimes, FaEye } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import { SiGitbook } from "react-icons/si";
import "react-pdf/dist/esm/Page/TextLayer.css";

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
                whoami --certs --links<span className={'blinking-cursor'}></span><br />
                Hello, I'm Rouvin, an InfoSec student from the National University of Singapore specialising in offensive security.
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
            ./education --uni<span className={'blinking-cursor'}></span>
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
            role: 'Offensive Security Engineer Intern',
            company: 'PayPal',
            period: 'May 2025 — Present',
            description: "Triaging bug reports and pentesting under PayPal's Offensive Security team.",
            logoSrc: 'paypal-logo.png',
        },
        {
            role: 'Security Researcher',
            company: 'Synack Red Team',
            period: 'May 2025 — Present',
            description: "Pentesting web and host targets on a freelance basis.",
            logoSrc: 'synack.webp',
        },
        {
            role: 'Cyber Instructor',
            company: 'DART',
            period: 'Mar 2024 — Present',
            description: 'Taught cybersecurity to students as part of Cyber Youth programme.',
            logoSrc: 'dart-logo.jpg'
        },
        {
            role: 'Security Engineer Intern',
            company: 'Ascenda Loyalty',
            period: 'May 2024 - Aug 2024',
            description: 'Carried out white-box web application pentesting, identifying 20+ security flaws, along with custom DAST tool development.',
            logoSrc: 'ascenda-logo.png',
        },
        {
            role: 'Attack Simulation Intern',
            company: 'Cyber Security Agency of Singapore',
            period: 'May 2023 - Aug 2023',
            description: 'Created Caldera adversary profiles and built an Active Directory environment using Vagrant for running profiles.',
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
            description: 'Writing security blogs, and all my security-related adventures in a GitBook.',
            imageSrc: 'gitbook.png',
            link: 'https://rouvin.gitbook.io',
        },
        {
            title: '🐛 Bug Bounties',
            description: 'Hunting and reporting bugs on bug bounties VDPs when I am free (and bored).',
            imageSrc: 'xss.png',
            link: '#',
        },
        {
            title: '💀 Malware Development',
            description: 'Learning evasion techniques and various methods of making calc.exe run with Maldev Academy.',
            imageSrc: 'malwaredev.png',
            link: 'https://github.com/rouvinerh/Malware-Tech',
        },
        {
            title: '🖥️ Boot2Root',
            description: 'Rooted 264 machines on HTB and 99 machines on Proving Grounds and still going!',
            imageSrc: 'boot2root.png',
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

        return () => {
            if (terminalElement) terminalObserver.unobserve(terminalElement);
        }
    }, []);

    useEffect(() => {
        const animatedElements = document.querySelectorAll('.projects-grid .flip-card');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cardElement = entry.target as HTMLElement;
                        const index = parseInt(cardElement.dataset.index || "-1", 10);
                        if (index !== -1) {
                           setVisibleItems((prev) => [...new Set([...prev, index])]);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedElements.forEach((el) => observer.observe(el));
        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        }
    }, [projectsData.length]);

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
                    ./projects --hover<span className="blinking-cursor"></span>
            </div>
            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <div
                        key={index}
                        className={`flip-card ${flippedStates[index] ? 'flipped' : ''} ${
                            visibleItems.includes(index) ? 'visible' : ''
                        }`}
                        onMouseEnter={() => handleFlip(index)}
                        onMouseLeave={() => handleFlip(index)}
                    >
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <h3 className="project-title">{project.title}</h3>
                            </div>
                            <div className="flip-card-back">
                                <div
                                    className="card-image-banner"
                                    style={{ backgroundImage: `url(${project.imageSrc})` }}
                                />
                                <div className="card-content-area">
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

const ResumeView = () => {
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [showPDF, setShowPDF] = useState(false);
    
    const pdfFile = '/RouvinErh_CV.pdf'; 
    const pdfWrapperRef = useRef(null);
    const [width, setWidth] = useState(793);

    // Configure PDF.js worker
    useEffect(() => { 
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`; 
    }, []);

    // Terminal animation observer
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

        const terminalElement = document.querySelector('#resume .terminal-box');
        if (terminalElement) {
            terminalObserver.observe(terminalElement);
        }

        return () => terminalObserver.disconnect();
    }, []);

    // Responsive width observer
    useEffect(() => {
        if (!pdfWrapperRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const containerWidth = entry.target.clientWidth;
                const newWidth = Math.min(containerWidth * 0.95, 793); // Max width of 793
                
                if (Math.abs(newWidth - width) > 5) { // Only update if significant change
                    setWidth(newWidth);
                }
            }
        });
        
        resizeObserver.observe(pdfWrapperRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [width]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfFile;
        link.download = 'RouvinErh_CV.pdf';
        link.target = '_blank'; // Open in new tab as fallback
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <section id="resume" className="resume-section">
            <div className={`terminal-box ${terminalVisible ? 'visible' : ''}`}>
                ./resume --download-view<span className="blinking-cursor">|</span>
            </div>

            <div className="resume-buttons">
                <button
                    onClick={() => setShowPDF(!showPDF)}
                    className="terminal-btn"
                >
                    {showPDF ? <><FaTimes /> Hide Resume</> : <><FaEye /> View Resume</>}
                </button>

                <button
                    onClick={handleDownload}
                    className="terminal-btn download-btn"
                >
                    <FaDownload /> Download PDF
                </button>
            </div>

            <div className={`resume-viewer-container ${showPDF ? 'slide-down' : 'slide-up'}`} ref={pdfWrapperRef}>  
                <div className="pdf-container">
                    <Document 
                        file={pdfFile}
                    >
                        <Page
                            pageNumber={1}
                            width={width} // Use dynamic width instead of hard-coded 793
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
            </div>
        </section>
    );
};
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
    ResumeView,
    // ContactsView,
    // HeaderView,
    // HeroView,
    // FooterView,
};