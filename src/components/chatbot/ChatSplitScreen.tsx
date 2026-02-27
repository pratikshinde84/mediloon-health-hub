import { useEffect, useState } from 'react';
import { useChatbotContext } from './ChatbotContext';
import { RightChatPanel } from './RightChatPanel';
import { LeftAIPanel } from './LeftAIPanel';

export function ChatSplitScreen() {
    const { isOpen, hasUserMessaged } = useChatbotContext();
    const [mounted, setMounted] = useState(false);

    // Mount handling for SSR/Hydration safety
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={`split-screen ${isOpen ? 'is-open' : ''}`}>
            <div className={`left-panel ${hasUserMessaged && isOpen ? 'active' : ''}`}>
                <LeftAIPanel />
            </div>
            <div className={`right-panel ${isOpen ? 'active' : ''}`}>
                <RightChatPanel />
            </div>
        </div>
    );
}
