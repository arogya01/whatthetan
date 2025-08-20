import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
    text: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
}

export const useTypewriter = ({
    text,
    speed = 50,
    delay = 0,
    onComplete
}: UseTypewriterOptions) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!text) return;

        setDisplayText('');
        setCurrentIndex(0);
        setIsComplete(false);

        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    if (prevIndex >= text.length) {
                        clearInterval(interval);
                        setIsComplete(true);
                        onComplete?.();
                        return prevIndex;
                    }
                    return prevIndex + 1;
                });
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timer);
    }, [text, speed, delay, onComplete]);

    useEffect(() => {
        setDisplayText(text.slice(0, currentIndex));
    }, [currentIndex, text]);

    return { displayText, isComplete };
};
