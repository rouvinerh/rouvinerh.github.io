import { useState, useRef, useEffect } from 'react';
import { ConsoleTyping, ConsoleOutput, ConsoleTypingWithBackspace } from './consoleSim';
import { FaDownload, FaTimes, FaEye } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import { SocialIconsContainer,  CertificationsGrid,  TimelineItem ,  TerminalBox,  BugImagePopup, CertificationBadge } from './components';
import { LOADING_COMMAND, LOADING_OUTPUT_LINES, ABOUT_PHRASES, ABOUT_DESCRIPTION, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA, RESUME_DATA, TERMINAL_COMMANDS, ANIMATION_CONFIG } from './constants';
import "react-pdf/dist/esm/Page/TextLayer.css";

function LoadingView({ onLoadingComplete }: { onLoadingComplete: () => void }) {
    const [skipButtonVisible, setSkipButtonVisible] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [outputComplete, setOutputComplete] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setSkipButtonVisible(true);
        }, ANIMATION_CONFIG.skipButtonDelay); 
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
              lines={[LOADING_COMMAND]} 
              onTypingComplete={() => setTimeout(() => setShowOutput(true), 500)} 
              typingSpeed={ANIMATION_CONFIG.loadingTypingSpeed}
            />
          </div>
  
          {showOutput && !outputComplete && (
            <ConsoleOutput
              lines={LOADING_OUTPUT_LINES}
              onComplete={() => {
                setTimeout(() => {
                  setOutputComplete(true);
                  onLoadingComplete();
                }, ANIMATION_CONFIG.loadingCompleteDelay);
              }}
              nextLineDelay={ANIMATION_CONFIG.nextLineDelay}
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
    return (
        <section id="about" className="about-view">
            <h1 className="section-heading">Rouvin Erh</h1>
            <p className="about-subheading">
                I'm <span className="typed-about-text">
                    <ConsoleTypingWithBackspace 
                        texts={ABOUT_PHRASES} 
                        typingSpeed={ANIMATION_CONFIG.typingSpeed} 
                        backspaceSpeed={ANIMATION_CONFIG.backspaceSpeed} 
                        waitDuration={ANIMATION_CONFIG.waitDuration} 
                    />
                </span>
            </p>

            <TerminalBox>
                {TERMINAL_COMMANDS.about}<span className={'blinking-cursor'}></span><br />
                {ABOUT_DESCRIPTION}
            </TerminalBox>

            <SocialIconsContainer />
            <CertificationsGrid />
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
            <TerminalBox>
                {TERMINAL_COMMANDS.education}<span className={'blinking-cursor'}></span>
            </TerminalBox>

            <div className="education-split">
                <div className="education-university">
                    <span className="education-title">{EDUCATION_DATA.university}</span>
                    <div className="university-details">
                        <span className="degree">{EDUCATION_DATA.degree}</span>
                        <span className="university-description">Expected Graduation: {EDUCATION_DATA.expectedGraduation}</span>
                        <span className="university-grade">Current GPA: {EDUCATION_DATA.gpa}</span>
                    </div>
                    <CertificationBadge {...EDUCATION_DATA.deansList} />
                </div>
            </div>
        </section>
    );
};

const ExperienceView = () => {
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

    return (
        <section id="experience" className="experience-view">
            <TerminalBox isVisible={terminalVisible}>
                {TERMINAL_COMMANDS.experience}<span className="blinking-cursor"></span>
            </TerminalBox>

            <div className="timeline">
                {EXPERIENCE_DATA.map((exp, index) => (
                    <TimelineItem
                        key={index}
                        {...exp}
                        index={index}
                        isVisible={visibleItems.includes(index)}
                    />
                ))}
            </div>
        </section>
    );
};

const ProjectsView = () => {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [flippedStates, setFlippedStates] = useState<boolean[]>(Array(PROJECTS_DATA.length).fill(false));
    const [showBugImage, setShowBugImage] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

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
    }, [PROJECTS_DATA.length]);

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

    return (
        <section id="projects" className="projects-view">
            <TerminalBox isVisible={terminalVisible}>
                {TERMINAL_COMMANDS.projects}<span className="blinking-cursor"></span>
            </TerminalBox>

            <div className="projects-grid">
                {PROJECTS_DATA.map((project, index) => (
                    <div
                        key={index}
                        className={`flip-card ${flippedStates[index] ? 'flipped' : ''} ${visibleItems.includes(index) ? 'visible' : ''}`}
                        onClick={() => handleFlip(index)}
                        onMouseEnter={!isTouchDevice ? () => handleFlip(index) : undefined}
                        onMouseLeave={!isTouchDevice ? () => handleFlip(index) : undefined}
                        data-index={index}
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
                                            if (project.isSpecial) {
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
            </div>

            <BugImagePopup 
                isVisible={showBugImage} 
                onClose={() => setShowBugImage(false)} 
            />
        </section>
    );
}

const ResumeView = () => {
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [showPDF, setShowPDF] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const pdfWrapperRef = useRef(null);
    const sectionRef = useRef(null);
    const [width, setWidth] = useState(RESUME_DATA.defaultWidth);

    useEffect(() => { 
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`; 
    }, []);

    useEffect(() => {
        const sectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    sectionObserver.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            sectionObserver.observe(sectionRef.current);
        }

        return () => sectionObserver.disconnect();
    }, []);

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
    


    useEffect(() => {
        if (!pdfWrapperRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const containerWidth = entry.target.clientWidth;
                const newWidth = Math.min(containerWidth * 0.95, RESUME_DATA.defaultWidth);
                
                if (Math.abs(newWidth - width) > 5) {
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
        link.href = RESUME_DATA.pdfFile;
        link.download = RESUME_DATA.downloadFilename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section 
            id="resume" 
            ref={sectionRef}
            className={`resume-view ${isVisible ? 'visible' : ''}`}
        >
            <TerminalBox isVisible={terminalVisible}>
                {TERMINAL_COMMANDS.resume}<span className="blinking-cursor"></span>
            </TerminalBox>

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
                    <FaDownload /> Download
                </button>
            </div>

            <div className={`resume-viewer-container ${showPDF ? 'slide-down' : 'slide-up'}`} ref={pdfWrapperRef}>  
                <div className="pdf-container">
                    <Document file={RESUME_DATA.pdfFile}>
                        <Page
                            pageNumber={1}
                            width={width}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
            </div>
        </section>
    );
};

const LifeView = () => {

    const [terminalVisible, setTerminalVisible] = useState(false);

        useEffect(() => {
        const terminalObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTerminalVisible(true);
                terminalObserver.disconnect();
            }
        }, { threshold: 0.1 });

        const terminalElement = document.querySelector('#life .terminal-box');
        if (terminalElement) terminalObserver.observe(terminalElement);

        return () => {
            if (terminalElement) terminalObserver.unobserve(terminalElement);
        }
    }, []);

    return (
        <section id="life" className="life-view">
            <TerminalBox isVisible={terminalVisible}>
                {TERMINAL_COMMANDS.life}<span className="blinking-cursor"></span>
            </TerminalBox>

            
        </section>
    );
};



export { LoadingView, AboutView, EducationView, ExperienceView, ProjectsView, ResumeView };