import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { ConsoleTyping, ConsoleOutput, ConsoleTypingWithBackspace } from './consoleSim';
import { FaDownload, FaTimes, FaEye } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import { SocialIconsContainer, CertificationsGrid, TimelineItem, ProjectCard, TerminalBox, BugImagePopup, CertificationBadge } from './components';
import { LOADING_COMMAND, LOADING_OUTPUT_LINES, ABOUT_PHRASES, ABOUT_DESCRIPTION, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA, RESUME_DATA, TERMINAL_COMMANDS, ANIMATION_CONFIG } from './constants';
import "react-pdf/dist/esm/Page/TextLayer.css";
function LoadingView({ onLoadingComplete }) {
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
    return (_jsxs("div", { className: "console-container", children: [_jsx("div", { className: "command-line", children: _jsx(ConsoleTyping, { lines: [LOADING_COMMAND], onTypingComplete: () => setTimeout(() => setShowOutput(true), 500), typingSpeed: ANIMATION_CONFIG.loadingTypingSpeed }) }), showOutput && !outputComplete && (_jsx(ConsoleOutput, { lines: LOADING_OUTPUT_LINES, onComplete: () => {
                    setTimeout(() => {
                        setOutputComplete(true);
                        onLoadingComplete();
                    }, ANIMATION_CONFIG.loadingCompleteDelay);
                }, nextLineDelay: ANIMATION_CONFIG.nextLineDelay })), _jsxs("button", { className: `skip-button ${skipButtonVisible ? 'visible' : ''}`, onClick: skipAnimation, children: ["./skip-animation", _jsx("span", { className: 'blinking-cursor' })] })] }));
}
function AboutView() {
    return (_jsxs("section", { id: "about", className: "about-view", children: [_jsx("h1", { className: "section-heading", children: "Rouvin Erh" }), _jsxs("p", { className: "about-subheading", children: ["I'm ", _jsx("span", { className: "typed-about-text", children: _jsx(ConsoleTypingWithBackspace, { texts: ABOUT_PHRASES, typingSpeed: ANIMATION_CONFIG.typingSpeed, backspaceSpeed: ANIMATION_CONFIG.backspaceSpeed, waitDuration: ANIMATION_CONFIG.waitDuration }) })] }), _jsxs(TerminalBox, { children: [TERMINAL_COMMANDS.about, _jsx("span", { className: 'blinking-cursor' }), _jsx("br", {}), ABOUT_DESCRIPTION] }), _jsx(SocialIconsContainer, {}), _jsx(CertificationsGrid, {})] }));
}
const EducationView = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);
    return (_jsxs("section", { id: "education", ref: sectionRef, className: `education-view ${isVisible ? 'visible' : ''}`, children: [_jsxs(TerminalBox, { children: [TERMINAL_COMMANDS.education, _jsx("span", { className: 'blinking-cursor' })] }), _jsx("div", { className: "education-split", children: _jsxs("div", { className: "education-university", children: [_jsx("span", { className: "education-title", children: EDUCATION_DATA.university }), _jsxs("div", { className: "university-details", children: [_jsx("span", { className: "degree", children: EDUCATION_DATA.degree }), _jsxs("span", { className: "university-description", children: ["Expected Graduation: ", EDUCATION_DATA.expectedGraduation] }), _jsxs("span", { className: "university-grade", children: ["Current GPA: ", EDUCATION_DATA.gpa] })] }), _jsx(CertificationBadge, Object.assign({}, EDUCATION_DATA.deansList))] }) })] }));
};
const ExperienceView = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [terminalVisible, setTerminalVisible] = useState(false);
    useEffect(() => {
        const terminalObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTerminalVisible(true);
                terminalObserver.disconnect();
            }
        }, { threshold: 0.1 });
        const terminalElement = document.querySelector('#experience .terminal-box');
        if (terminalElement) {
            terminalObserver.observe(terminalElement);
        }
        return () => terminalObserver.disconnect();
    }, []);
    useEffect(() => {
        const items = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(items).indexOf(entry.target);
                    setVisibleItems((prev) => [...new Set([...prev, index])]);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    return (_jsxs("section", { id: "experience", className: "experience-section", children: [_jsxs(TerminalBox, { isVisible: terminalVisible, children: [TERMINAL_COMMANDS.experience, _jsx("span", { className: "blinking-cursor" })] }), _jsx("div", { className: "timeline", children: EXPERIENCE_DATA.map((exp, index) => (_jsx(TimelineItem, Object.assign({}, exp, { index: index, isVisible: visibleItems.includes(index) }), index))) })] }));
};
const ProjectsView = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [flippedStates, setFlippedStates] = useState(Array(PROJECTS_DATA.length).fill(false));
    const [showBugImage, setShowBugImage] = useState(false);
    useEffect(() => {
        const terminalObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTerminalVisible(true);
                terminalObserver.disconnect();
            }
        }, { threshold: 0.1 });
        const terminalElement = document.querySelector('#projects .terminal-box');
        if (terminalElement)
            terminalObserver.observe(terminalElement);
        return () => {
            if (terminalElement)
                terminalObserver.unobserve(terminalElement);
        };
    }, []);
    useEffect(() => {
        const animatedElements = document.querySelectorAll('.projects-grid .flip-card');
        if (animatedElements.length === 0)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cardElement = entry.target;
                    const index = parseInt(cardElement.dataset.index || "-1", 10);
                    if (index !== -1) {
                        setVisibleItems((prev) => [...new Set([...prev, index])]);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach((el) => observer.observe(el));
        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, [PROJECTS_DATA.length]);
    const handleFlip = (index) => {
        setFlippedStates(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const popup = document.querySelector('.bug-image-popup.visible');
            if (popup && !popup.contains(event.target)) {
                setShowBugImage(false);
            }
        };
        if (showBugImage) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.body.style.overflow = 'hidden';
            document.body.classList.add('popup-active');
        }
        else {
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
    return (_jsxs("section", { id: "projects", className: "projects-section", children: [_jsxs(TerminalBox, { isVisible: terminalVisible, children: [TERMINAL_COMMANDS.projects, _jsx("span", { className: "blinking-cursor" })] }), _jsx("div", { className: "projects-grid", children: PROJECTS_DATA.map((project, index) => (_jsx(ProjectCard, Object.assign({}, project, { index: index, isVisible: visibleItems.includes(index), isFlipped: flippedStates[index], onFlip: () => handleFlip(index), onSpecialClick: project.isSpecial ? () => setShowBugImage(true) : undefined }), index))) }), _jsx(BugImagePopup, { isVisible: showBugImage, onClose: () => setShowBugImage(false) })] }));
};
const ResumeView = () => {
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [showPDF, setShowPDF] = useState(false);
    const pdfWrapperRef = useRef(null);
    const [width, setWidth] = useState(RESUME_DATA.defaultWidth);
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;
    }, []);
    useEffect(() => {
        const terminalObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTerminalVisible(true);
                terminalObserver.disconnect();
            }
        }, { threshold: 0.1 });
        const terminalElement = document.querySelector('#resume .terminal-box');
        if (terminalElement) {
            terminalObserver.observe(terminalElement);
        }
        return () => terminalObserver.disconnect();
    }, []);
    useEffect(() => {
        if (!pdfWrapperRef.current)
            return;
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
    return (_jsxs("section", { id: "resume", className: "resume-section", children: [_jsxs(TerminalBox, { isVisible: terminalVisible, children: [TERMINAL_COMMANDS.resume, _jsx("span", { className: "blinking-cursor", children: "|" })] }), _jsxs("div", { className: "resume-buttons", children: [_jsx("button", { onClick: () => setShowPDF(!showPDF), className: "terminal-btn", children: showPDF ? _jsxs(_Fragment, { children: [_jsx(FaTimes, {}), " Hide Resume"] }) : _jsxs(_Fragment, { children: [_jsx(FaEye, {}), " View Resume"] }) }), _jsxs("button", { onClick: handleDownload, className: "terminal-btn download-btn", children: [_jsx(FaDownload, {}), " Download PDF"] })] }), _jsx("div", { className: `resume-viewer-container ${showPDF ? 'slide-down' : 'slide-up'}`, ref: pdfWrapperRef, children: _jsx("div", { className: "pdf-container", children: _jsx(Document, { file: RESUME_DATA.pdfFile, children: _jsx(Page, { pageNumber: 1, width: width, renderTextLayer: false, renderAnnotationLayer: false }) }) }) })] }));
};
export { LoadingView, AboutView, EducationView, ExperienceView, ProjectsView, ResumeView, };
