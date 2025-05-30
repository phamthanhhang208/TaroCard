"use client";

import { Sparkles, Star, Heart, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
    message?: string;
    size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
    message = "Loading...",
    size = "md",
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-12 w-12",
        lg: "h-16 w-16",
    };

    const iconSize = {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            {/* Spinning circle with floating icons */}
            <div className="relative">
                {/* Main spinning circle */}
                <motion.div
                    className={`${sizeClasses[size]} rounded-full border-4 border-pink-200 border-t-pink-500`}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />

                {/* Floating icons around the spinner */}
                <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                        y: [-2, 2, -2],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                >
                    <Sparkles className={`${iconSize[size]} text-yellow-400`} />
                </motion.div>

                <motion.div
                    className="absolute -bottom-2 -left-2"
                    animate={{
                        y: [2, -2, 2],
                        rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                >
                    <Star className={`${iconSize[size]} text-lavender-400`} />
                </motion.div>

                <motion.div
                    className="absolute -top-2 -left-2"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                >
                    <Heart className={`${iconSize[size]} text-pink-400`} />
                </motion.div>

                <motion.div
                    className="absolute -bottom-2 -right-2"
                    animate={{
                        x: [-1, 1, -1],
                        y: [1, -1, 1],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.3,
                    }}
                >
                    <Moon className={`${iconSize[size]} text-mint-400`} />
                </motion.div>
            </div>

            {/* Loading message with animated dots */}
            <div className="text-center">
                <motion.p
                    className="text-lg font-medium text-pink-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                >
                    {message}
                </motion.p>

                {/* Animated dots */}
                <div className="mt-2 flex justify-center space-x-1">
                    {[0, 1, 2].map((index) => (
                        <motion.span
                            key={index}
                            className="inline-block h-2 w-2 rounded-full bg-lavender-400"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: index * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function TarotLoadingCard() {
    return (
        <div className="relative mx-auto h-40 w-28 overflow-hidden rounded-xl shadow-md">
            <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-200 to-lavender-300 p-1"
                animate={{
                    background: [
                        "linear-gradient(to bottom right, rgb(251 207 232), rgb(196 181 253))",
                        "linear-gradient(to bottom right, rgb(196 181 253), rgb(167 243 208))",
                        "linear-gradient(to bottom right, rgb(167 243 208), rgb(251 207 232))",
                    ],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            >
                <div className="h-full w-full rounded-lg border-4 border-white/30 bg-gradient-to-br from-pink-300 to-lavender-400">
                    <div className="flex h-full items-center justify-center">
                        <motion.div
                            className="absolute h-20 w-20 rounded-full border-2 border-white/30 bg-white/10"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        >
                            <Star className="h-10 w-10 text-white/60" />
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                        <motion.div
                            className="mb-2 h-3 w-16 rounded-full bg-white/20"
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
