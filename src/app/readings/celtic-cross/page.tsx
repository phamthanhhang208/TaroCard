"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Star, Flower } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { celtic_cross as positions } from "@/lib/reading-spread";
import { TarotCard } from "@/lib/type";
import { useTarotCards } from "@/app/hooks/useTarotCards";
import {
    chooseRandomCard,
    isReversed as getIsReversed,
} from "@/lib/chooseTarotCard";

export default function CelticCrossReading() {
    const [cards, setCards] = useState<
        Array<{ card: TarotCard; isReversed: boolean } | null>
    >(Array(10).fill(null));
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
        setCards(Array(10).fill(null));
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
    }, [currentStep, tarotCards, cards]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-lavender-100 to-pink-100 text-pink-600">
            <div className="container mx-auto px-4 py-12">
                <Link href="/readings">
                    <Button
                        variant="ghost"
                        className="mb-6 text-lavender-500 hover:bg-lavender-100 hover:text-pink-500"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Readings
                    </Button>
                </Link>

                <header className="mb-12 text-center">
                    <div className="relative mx-auto mb-4 inline-block">
                        <h1 className="text-4xl font-bold text-pink-500">
                            <Flower className="mr-2 inline-block h-6 w-6 text-yellow-400" />
                            Celtic Cross Reading
                            <Flower className="ml-2 inline-block h-6 w-6 text-yellow-400" />
                        </h1>
                        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                        The Celtic Cross is a comprehensive 10-card spread that
                        provides deep insight into complex situations, examining
                        multiple aspects and influences.
                    </p>
                </header>

                <div className="mb-8 text-center">
                    <Button
                        onClick={startReading}
                        disabled={(isReading && !isComplete) || isLoading}
                        className="group relative bg-yellow-400 px-8 py-6 text-lg font-medium text-white hover:bg-yellow-500"
                    >
                        <span className="relative z-10">
                            {isReading && !isComplete
                                ? "Reading in progress..."
                                : isComplete
                                ? "Start New Reading"
                                : "Begin Your Reading"}
                        </span>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 transform transition-all group-hover:rotate-45">
                            <Sparkles className="h-5 w-5" />
                        </span>
                    </Button>
                </div>

                <AnimatePresence>
                    {isReading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-12 rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm"
                        >
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
                                <div className="relative mx-auto h-[400px] w-[300px]">
                                    {/* Decorative elements */}
                                    <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed border-yellow-200 opacity-30"></div>
                                    <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-yellow-200 opacity-20"></div>

                                    {/* Star decoration */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-yellow-300 opacity-10">
                                        <Star className="h-60 w-60" />
                                    </div>

                                    {/* Celtic Cross Layout */}
                                    {/* Center Cross */}
                                    <div className="absolute left-[125px] top-[150px] z-10">
                                        <CardPosition
                                            index={0}
                                            currentStep={currentStep}
                                            cardData={cards[0]}
                                            size="sm"
                                        />
                                    </div>
                                    <div
                                        className="absolute left-[125px] top-[150px] z-0"
                                        style={{ transform: "rotate(90deg)" }}
                                    >
                                        <CardPosition
                                            index={1}
                                            currentStep={currentStep}
                                            cardData={cards[1]}
                                            size="sm"
                                        />
                                    </div>

                                    {/* Staff */}
                                    <div className="absolute left-[125px] top-[50px]">
                                        <CardPosition
                                            index={2}
                                            currentStep={currentStep}
                                            cardData={cards[2]}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="absolute left-[125px] top-[250px]">
                                        <CardPosition
                                            index={3}
                                            currentStep={currentStep}
                                            cardData={cards[3]}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="absolute left-[225px] top-[150px]">
                                        <CardPosition
                                            index={4}
                                            currentStep={currentStep}
                                            cardData={cards[4]}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="absolute left-[25px] top-[150px]">
                                        <CardPosition
                                            index={5}
                                            currentStep={currentStep}
                                            cardData={cards[5]}
                                            size="sm"
                                        />
                                    </div>

                                    {/* Staff on right */}
                                    <div className="absolute right-[0px] top-[50px]">
                                        <CardPosition
                                            index={6}
                                            currentStep={currentStep}
                                            cardData={cards[6]}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="absolute right-[0px] top-[125px]">
                                        <CardPosition
                                            index={7}
                                            currentStep={currentStep}
                                            cardData={cards[7]}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="absolute right-[0px] top-[200px]">
                                        <CardPosition
                                            index={8}
                                            currentStep={currentStep}
                                            cardData={cards[8]}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="absolute right-[0px] top-[275px]">
                                        <CardPosition
                                            index={9}
                                            currentStep={currentStep}
                                            cardData={cards[9]}
                                            size="sm"
                                        />
                                    </div>

                                    {/* Sparkles decoration */}
                                    <div className="absolute -right-4 -top-4">
                                        <Sparkles className="h-8 w-8 text-yellow-300 opacity-70" />
                                    </div>
                                    <div className="absolute -bottom-4 -left-4">
                                        <Sparkles className="h-8 w-8 text-yellow-300 opacity-70" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-xl font-semibold text-pink-500">
                                        Card Positions
                                    </h3>
                                    <div className="grid gap-2">
                                        {positions.map((position, index) => (
                                            <div
                                                key={index}
                                                className={`rounded-xl p-2 ${
                                                    currentStep === index
                                                        ? "bg-yellow-200/50 text-yellow-600"
                                                        : cards[index]
                                                        ? "bg-lavender-100/50 text-lavender-500"
                                                        : "bg-white/30 text-lavender-400"
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="mr-2 font-medium">
                                                            {index + 1}.{" "}
                                                            {position.name}
                                                        </span>
                                                        <span className="text-xs">
                                                            {
                                                                position.description
                                                            }
                                                        </span>
                                                    </div>
                                                    {cards[index] && (
                                                        <div className="text-right text-xs">
                                                            {
                                                                cards[index]!
                                                                    .card.name
                                                            }{" "}
                                                            {cards[index]!
                                                                .isReversed
                                                                ? "(Rev)"
                                                                : ""}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                                Your Celtic Cross Reading
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                {cards.map((cardData, index) => (
                                    <Card
                                        key={index}
                                        className="rounded-3xl bg-white/80 text-pink-600 shadow-md backdrop-blur-sm"
                                    >
                                        <CardContent className="p-4">
                                            <div className="grid gap-4 md:grid-cols-[80px_1fr]">
                                                <div className="flex flex-col items-center">
                                                    {cardData ? (
                                                        <>
                                                            <div
                                                                className="relative mb-2 h-28 w-20 overflow-hidden rounded-xl shadow-lg shadow-yellow-200"
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
                                                                {
                                                                    cardData
                                                                        .card
                                                                        .name
                                                                }
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <div className="flex h-28 w-20 items-center justify-center rounded-xl bg-lavender-100/50">
                                                            <p className="text-xs text-lavender-400">
                                                                Card missing
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    {cardData ? (
                                                        <>
                                                            <h3 className="mb-1 text-lg font-semibold text-pink-500">
                                                                {index + 1}.{" "}
                                                                {
                                                                    positions[
                                                                        index
                                                                    ].name
                                                                }
                                                            </h3>
                                                            <p className="mb-1 text-xs text-lavender-400">
                                                                {
                                                                    positions[
                                                                        index
                                                                    ]
                                                                        .description
                                                                }
                                                            </p>
                                                            <p className="mb-2 text-sm text-lavender-500">
                                                                <span className="font-medium text-pink-400">
                                                                    {
                                                                        cardData
                                                                            .card
                                                                            .name
                                                                    }{" "}
                                                                    {cardData.isReversed
                                                                        ? "(Reversed)"
                                                                        : ""}
                                                                    :
                                                                </span>{" "}
                                                                {cardData.isReversed
                                                                    ? cardData
                                                                          .card
                                                                          .reversedMeaning
                                                                    : cardData
                                                                          .card
                                                                          .uprightMeaning}
                                                            </p>

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
                                                                    positions[
                                                                        index
                                                                    ].name
                                                                }
                                                            </h4>
                                                            <p className="text-sm text-lavender-400">
                                                                {
                                                                    positions[
                                                                        index
                                                                    ]
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
                            </div>

                            <Card className="rounded-3xl bg-white/80 text-pink-600 shadow-md backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-xl font-semibold text-pink-500">
                                        Reading Synthesis
                                    </h3>
                                    <p className="mb-4 text-lavender-500">
                                        The Celtic Cross provides a
                                        comprehensive view of your situation
                                        from multiple angles. The central cross
                                        reveals the core of your question, while
                                        the staff on the right shows the
                                        progression of energies and influences.
                                    </p>
                                    <p className="text-lavender-500">
                                        Consider how these cards interact with
                                        each other. Look for patterns in suits,
                                        numbers, or card types. Pay special
                                        attention to the relationship between
                                        your challenges (position 2) and advice
                                        (position 7), as well as between your
                                        hopes/fears (position 9) and the outcome
                                        (position 10).
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isReading && (
                    <div className="rounded-3xl bg-white/70 p-6 text-center shadow-md backdrop-blur-sm">
                        <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                            About the Celtic Cross Spread
                        </h2>
                        <div className="mx-auto max-w-3xl">
                            <p className="mb-4 text-lavender-500">
                                The Celtic Cross is one of the most detailed and
                                insightful tarot spreads, providing a
                                comprehensive overview of a situation from
                                multiple perspectives. This 10-card spread
                                examines past influences, present circumstances,
                                future possibilities, and hidden factors.
                            </p>

                            <div className="relative mx-auto mb-8 h-[300px] w-full max-w-3xl">
                                {/* Spread Diagram */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                    <div className="relative h-[250px] w-[250px]">
                                        {/* Decorative elements */}
                                        <div className="absolute left-1/2 top-1/2 h-[350px] w-[250px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed border-yellow-200"></div>

                                        {/* Center Cross */}
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                            <div className="relative">
                                                <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                    <div className="text-center">
                                                        <p className="text-xs font-medium text-pink-500">
                                                            1
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className="absolute left-0 top-0 flex h-20 w-14 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50"
                                                    style={{
                                                        transform:
                                                            "rotate(90deg) translate(-50%, -50%)",
                                                    }}
                                                >
                                                    <div className="text-center">
                                                        <p className="text-xs font-medium text-pink-500">
                                                            2
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Staff */}
                                        <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
                                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-xs font-medium text-pink-500">
                                                        3
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
                                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-xs font-medium text-pink-500">
                                                        4
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
                                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-xs font-medium text-pink-500">
                                                        5
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 transform">
                                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-xs font-medium text-pink-500">
                                                        6
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Staff on right */}
                                        <div className="absolute right-[-50px] top-[30px]">
                                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-xs font-medium text-pink-500">
                                                        7
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute right-[-50px] top-[90px]">
                                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-xs font-medium text-pink-500">
                                                        8
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute right-[-50px] top-[150px]">
                                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-xs font-medium text-pink-500">
                                                        9
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute right-[-50px] top-[210px]">
                                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-xs font-medium text-pink-500">
                                                        10
                                                    </p>
                                                </div>
                                            </div>
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

                            <p className="mb-6 text-lavender-500">
                                Due to its complexity, the Celtic Cross is ideal
                                for in-depth questions and situations that
                                require nuanced understanding. It is
                                particularly useful when you need to understand
                                multiple factors affecting a situation or
                                decision.
                            </p>

                            <div className="mb-4 grid gap-2 text-left md:grid-cols-2 lg:grid-cols-3">
                                {positions.map((position, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl bg-white/50 p-3"
                                    >
                                        <h3 className="text-sm font-medium text-pink-500">
                                            {index + 1}. {position.name}
                                        </h3>
                                        <p className="text-xs text-lavender-400">
                                            {position.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
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
    size = "md",
}: {
    index: number;
    currentStep: number;
    cardData: { card: TarotCard; isReversed: boolean } | null;
    size?: "sm" | "md" | "lg";
}) {
    const sizeClasses = {
        sm: "h-24 w-16",
        md: "h-32 w-24",
        lg: "h-40 w-32",
    };

    return (
        <AnimatePresence mode="wait">
            {currentStep === index ? (
                <motion.div
                    key="drawing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${sizeClasses[size]} items-center justify-center rounded-xl border-2 border-dashed border-yellow-300 bg-white/50`}
                >
                    <p className="text-center text-xs text-yellow-600">
                        Drawing...
                    </p>
                </motion.div>
            ) : cardData ? (
                <motion.div
                    key="card"
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`relative ${sizeClasses[size]} overflow-hidden rounded-xl shadow-lg shadow-yellow-200`}
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
                    className={`flex ${sizeClasses[size]} items-center justify-center rounded-xl border-2 border-dashed border-yellow-300 bg-white/50`}
                >
                    <p className="text-center text-xs text-yellow-600">
                        {index + 1}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
