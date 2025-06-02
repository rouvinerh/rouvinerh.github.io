export const LOADING_COMMAND = '$ ./load-portfolio';

export const LOADING_OUTPUT_LINES = [
    '[+] Parsing resume...',
    '[+] Showing certifications...',
    '[+] Displaying work experience...',
    '[+] Generating projects...',
    '[+] Loading my education...',
    '[+] Processing personal life...',
    '[+] Website loaded!'
];

export const ABOUT_PHRASES = [
    "a cybersecurity engineer.",
    "a CTF player.",
    "into Offensive Security.",
    "an InfoSec student.",
    "hacking for good."
];

export const ABOUT_DESCRIPTION = "Hello! I'm Rouvin, an InfoSec student from the National University of Singapore specialising in Offensive Security. ";

export const SOCIAL_LINKS = [
    {
        href: "https://linkedin.com/in/rouvinerh",
        tooltip: "LinkedIn",
        iconType: "linkedin"
    },
    {
        href: "https://github.com/rouvinerh",
        tooltip: "GitHub",
        iconType: "github"
    },
    {
        href: "https://rouvin.gitbook.io",
        tooltip: "Blog",
        iconType: "gitbook"
    }
];

export const CERTIFICATIONS = [
    {
        href: "https://credentials.offsec.com/8cf53528-7f84-458e-b035-9109ba5af955",
        tooltip: "OffSec Exploit Developer",
        imageSrc: "assets/logos/osed-logo.svg",
        alt: "OSED"
    },
    {
        href: "https://credentials.offsec.com/e0767f9c-9826-4eac-806b-d63258d28256",
        tooltip: "OffSec Web Expert",
        imageSrc: "assets/logos/oswe-logo.svg",
        alt: "OSWE"
    },
    {
        href: "https://www.credential.net/6d698072-51f3-43f7-83ac-27117c629a82",
        tooltip: "Certified Red Team Expert",
        imageSrc: "assets/logos/crte-logo.webp",
        alt: "CRTE"
    },
    {
        href: "https://eu.badgr.com/public/assertions/Ie7VP__qSp-9gAxdwyB1rw?identity__email=rouvinerh@gmail.com",
        tooltip: "Certified Red Team Operator",
        imageSrc: "assets/logos/crto-logo.png",
        alt: "CRTO"
    },
    {
        href: "https://www.credential.net/e1d80a61-7960-4164-ba82-bdba4292d50b#acc.nQho8jM2",
        tooltip: "OffSec Certified Professional",
        imageSrc: "assets/logos/oscp-logo.svg",
        alt: "OSCP"
    }
];

export const EDUCATION_DATA = {
    university: "National University of Singapore (NUS)",
    degree: "Bachelor of Computing in Information Security",
    expectedGraduation: "May 2026",
    gpa: "4.74 / 5.00",
    deansList: {
        href: "https://credentials.nus.edu.sg/fdfc9ff6-b90c-4e0c-a705-c6fc0ad6b678",
        tooltip: "Dean's List AY23/24 Semester 2",
        imageSrc: "assets/logos/dean-list-logo.png",
        alt: "DeanList"
    }
};

export const EXPERIENCE_DATA = [
    {
        role: 'OffSec Engineer Intern',
        company: 'PayPal',
        period: 'May 2025 — Present',
        description: "Triaging bug reports and product pentesting with PayPal's Offensive Security team.",
        logoSrc: 'assets/logos/paypal-logo.png',
    },
    {
        role: 'Security Researcher',
        company: 'Synack Red Team',
        period: 'May 2025 — Present',
        description: "Pentesting web and host targets on a freelance basis.",
        logoSrc: 'assets/logos/synack.webp',
    },
    {
        role: 'Cyber Instructor',
        company: 'DART',
        period: 'Mar 2024 — Present',
        description: 'Teaching cybersecurity to students as part of Cyber Youth programme.',
        logoSrc: 'assets/logos/dart-logo.jpg'
    },
    {
        role: 'Security Engineer Intern',
        company: 'Ascenda Loyalty',
        period: 'May 2024 - Aug 2024',
        description: 'Carried out white-box web application pentesting and with custom DAST tooling.',
        logoSrc: 'assets/logos/ascenda-logo.png',
    },
    {
        role: 'Attack Simulation Intern',
        company: 'Cyber Security Agency of Singapore',
        period: 'May 2023 - Aug 2023',
        description: 'Created Caldera adversary profiles and built Active Directory environments for running said profiles.',
        logoSrc: 'assets/logos/csa-logo.jpg',
    },
];

