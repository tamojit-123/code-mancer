"use client";

import { motion } from "framer-motion";

const ChatThinking = () => {
    return (
        <div className="flex items-center space-x-1">
            {Array(3)
                .fill("")
                .map((_, index) => (
                    <motion.span
                        key={index}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: index * 0.2,
                        }}
                    />
                ))}
        </div>
    );
};

export default ChatThinking;
