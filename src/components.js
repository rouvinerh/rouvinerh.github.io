import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGitbook } from "react-icons/si";
import { SOCIAL_LINKS, CERTIFICATIONS, BUG_POPUP_DATA } from './constants';
export const SocialLink = ({ href, tooltip, icon, className = "social-icon" }) => (_jsx("a", { href: href, className: "social-tooltip", "data-tooltip": tooltip, target: "_blank", rel: "noopener noreferrer", children: _jsx("div", { className: className, children: icon }) }));
export const CertificationBadge = ({ href, tooltip, imageSrc, alt }) => (_jsx("a", { href: href, className: "social-tooltip", "data-tooltip": tooltip, target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { src: imageSrc, alt: alt, className: "cert-logo" }) }));
export const TimelineItem = ({ role, company, period, description, logoSrc, index, isVisible }) => (_jsxs("div", { className: `timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`, children: [_jsx("div", { className: "timeline-circle", children: logoSrc && _jsx("img", { src: logoSrc, alt: `${company} logo` }) }), _jsxs("div", { className: "timeline-content", children: [_jsx("span", { className: "timeline-role", children: role }), _jsx("span", { className: "timeline-company", children: company }), _jsx("span", { className: "timeline-date", children: period }), _jsx("span", { className: "timeline-description", children: description })] })] }));
export const ProjectCard = ({ title, description, imageSrc, link, index, isVisible, isFlipped, onFlip, onSpecialClick }) => (_jsx("div", { className: `flip-card ${isFlipped ? 'flipped' : ''} ${isVisible ? 'visible' : ''}`, onMouseEnter: onFlip, onMouseLeave: onFlip, "data-index": index, children: _jsxs("div", { className: "flip-card-inner", children: [_jsx("div", { className: "flip-card-front", children: _jsx("h3", { className: "project-title", children: title }) }), _jsxs("div", { className: "flip-card-back", children: [_jsx("div", { className: "card-image-banner", style: { backgroundImage: `url(${imageSrc})` } }), _jsxs("div", { className: "card-content-area", children: [_jsx("p", { className: "project-description", children: description }), _jsx("a", { href: link, className: "about-button", target: "_blank", rel: "noopener noreferrer", onClick: (e) => {
                                    e.stopPropagation();
                                    if (onSpecialClick) {
                                        e.preventDefault();
                                        onSpecialClick();
                                    }
                                }, children: "About" })] })] })] }) }));
export const TerminalBox = ({ children, className = "", isVisible = true }) => (_jsx("div", { className: `terminal-box ${className} ${isVisible ? 'visible' : ''}`, children: children }));
export const BugImagePopup = ({ isVisible, onClose }) => (_jsxs("div", { className: `bug-image-popup ${isVisible ? 'visible' : ''}`, children: [_jsx("p", { className: "bug-image-caption", children: BUG_POPUP_DATA.caption }), _jsx("img", { src: BUG_POPUP_DATA.imageSrc, alt: BUG_POPUP_DATA.imageAlt }), _jsx("button", { onClick: onClose, className: "close-button", children: "\u2716" })] }));
export const SocialIconsContainer = () => {
    const getIcon = (iconType) => {
        switch (iconType) {
            case 'linkedin': return _jsx(FaLinkedin, {});
            case 'github': return _jsx(FaGithub, {});
            case 'gitbook': return _jsx(SiGitbook, {});
            default: return null;
        }
    };
    return (_jsx("div", { className: "social-icons-container", children: SOCIAL_LINKS.map((link, index) => (_jsx(SocialLink, { href: link.href, tooltip: link.tooltip, icon: getIcon(link.iconType) }, index))) }));
};
export const CertificationsGrid = () => (_jsx("div", { className: "cert-logos", children: CERTIFICATIONS.map((cert, index) => (_jsx(CertificationBadge, { href: cert.href, tooltip: cert.tooltip, imageSrc: cert.imageSrc, alt: cert.alt }, index))) }));
