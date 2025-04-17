import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const ConsoleTyping = ({ lines, typingSpeed = 100, initialDelay = 1500, onTypingComplete, }) => {
    const [typedLines, setTypedLines] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLineContent, setCurrentLineContent] = useState('');
    useEffect(() => {
        if (currentIndex < lines.length) {
            const timer = setTimeout(() => {
                setCurrentLineContent(lines[currentIndex].substring(0, currentLineContent.length + 1));
            }, typingSpeed);
            return () => clearTimeout(timer);
        }
        else if (onTypingComplete) {
            onTypingComplete();
        }
    }, [currentIndex, lines, typingSpeed, onTypingComplete, currentLineContent]);
    useEffect(() => {
        if (currentLineContent) {
            setTypedLines((prevLines) => {
                const updatedLines = [...prevLines];
                if (updatedLines.length === currentIndex) {
                    updatedLines.push(currentLineContent);
                }
                else if (updatedLines[currentIndex] !== currentLineContent) {
                    updatedLines[currentIndex] = currentLineContent;
                }
                return updatedLines;
            });
            if (currentLineContent === lines[currentIndex]) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setCurrentLineContent('');
            }
        }
        else if (currentIndex === 0 && initialDelay) {
            const timer = setTimeout(() => {
                setCurrentIndex(1);
            }, initialDelay);
            return () => clearTimeout(timer);
        }
    }, [currentLineContent, currentIndex, lines, initialDelay]);
    return (_jsx("div", { className: "terminal-output", children: typedLines.map((line, index) => (_jsxs("p", { className: 'command-line', children: [line, _jsx("span", { className: 'blinking-cursor' })] }, index))) }));
};
const ConsoleOutput = ({ lines, initialDelay = 500, nextLineDelay = 500, onComplete, outputColor = '#00ff00', }) => {
    const [printedLines, setPrintedLines] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (currentIndex < lines.length) {
            const timer = setTimeout(() => {
                setPrintedLines((prevLines) => [...prevLines, lines[currentIndex]]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, currentIndex === 0 ? initialDelay : nextLineDelay);
            return () => clearTimeout(timer);
        }
        else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, lines, initialDelay, nextLineDelay, onComplete]);
    return (_jsx("div", { className: "terminal-output", children: printedLines.map((line, index) => (_jsx("p", { className: 'loading-line', children: line }, index))) }));
};
const ConsoleTypingWithBackspace = ({ texts, typingSpeed = 100, backspaceSpeed = 50, waitDuration = 1500, className, }) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState("typing");
    useEffect(() => {
        let timer;
        const currentText = texts[currentIndex % texts.length];
        if (phase === 'typing') {
            if (displayText.length < currentText.length) {
                timer = setTimeout(() => {
                    setDisplayText(prevText => prevText + currentText.charAt(prevText.length));
                }, typingSpeed);
            }
            else {
                setPhase('waiting');
                timer = setTimeout(() => {
                    setPhase('backspacing');
                }, waitDuration);
            }
        }
        else if (phase === 'backspacing') {
            if (displayText.length > 0) {
                timer = setTimeout(() => {
                    setDisplayText(prevText => prevText.slice(0, -1));
                }, backspaceSpeed);
            }
            else {
                setPhase('waiting');
                timer = setTimeout(() => {
                    setCurrentIndex(prevIndex => prevIndex + 1);
                    setPhase('typing');
                }, waitDuration);
            }
        }
        else if (phase === 'waiting') {
            timer = setTimeout(() => {
                if (displayText.length === 0) {
                    setPhase('typing');
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }
                else {
                    setPhase('backspacing');
                }
            }, waitDuration);
        }
        return () => clearTimeout(timer);
    }, [displayText, currentIndex, phase, texts, typingSpeed, backspaceSpeed, waitDuration]);
    return (_jsxs("span", { className: className, children: [displayText, _jsx("span", { className: "blinking-cursor" })] }));
};
const ConsoleSim = ({ commandLines, outputLines, initialDelay = 1000, typingSpeed = 50, outputInitialDelay = 500, outputNextLineDelay = 500, onComplete, }) => {
    const [loadingComplete, setLoadingComplete] = useState(false);
    const handleTypingComplete = () => {
        setTimeout(() => {
            setLoadingComplete(true);
            if (onComplete) {
                onComplete();
            }
        }, outputInitialDelay);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ConsoleTyping, { lines: commandLines, onTypingComplete: handleTypingComplete, initialDelay: initialDelay, typingSpeed: typingSpeed }), loadingComplete && (_jsx(ConsoleOutput, { lines: outputLines, initialDelay: 0, nextLineDelay: outputNextLineDelay, outputColor: "#00cc00", onComplete: () => { } }))] }));
};
export { ConsoleSim, ConsoleTyping, ConsoleOutput, ConsoleTypingWithBackspace };
