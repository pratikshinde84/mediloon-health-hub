import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LiveTypingProps {
    text: string;
    speed?: number;
    className?: string;
    delayStart?: number;
}

export const LiveTyping: React.FC<LiveTypingProps> = ({
    text,
    speed = 40,
    className,
    delayStart = 0
}) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);
    const [started, setStarted] = useState(delayStart === 0);

    useEffect(() => {
        if (delayStart === 0) return;
        const t = setTimeout(() => setStarted(true), delayStart);
        return () => clearTimeout(t);
    }, [delayStart]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        setDisplayText('');
        setIsTyping(true);

        const typing = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prev => prev + text.charAt(i));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(typing);
            }
        }, speed);

        return () => clearInterval(typing);
    }, [text, speed, started]);

    useEffect(() => {
        if (!isTyping) {
            setShowCursor(false);
            return;
        }

        const cursor = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursor);
    }, [isTyping]);

    if (!started) return null;

    return (
        <span className={className}>
            {displayText}
            {isTyping && showCursor && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 align-middle"
                />
            )}
        </span>
    );
};