export const PROJECTS_DATA = [
    {
        title: '📚 Security Journal',
        description: 'Writing security blogs, about CTFs and all my security-related adventures.',
        imageSrc: 'assets/img/gitbook.png',
        link: 'https://rouvin.gitbook.io',
    },
    {
        title: '🐛 Bug Bounties',
        description: 'Hunting and reporting bugs on bug bounties and VDPs when free (and bored).',
        imageSrc: 'assets/img/xss.png',
        link: '#',
        isSpecial: true
    },
    {
        title: '💀 Malware Development',
        description: 'Learning evasion techniques and various methods of making calc.exe run with Maldev Academy.',
        imageSrc: 'assets/img/malwaredev.png',
        link: 'https://github.com/rouvinerh/Malware-Tech',
    },
    {
        title: '🖥️ CTFs + Boot2Root',
        description: 'Rooting machines on HackTheBox / Grabbing flags in CTFs.',
        imageSrc: 'assets/img/boot2root.png',
        link: 'https://app.hackthebox.com/profile/814999',
    },
];

export const BUG_POPUP_DATA = {
    caption: "The funniest thing I own:",
    imageSrc: "assets/img/best_tshirt.jpg",
    imageAlt: "Bug Hunter Mode"
};

export const RESUME_DATA = {
    pdfFile: '/assets/RouvinErh_CV.pdf',
    downloadFilename: 'RouvinErh_CV.pdf',
    defaultWidth: 793
};

export const TERMINAL_COMMANDS = {
    about: "whoami | certs && links",
    education: "grep 'uni' education.doc",
    experience: "tree experience.log",
    projects: "cat projects.txt | flip-card",
    resume: "./show-resume --download",
    life: "sh my-life.sh; sudo shutdown"
};

export const ANIMATION_CONFIG = {
    typingSpeed: 70,
    backspaceSpeed: 30,
    waitDuration: 1000,
    loadingTypingSpeed: 50,
    nextLineDelay: 450,
    skipButtonDelay: 50,
    loadingCompleteDelay: 1200
};

export const FOOTER_DATA = {
    name: "Rouvin Erh",
    email: "erhrouvin@gmail.com",
    linkedInUrl: "https://linkedin.com/in/rouvinerh",
    technologies: [
        {
            iconType: "typescript",
            url: "https://www.typescriptlang.org/",
            hover: "TypeScript"
        },
        {
            iconType: "react",
            url: "https://reactjs.org/",
            hover: "React"
        },
        {
            iconType: "vite",
            url: "https://vite.dev/",
            hover: "Vite"
        },
        {
            iconType: "claude",
            url: "https://claude.ai/",
            hover: "Claude AI"
        }
    ]
};

export const LIFE_CARD_INFO = [
    {
        type: "travel",
        title: "Travelling",
        image: "assets/img/travel.jpg",
        story: "When not at a desk, I love seeing the world. I've been to 25 countries and love making friends overseas. That's me in Iceland! "
    },
    {
        type: "canoe",
        title: "Canoeing",
        image: "assets/img/canoe.jpg", 
        story: "I've been canoeing since age 13. I was the previous Varsity Captain of NUS Canoeing, and have represented Singapore internationally in Vietnam and Portugal!"
    }
];