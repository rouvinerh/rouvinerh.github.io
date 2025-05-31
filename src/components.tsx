import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGitbook } from "react-icons/si";
import { SOCIAL_LINKS, CERTIFICATIONS, BUG_POPUP_DATA } from './constants';

interface SocialLinkProps {
    href: string;
    tooltip: string;
    icon: React.ReactNode;
    className?: string;
}

interface CertificationProps {
    href: string;
    tooltip: string;
    imageSrc: string;
    alt: string;
}

interface TimelineItemProps {
    role: string;
    company: string;
    period: string;
    description: string;
    logoSrc: string;
    index: number;
    isVisible: boolean;
}

interface ProjectCardProps {
    title: string;
    description: string;
    imageSrc: string;
    link: string;
    index: number;
    isVisible: boolean;
    isFlipped: boolean;
    onFlip: () => void;
    onSpecialClick?: () => void;
}

interface TerminalBoxProps {
    children: React.ReactNode;
    className?: string;
    isVisible?: boolean;
}

interface BugImagePopupProps {
    isVisible: boolean;
    onClose: () => void;
}


export const SocialLink = ({ href, tooltip, icon, className = "social-icon" }: SocialLinkProps) => (
    <a href={href} className="social-tooltip" data-tooltip={tooltip} target="_blank" rel="noopener noreferrer">
        <div className={className}>
            {icon}
        </div>
    </a>
);

export const CertificationBadge = ({ href, tooltip, imageSrc, alt }: CertificationProps) => (
    <a href={href} className="social-tooltip" data-tooltip={tooltip} target="_blank" rel="noopener noreferrer">
        <img src={imageSrc} alt={alt} className="cert-logo" />
    </a>
);

export const TimelineItem = ({ role, company, period, description, logoSrc, index, isVisible }: TimelineItemProps) => (
    <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}>
        <div className="timeline-circle">
            {logoSrc && <img src={logoSrc} alt={`${company} logo`} />}
        </div>
        <div className="timeline-content">
            <span className="timeline-role">{role}</span>
            <span className="timeline-company">{company}</span>
            <span className="timeline-date">{period}</span>
            <span className="timeline-description">{description}</span>
        </div>
    </div>
);

export const ProjectCard = ({ 
    title, 
    description, 
    imageSrc, 
    link, 
    index, 
    isVisible, 
    isFlipped, 
    onFlip, 
    onSpecialClick 
}: ProjectCardProps) => {
    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onFlip();
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (onSpecialClick) {
            e.preventDefault();
            onSpecialClick();
        }
    };

    return (
        <div
            className={`flip-card ${isFlipped ? 'flipped' : ''} ${isVisible ? 'visible' : ''}`}
            onClick={handleCardClick}
            onMouseEnter={onFlip}
            onMouseLeave={onFlip}
            data-index={index}
        >
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h3 className="project-title">{title}</h3>
                </div>
                <div className="flip-card-back">
                    <div
                        className="card-image-banner"
                        style={{ backgroundImage: `url(${imageSrc})` }}
                    />
                    <div className="card-content-area">
                        <p className="project-description">{description}</p>
                        <a
                            href={link}
                            className="about-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleButtonClick}
                        >
                            About
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TerminalBox = ({ children, className = "", isVisible = true }: TerminalBoxProps) => (
    <div className={`terminal-box ${className} ${isVisible ? 'visible' : ''}`}>
        {children}
    </div>
);


export const BugImagePopup = ({ isVisible, onClose }: BugImagePopupProps) => (
    <div className={`bug-image-popup ${isVisible ? 'visible' : ''}`}>
        <p className="bug-image-caption">{BUG_POPUP_DATA.caption}</p>
        <img src={BUG_POPUP_DATA.imageSrc} alt={BUG_POPUP_DATA.imageAlt} />
        <button onClick={onClose} className="close-button">✖</button>
    </div>
);

export const SocialIconsContainer = () => {
    const getIcon = (iconType: string) => {
        switch (iconType) {
            case 'linkedin': return <FaLinkedin />;
            case 'github': return <FaGithub />;
            case 'gitbook': return <SiGitbook />;
            default: return null;
        }
    };

    return (
        <div className="social-icons-container">
            {SOCIAL_LINKS.map((link, index) => (
                <SocialLink 
                    key={index}
                    href={link.href} 
                    tooltip={link.tooltip} 
                    icon={getIcon(link.iconType)} 
                />
            ))}
        </div>
    );
};

export const CertificationsGrid = () => (
    <div className="cert-logos">
        {CERTIFICATIONS.map((cert, index) => (
            <CertificationBadge
                key={index}
                href={cert.href}
                tooltip={cert.tooltip}
                imageSrc={cert.imageSrc}
                alt={cert.alt}
            />
        ))}
    </div>
);
