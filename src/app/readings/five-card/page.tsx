"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { five_card as positions } from "@/lib/reading-spread";
import { useTarotCards } from "@/app/hooks/useTarotCards";
import { TarotCard } from "@/lib/type";
import {
    chooseRandomCard,
    isReversed as getIsReversed,
} from "@/lib/chooseTarotCard";

export default function FiveCardReading() {
    const [cards, setCards] = useState<
        Array<{ card: TarotCard; isReversed: boolean } | null>
    >(Array(5).fill(null));
    const [isReading, setIsReading] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [isComplete, setIsComplete] = useState(false);
    const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
    const { data, isLoading, isSuccess } = useTarotCards();

    useEffect(() => {
        if (!isLoading && isSuccess) {
            setTarotCards(data);
        }
    }, [isLoading, isSuccess, data]);

    const startReading = () => {
        setIsReading(true);
        setCards(Array(5).fill(null));
        setCurrentStep(0);
        setIsComplete(false);

        startDrawing();
    };

    const startDrawing = () => {
        setCurrentStep(0);
    };

    useEffect(() => {
        if (currentStep < 0 || currentStep >= positions.length) return;

        const timer = setTimeout(() => {
            // Get available cards
            let availableCards = [...tarotCards];
            cards.forEach((cardData) => {
                if (cardData) {
                    availableCards = availableCards.filter(
                        (c) => c.id !== cardData.card.id
                    );
                }
            });

            const randomIndex = chooseRandomCard(availableCards.length);
            const randomCard = availableCards[randomIndex];
            const isReversed = getIsReversed();

            setCards((prevCards) => {
                const newCards = [...prevCards];
                newCards[currentStep] = { card: randomCard, isReversed };
                return newCards;
            });

            if (currentStep + 1 < positions.length) {
                setCurrentStep(currentStep + 1);
            } else {
                setIsComplete(true);
                setCurrentStep(-1);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [currentStep, cards, tarotCards]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-lavender-100 to-pink-100 text-pink-600">
            <div className="container mx-auto px-4 py-12">
                <Link href="/">
                    <Button
                        variant="ghost"
                        className="mb-6 text-lavender-500 hover:bg-lavender-100 hover:text-pink-500"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>

                <header className="mb-12 text-center">
                    <h1 className="relative z-10 mb-4 inline-block text-4xl font-bold text-pink-500">
                        Five Card Tarot Reading
                        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                        This magical spread provides insight into your past,
                        present, and future, as well as the underlying
                        influences and potential outcomes.
                    </p>
                </header>

                <div className="mb-8 text-center">
                    <Button
                        onClick={startReading}
                        disabled={(isReading && !isComplete) || isLoading}
                        className="bg-pink-400 px-8 py-6 text-lg font-medium text-white hover:bg-pink-500"
                    >
                        {isReading && !isComplete
                            ? "Reading in progress..."
                            : isComplete
                            ? "Start New Reading"
                            : "Begin Your Reading"}
                    </Button>
                </div>

                <AnimatePresence>
                    {isReading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-12 rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm"
                        >
                            <div className="relative mx-auto mb-8 h-[300px] w-full max-w-3xl">
                                {/* Magical Spread Layout */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                    <div className="relative h-[250px] w-[250px]">
                                        {/* Decorative elements */}
                                        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed border-pink-200 opacity-50"></div>
                                        <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-pink-200 opacity-30"></div>

                                        {/* Star pattern */}
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-yellow-400 opacity-20">
                                            <Star className="h-40 w-40" />
                                        </div>

                                        {/* Past - Top */}
                                        <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
                                            <CardPosition
                                                index={0}
                                                currentStep={currentStep}
                                                cardData={cards[0]}
                                            />
                                        </div>

                                        {/* Present - Center */}
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                            <CardPosition
                                                index={1}
                                                currentStep={currentStep}
                                                cardData={cards[1]}
                                            />
                                        </div>

                                        {/* Future - Bottom */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
                                            <CardPosition
                                                index={2}
                                                currentStep={currentStep}
                                                cardData={cards[2]}
                                            />
                                        </div>

                                        {/* Reason - Left */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 transform">
                                            <CardPosition
                                                index={3}
                                                currentStep={currentStep}
                                                cardData={cards[3]}
                                            />
                                        </div>

                                        {/* Potential - Right */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
                                            <CardPosition
                                                index={4}
                                                currentStep={currentStep}
                                                cardData={cards[4]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                {positions.map((position, index) => (
                                    <div
                                        key={index}
                                        className="text-center"
                                    >
                                        <h3 className="text-lg font-medium text-pink-500">
                                            {position.name}
                                        </h3>
                                        <p className="text-sm text-lavender-400">
                                            {position.description}
                                        </p>
                                        {cards[index] && (
                                            <p className="mt-2 text-center text-sm font-medium text-pink-500">
                                                {cards[index]!.card.name}{" "}
                                                {cards[index]!.isReversed
                                                    ? "(Rev)"
                                                    : ""}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-semibold text-pink-500">
                                Your Reading Interpretation
                            </h2>

                            {cards.map((cardData, index) => (
                                <Card
                                    key={index}
                                    className="rounded-3xl bg-white/80 text-pink-600 shadow-md backdrop-blur-sm"
                                >
                                    <CardContent className="p-6">
                                        <div className="grid gap-6 md:grid-cols-[100px_1fr]">
                                            <div className="flex flex-col items-center">
                                                {cardData ? (
                                                    <>
                                                        <div
                                                            className="relative mb-2 h-32 w-20 overflow-hidden rounded-xl shadow-md shadow-pink-200"
                                                            style={{
                                                                transform:
                                                                    cardData.isReversed
                                                                        ? "rotate(180deg)"
                                                                        : "rotate(0deg)",
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    cardData
                                                                        .card
                                                                        .image ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={
                                                                    cardData
                                                                        .card
                                                                        .name
                                                                }
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <p className="text-center text-xs font-medium text-pink-500">
                                                            {cardData.card.name}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <div className="flex h-32 w-20 items-center justify-center rounded-xl bg-lavender-100/50">
                                                        <p className="text-xs text-lavender-400">
                                                            Card missing
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                {cardData ? (
                                                    <>
                                                        <h3 className="mb-2 text-xl font-semibold text-pink-500">
                                                            {
                                                                positions[index]
                                                                    .name
                                                            }
                                                            :{" "}
                                                            {cardData.card.name}{" "}
                                                            {cardData.isReversed
                                                                ? "(Reversed)"
                                                                : ""}
                                                        </h3>
                                                        <p className="mb-4 text-lavender-500">
                                                            {cardData.isReversed
                                                                ? cardData.card
                                                                      .reversedMeaning
                                                                : cardData.card
                                                                      .uprightMeaning}
                                                        </p>

                                                        <div className="rounded-xl bg-lavender-100/50 p-3">
                                                            <h4 className="mb-1 font-medium text-pink-500">
                                                                Position Meaning
                                                            </h4>
                                                            <p className="text-sm text-lavender-400">
                                                                {
                                                                    positions[
                                                                        index
                                                                    ]
                                                                        .description
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="mt-3 rounded-xl bg-mint-100/50 p-3">
                                                            <h4 className="mb-1 font-medium text-pink-500">
                                                                Reflection
                                                            </h4>
                                                            <p className="text-sm text-lavender-400">
                                                                Consider:{" "}
                                                                {
                                                                    cardData
                                                                        .card
                                                                        .reflectionQuestions[0]
                                                                }
                                                            </p>
                                                        </div>
                                                        <Link
                                                            href={`/cards/${cardData.card.id}`}
                                                            className="text-xs text-lavender-400 hover:text-pink-400"
                                                        >
                                                            Learn more about
                                                            this card →
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <div className="rounded-xl bg-lavender-100/50 p-3">
                                                        <h4 className="mb-1 font-medium text-pink-500">
                                                            Position:{" "}
                                                            {
                                                                positions[index]
                                                                    .name
                                                            }
                                                        </h4>
                                                        <p className="text-sm text-lavender-400">
                                                            {
                                                                positions[index]
                                                                    .description
                                                            }
                                                        </p>
                                                        <p className="mt-2 text-sm text-pink-400">
                                                            Card data
                                                            unavailable
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <Card className="rounded-3xl bg-white/80 text-pink-600 shadow-md backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-xl font-semibold text-pink-500">
                                        Overall Reading Synthesis
                                    </h3>
                                    <p className="mb-4 text-lavender-500">
                                        This five-card spread reveals the
                                        journey from your past influences
                                        through your present situation and into
                                        potential future outcomes. The
                                        underlying causes and potential for
                                        growth provide additional context to
                                        help you navigate your path forward.
                                    </p>
                                    <p className="text-lavender-500">
                                        Take time to reflect on how these cards
                                        interact with each other. Notice any
                                        patterns, recurring themes, or
                                        contrasting energies that might provide
                                        deeper insight into your situation.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isReading && (
                    <div className="rounded-3xl bg-white/70 p-6 text-center shadow-md backdrop-blur-sm">
                        <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                            About the Five Card Spread
                        </h2>
                        <p className="mx-auto mb-6 max-w-3xl text-lavender-500">
                            The five card spread is a versatile and insightful
                            tarot reading that explores multiple dimensions of
                            your question or situation. Each position in the
                            spread reveals different aspects and energies at
                            play, providing a comprehensive overview and
                            guidance.
                        </p>

                        <div className="relative mx-auto mb-8 h-[300px] w-full max-w-3xl">
                            {/* Spread Diagram */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                <div className="relative h-[250px] w-[250px]">
                                    {/* Decorative elements */}
                                    <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed border-pink-200"></div>
                                    <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-pink-200 opacity-60"></div>

                                    {/* Star pattern */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-yellow-400 opacity-30">
                                        <Star className="h-40 w-40" />
                                    </div>

                                    {/* Past - Top */}
                                    <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
                                        <div className="flex h-24 w-16 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                            <div className="text-center">
                                                <p className="text-xs font-medium text-pink-500">
                                                    1
                                                </p>
                                                <p className="text-xs text-pink-400">
                                                    Past
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Present - Center */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                        <div className="flex h-24 w-16 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                            <div className="text-center">
                                                <p className="text-xs font-medium text-pink-500">
                                                    2
                                                </p>
                                                <p className="text-xs text-pink-400">
                                                    Present
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Future - Bottom */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
                                        <div className="flex h-24 w-16 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                            <div className="text-center">
                                                <p className="text-xs font-medium text-pink-500">
                                                    3
                                                </p>
                                                <p className="text-xs text-pink-400">
                                                    Future
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reason - Left */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 transform">
                                        <div className="flex h-24 w-16 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                            <div className="text-center">
                                                <p className="text-xs font-medium text-pink-500">
                                                    4
                                                </p>
                                                <p className="text-xs text-pink-400">
                                                    Reason
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Potential - Right */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
                                        <div className="flex h-24 w-16 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                            <div className="text-center">
                                                <p className="text-xs font-medium text-pink-500">
                                                    5
                                                </p>
                                                <p className="text-xs text-pink-400">
                                                    Potential
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connecting lines */}
                                    <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform">
                                        <svg
                                            width="100%"
                                            height="100%"
                                            viewBox="0 0 200 200"
                                            className="absolute"
                                        >
                                            <line
                                                x1="100"
                                                y1="0"
                                                x2="100"
                                                y2="200"
                                                stroke="#F9A8D4"
                                                strokeWidth="1"
                                                strokeDasharray="4"
                                            />
                                            <line
                                                x1="0"
                                                y1="100"
                                                x2="200"
                                                y2="100"
                                                stroke="#F9A8D4"
                                                strokeWidth="1"
                                                strokeDasharray="4"
                                            />
                                            <line
                                                x1="100"
                                                y1="100"
                                                x2="0"
                                                y2="100"
                                                stroke="#F9A8D4"
                                                strokeWidth="1"
                                                strokeDasharray="4"
                                            />
                                            <line
                                                x1="100"
                                                y1="100"
                                                x2="200"
                                                y2="100"
                                                stroke="#F9A8D4"
                                                strokeWidth="1"
                                                strokeDasharray="4"
                                            />
                                        </svg>
                                    </div>

                                    {/* Sparkles decoration */}
                                    <div className="absolute -right-4 -top-4">
                                        <Sparkles className="h-8 w-8 text-yellow-300 opacity-70" />
                                    </div>
                                    <div className="absolute -bottom-4 -left-4">
                                        <Sparkles className="h-8 w-8 text-yellow-300 opacity-70" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-5">
                            {positions.map((position, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl bg-lavender-100/50 p-4"
                                >
                                    <h3 className="mb-2 text-lg font-medium text-pink-500">
                                        {position.name}
                                    </h3>
                                    <p className="text-sm text-lavender-400">
                                        {position.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

// Helper component for card positions
function CardPosition({
    index,
    currentStep,
    cardData,
}: {
    index: number;
    currentStep: number;
    cardData: { card: TarotCard; isReversed: boolean } | null;
}) {
    return (
        <AnimatePresence mode="wait">
            {currentStep === index ? (
                <motion.div
                    key="drawing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-24 w-16 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50"
                >
                    <p className="text-center text-xs text-pink-400">
                        Drawing...
                    </p>
                </motion.div>
            ) : cardData ? (
                <motion.div
                    key="card"
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-24 w-16 overflow-hidden rounded-xl shadow-lg shadow-pink-200"
                    style={{
                        transform: cardData.isReversed
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                    }}
                >
                    <Image
                        src={cardData.card.image || "/placeholder.svg"}
                        alt={cardData.card.name}
                        fill
                        className="object-cover"
                    />
                </motion.div>
            ) : (
                <motion.div
                    key="empty"
                    className="flex h-24 w-16 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50"
                >
                    <p className="text-center text-xs text-pink-400">
                        {index + 1}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
