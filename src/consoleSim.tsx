import React, { useState, useEffect } from 'react';

interface ConsoleTypingProps {
    lines: string[];
    typingSpeed?: number;
    initialDelay?: number;
    onTypingComplete?: () => void;
}

const ConsoleTyping: React.FC<ConsoleTypingProps> = ({
    lines,
    typingSpeed = 100,
    initialDelay = 1500,
    onTypingComplete,
}) => {
    const [typedLines, setTypedLines] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLineContent, setCurrentLineContent] = useState('');

    useEffect(() => {
        if (currentIndex < lines.length) {
            const timer = setTimeout(() => {
                setCurrentLineContent(lines[currentIndex].substring(0, currentLineContent.length + 1));
            }, typingSpeed);
            return () => clearTimeout(timer);
        } else if (onTypingComplete) {
            onTypingComplete();
        }
    }, [currentIndex, lines, typingSpeed, onTypingComplete, currentLineContent]);

    useEffect(() => {
        if (currentLineContent) {
            setTypedLines((prevLines) => {
                const updatedLines = [...prevLines];
                if (updatedLines.length === currentIndex) {
                    updatedLines.push(currentLineContent);
                } else if (updatedLines[currentIndex] !== currentLineContent) {
                    updatedLines[currentIndex] = currentLineContent;
                }
                return updatedLines;
            });
            if (currentLineContent === lines[currentIndex]) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setCurrentLineContent('');
            }
        } else if (currentIndex === 0 && initialDelay) {
            const timer = setTimeout(() => {
                setCurrentIndex(1);
            }, initialDelay);
            return () => clearTimeout(timer);
        }
    }, [currentLineContent, currentIndex, lines, initialDelay]);

    return (
        <div className="terminal-output">
            {typedLines.map((line, index) => (
                <p key={index} className={'command-line'}>
                    {line}<span className={'blinking-cursor'}></span>
                </p>
            ))}
        </div>
    );
};

interface ConsoleOutputProps {
    lines: string[];
    initialDelay?: number;
    nextLineDelay?: number;
    onComplete?: () => void;
    outputColor?: string;
}

const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
    lines,
    initialDelay = 500,
    nextLineDelay = 500,
    onComplete,
}) => {
    const [printedLines, setPrintedLines] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < lines.length) {
            const timer = setTimeout(() => {
                setPrintedLines((prevLines) => [...prevLines, lines[currentIndex]]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, currentIndex === 0 ? initialDelay : nextLineDelay);
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, lines, initialDelay, nextLineDelay, onComplete]);

    return (
        <div className="terminal-output">
            {printedLines.map((line, index) => (
                <p key={index} className={'loading-line'}>
                    {line}
                </p>
            ))}
        </div>
    );
};

interface ConsoleTypingWithBackspaceProps {
    texts: string[];
    typingSpeed?: number;
    backspaceSpeed?: number;
    waitDuration?: number;
    className?: string;
}

const ConsoleTypingWithBackspace: React.FC<ConsoleTypingWithBackspaceProps> = ({
    texts,
    typingSpeed = 100,
    backspaceSpeed = 50,
    waitDuration = 1500,
    className,
}) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState("typing");

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const currentText = texts[currentIndex % texts.length];
    
        if (phase === 'typing') {
            if (displayText.length < currentText.length) {
                timer = setTimeout(() => {
                    setDisplayText(prevText => prevText + currentText.charAt(prevText.length));
                }, typingSpeed);
            } else {
                setPhase('waiting');
                timer = setTimeout(() => {
                    setPhase('backspacing');
                }, waitDuration);
            }
        } else if (phase === 'backspacing') {
            if (displayText.length > 0) {
                timer = setTimeout(() => {
                    setDisplayText(prevText => prevText.slice(0, -1));
                }, backspaceSpeed);
            } else {
                setPhase('waiting');
                timer = setTimeout(() => {
                    setCurrentIndex(prevIndex => prevIndex + 1);
                    setPhase('typing');
                }, waitDuration);
            }
        } else if (phase === 'waiting') {
            timer = setTimeout(() => {
                if (displayText.length === 0) {
                    setPhase('typing');
                    setCurrentIndex(prevIndex => prevIndex + 1);
                } else {
                    setPhase('backspacing');
                }
            }, waitDuration);
        }
    
        return () => clearTimeout(timer);
    }, [displayText, currentIndex, phase, texts, typingSpeed, backspaceSpeed, waitDuration]);
    return (
        <span className={className}>
            {displayText}<span className="blinking-cursor"></span>
        </span>
    );
};

interface ConsoleSimProps {
    commandLines: string[];
    outputLines: string[];
    initialDelay?: number;
    typingSpeed?: number;
    outputInitialDelay?: number;
    outputNextLineDelay?: number;
    onComplete?: () => void;
}

const ConsoleSim: React.FC<ConsoleSimProps> = ({
    commandLines,
    outputLines,
    initialDelay = 1000,
    typingSpeed = 50,
    outputInitialDelay = 500,
    outputNextLineDelay = 500,
    onComplete,
}) => {
    const [loadingComplete, setLoadingComplete] = useState(false);

    const handleTypingComplete = () => {
        setTimeout(() => {
            setLoadingComplete(true);
            if (onComplete) {
                onComplete();
            }
        }, outputInitialDelay);
    };

    return (
        <>
            <ConsoleTyping
                lines={commandLines}
                onTypingComplete={handleTypingComplete}
                initialDelay={initialDelay}
                typingSpeed={typingSpeed}
            />
            {loadingComplete && (
                <ConsoleOutput
                    lines={outputLines}
                    initialDelay={0}
                    nextLineDelay={outputNextLineDelay}
                    outputColor="#00cc00"
                    onComplete={() => {}}
                />
            )}
        </>
    );
};

export { ConsoleSim, ConsoleTyping, ConsoleOutput, ConsoleTypingWithBackspace };