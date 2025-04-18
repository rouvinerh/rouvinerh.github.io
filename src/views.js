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
    return (_jsxs("div", { className: "console-container", children: [_jsx("div", { className: "command-line", children: _jsx(ConsoleTyping, { lines: [commandLine], onTypingComplete: () => setTimeout(() => setShowOutput(true), 500), typingSpeed: 50 }) }), showOutput && !outputComplete && (_jsx(ConsoleOutput, { lines: outputLines, onComplete: () => {
                    setTimeout(() => {
                        setOutputComplete(true);
                        onLoadingComplete();
                    }, 1300);
                }, nextLineDelay: 500 })), _jsxs("button", { className: `skip-button ${skipButtonVisible ? 'visible' : ''}`, onClick: skipAnimation, children: ["./skip-animation", _jsx("span", { className: 'blinking-cursor' })] })] }));
}
function AboutView() {
    const aboutPhrases = [
        "a cybersecurity engineer.",
        "a CTF player.",
        "an Offensive Security guy.",
        "an InfoSec student."
    ];
    return (_jsxs("section", { id: "about", className: "about-view", children: [_jsx("h1", { className: "section-heading", children: "Rouvin Erh" }), _jsxs("p", { className: "about-subheading", children: ["I'm ", _jsx("span", { className: "typed-about-text", children: _jsx(ConsoleTypingWithBackspace, { texts: aboutPhrases, typingSpeed: 70, backspaceSpeed: 30, waitDuration: 1000 }) })] }), _jsxs("p", { id: "about-description", className: "terminal-box", children: ["whoami", _jsx("span", { className: 'blinking-cursor' }), _jsx("br", {}), "Hello, I'm Rouvin, a cybersecurity student from Singapore specialising in offensive security, and I love to break things."] }), _jsxs("div", { className: "social-icons-container", children: [_jsx("a", { href: "https://linkedin.com/in/rouvinerh", className: "social-tooltip", "data-tooltip": "LinkedIn", children: _jsx(FaLinkedin, { className: "social-icon" }) }), _jsx("a", { href: "https://github.com/rouvinerh", className: "social-tooltip", "data-tooltip": "GitHub", children: _jsx(FaGithub, { className: "social-icon" }) }), _jsx("a", { href: "https://rouvin.gitbook.io", className: "social-tooltip", "data-tooltip": "Blog", children: _jsx(SiGitbook, { className: "social-icon" }) })] })] }));
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
    return (_jsxs("section", { id: "education", ref: sectionRef, className: `education-view ${isVisible ? 'visible' : ''}`, children: [_jsxs("div", { className: "terminal-box", children: ["./education --uni --certs", _jsx("span", { className: 'blinking-cursor' })] }), _jsxs("div", { className: "education-split", children: [_jsxs("div", { className: "education-left", children: [_jsx("span", { className: "education-title", children: "National University of Singapore" }), _jsxs("div", { className: "college-details", children: [_jsx("span", { className: "degree", children: "Bachelor of Computing in Information Security" }), _jsx("span", { className: "college-description", children: "Expected Graduation: May 2026" }), _jsx("span", { className: "college-grade", children: "Current GPA: 4.71 / 5.00" })] }), _jsx("a", { href: "https://credentials.nus.edu.sg/fdfc9ff6-b90c-4e0c-a705-c6fc0ad6b678", className: "social-tooltip", "data-tooltip": "Dean's List AY23/24 Semester 2", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "dean-list-logo.png", alt: "DeanList", className: "cert-logo" }) })] }), _jsxs("div", { className: "education-right", children: [_jsx("span", { className: "education-title", children: "Certifications" }), _jsxs("div", { className: "cert-logos", children: [_jsx("a", { href: "https://credentials.offsec.com/8cf53528-7f84-458e-b035-9109ba5af955", className: "social-tooltip", "data-tooltip": "OSED - Achieved in 2025", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "osed-logo.png", alt: "OSED", className: "cert-logo" }) }), _jsx("a", { href: "https://credentials.offsec.com/e0767f9c-9826-4eac-806b-d63258d28256", className: "social-tooltip", "data-tooltip": "OSWE - Achieved in 2025", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "oswe-logo.png", alt: "OSWE", className: "cert-logo" }) }), _jsx("a", { href: "https://www.credential.net/6d698072-51f3-43f7-83ac-27117c629a82", className: "social-tooltip", "data-tooltip": "CRTE - Achieved in 2023", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "crte-logo.webp", alt: "CRTE", className: "cert-logo" }) }), _jsx("a", { href: "https://eu.badgr.com/public/assertions/Ie7VP__qSp-9gAxdwyB1rw?identity__email=rouvinerh@gmail.com", className: "social-tooltip", "data-tooltip": "CRTO - Achieved in 2023", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "crto-logo.png", alt: "CRTO", className: "cert-logo" }) }), _jsx("a", { href: "https://www.credential.net/e1d80a61-7960-4164-ba82-bdba4292d50b#acc.nQho8jM2", className: "social-tooltip", "data-tooltip": "OSCP - Achieved in 2022", target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: "oscp-logo.png", alt: "OSCP", className: "cert-logo" }) })] })] })] })] }));
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
        const animatedElements = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(animatedElements).indexOf(entry.target);
                    setVisibleItems((prev) => [...new Set([...prev, index])]);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const animatedElements = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(animatedElements).indexOf(entry.target);
                    setVisibleItems((prev) => [...new Set([...prev, index])]);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    return (_jsxs("section", { id: "experience", className: "experience-section", children: [_jsxs("div", { className: `terminal-box ${terminalVisible ? 'visible' : ''}`, children: ["./experience --list-all", _jsx("span", { className: "blinking-cursor" })] }), _jsx("div", { className: "timeline", children: experienceData.map((exp, index) => (_jsxs("div", { className: `timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${visibleItems.includes(index) ? 'visible' : ''}`, children: [_jsx("div", { className: "timeline-circle", children: exp.logoSrc && _jsx("img", { src: exp.logoSrc, alt: `${exp.company} logo` }) }), _jsxs("div", { className: "timeline-content", children: [_jsx("span", { className: "timeline-role", children: exp.role }), _jsx("span", { className: "timeline-company", children: exp.company }), _jsx("span", { className: "timeline-date", children: exp.period }), _jsx("span", { className: "timeline-description", children: exp.description })] })] }, index))) })] }));
};
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
export { LoadingView, AboutView, EducationView, ExperienceView,
// ProjectsView,
// ResumeView,
// ContactsView,
// HeaderView,
// HeroView,
// FooterView,
 };
