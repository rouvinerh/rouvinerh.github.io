import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { ConsoleTyping, ConsoleOutput, ConsoleTypingWithBackspace } from './consoleSim';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGitbook } from "react-icons/si";
function LoadingView({ onLoadingComplete }) {
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
    return (_jsxs("div", { className: "console-container", children: [_jsx("div", { className: "command-line", children: _jsx(ConsoleTyping, { lines: [commandLine], onTypingComplete: () => setTimeout(() => setShowOutput(true), 500), typingSpeed: 50 }) }), showOutput && (_jsx(ConsoleOutput, { lines: outputLines, onComplete: () => {
                    setTimeout(() => {
                        setOutputComplete(true);
                        onLoadingComplete();
                    }, 1300);
                }, nextLineDelay: 500 }))] }));
}
function AboutView() {
    const aboutPhrases = [
        "a cybersecurity enthusiast.",
        "a CTF player.",
        "an Offensive Security guy.",
        "an InfoSec student."
    ];
    return (_jsxs("section", { id: "about", className: "about-view", children: [_jsx("h1", { className: "section-heading", children: "Rouvin Erh" }), _jsxs("p", { className: "about-subheading", children: ["I'm ", _jsx("span", { className: "typed-about-text", children: _jsx(ConsoleTypingWithBackspace, { texts: aboutPhrases, typingSpeed: 70, backspaceSpeed: 30, waitDuration: 1000 }) })] }), _jsxs("p", { id: "about-description", className: "terminal-box", children: ["whoami", _jsx("span", { className: 'blinking-cursor' }), _jsx("p", {}), "Hello, I'm Rouvin, a cybersecurity student specialising in offensive security, and I love to break things."] }), _jsxs("div", { className: "social-icons-container", children: [_jsx("a", { href: "https://linkedin.com/in/rouvinerh", className: "social-tooltip", "data-tooltip": "LinkedIn", children: _jsx(FaLinkedin, { className: "social-icon" }) }), _jsx("a", { href: "https://github.com/rouvinerh", className: "social-tooltip", "data-tooltip": "GitHub", children: _jsx(FaGithub, { className: "social-icon" }) }), _jsx("a", { href: "https://rouvin.gitbook.io", className: "social-tooltip", "data-tooltip": "Blog", children: _jsx(SiGitbook, { className: "social-icon" }) })] })] }));
}
const EducationView = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);
    return (_jsxs("section", { id: "education", ref: sectionRef, className: `education-view ${isVisible ? 'visible' : ''}`, children: [_jsxs("div", { className: "terminal-box", children: ["education --university --certs", _jsx("span", { className: 'blinking-cursor' })] }), _jsxs("div", { className: "education-split", children: [_jsxs("div", { className: "education-left", children: [_jsx("span", { className: "education-title", children: "National University of Singapore" }), _jsxs("div", { className: "college-details", children: [_jsx("span", { className: "degree", children: "Bachelor of Computing in Information Security" }), _jsx("span", { className: "college-description", children: "Expected Graduation: May 2026" }), _jsx("span", { className: "college-grade", children: "Current GPA: 4.71 / 5.00" })] }), _jsx("a", { href: "https://credentials.nus.edu.sg/fdfc9ff6-b90c-4e0c-a705-c6fc0ad6b678", className: "social-tooltip", "data-tooltip": "Dean's List AY23/24 Semester 2", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "dean-list-logo.png", alt: "DeanList", className: "cert-logo" }) })] }), _jsxs("div", { className: "education-right", children: [_jsx("span", { className: "education-title", children: "Certifications" }), _jsxs("div", { className: "cert-logos", children: [_jsx("a", { href: "https://credentials.offsec.com/8cf53528-7f84-458e-b035-9109ba5af955", className: "social-tooltip", "data-tooltip": "OSED - Achieved in 2025", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "osed-logo.png", alt: "OSED", className: "cert-logo" }) }), _jsx("a", { href: "https://credentials.offsec.com/e0767f9c-9826-4eac-806b-d63258d28256", className: "social-tooltip", "data-tooltip": "OSWE - Achieved in 2025", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "oswe-logo.png", alt: "OSWE", className: "cert-logo" }) }), _jsx("a", { href: "https://www.credential.net/6d698072-51f3-43f7-83ac-27117c629a82", className: "social-tooltip", "data-tooltip": "CRTE - Achieved in 2023", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "crte-logo.webp", alt: "CRTE", className: "cert-logo" }) }), _jsx("a", { href: "https://eu.badgr.com/public/assertions/Ie7VP__qSp-9gAxdwyB1rw?identity__email=rouvinerh@gmail.com", className: "social-tooltip", "data-tooltip": "CRTO - Achieved in 2023", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "crto-logo.png", alt: "CRTO", className: "cert-logo" }) }), _jsx("a", { href: "https://www.credential.net/e1d80a61-7960-4164-ba82-bdba4292d50b#acc.nQho8jM2", className: "social-tooltip", "data-tooltip": "OSCP - Achieved in 2022", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "oscp-logo.png", alt: "OSCP", className: "cert-logo" }) })] })] })] })] }));
};
const ExperienceView = () => (_jsxs("section", { id: "experience", className: "experience-view", children: [_jsx("h2", { children: "Work Experience" }), _jsxs("div", { children: [_jsx("h3", { children: "Job Title 1" }), _jsx("p", { children: "Company Name, Years" }), _jsxs("ul", { children: [_jsx("li", { children: "Responsibility 1" }), _jsx("li", { children: "Responsibility 2" })] })] })] }));
const ProjectsView = () => (_jsxs("section", { id: "projects", className: "projects-view", children: [_jsx("h2", { children: "Projects" }), _jsxs("div", { className: "project-item", children: [_jsx("h3", { children: "Project Title 1" }), _jsx("p", { children: "Brief description of the project." })] })] }));
const ResumeView = () => (_jsxs("section", { id: "resume", className: "resume-view", children: [_jsx("h2", { children: "Resume" }), _jsx("p", { children: "You can embed your resume here (e.g., using an iframe or a link to a PDF)." }), _jsx("p", { children: _jsx("a", { href: "/path/to/your/resume.pdf", children: "Download My Resume (PDF)" }) })] }));
const ContactsView = () => (_jsxs("section", { id: "contacts", className: "contacts-view", children: [_jsx("h2", { children: "Contacts" }), _jsx("p", { children: "Feel free to reach out to me through the following channels:" }), _jsxs("ul", { children: [_jsx("li", { children: "Email: your.email@example.com" }), _jsx("li", { children: "LinkedIn: your-linkedin-profile" }), _jsx("li", { children: "GitHub: your-github-profile" })] })] }));
const HeaderView = () => (_jsx("header", { className: "header-view", children: _jsx("h1", { children: "My Awesome Portfolio" }) }));
const HeroView = () => (_jsxs("section", { id: "hero", className: "hero-view", children: [_jsx("h2", { children: "Welcome!" }), _jsx("p", { children: "Brief intro text." })] }));
const FooterView = () => (_jsx("footer", { className: "footer-view", children: _jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " Your Name"] }) }));
export { LoadingView, AboutView, EducationView, ExperienceView, ProjectsView, ResumeView, ContactsView, HeaderView, HeroView, FooterView, };
