"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Compass, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTarotCards } from "@/app/hooks/useTarotCards";
import {
    chooseRandomCard,
    isReversed as getIsReversed,
} from "@/lib/chooseTarotCard";
import { three_card as positions } from "@/lib/reading-spread";
import { TarotCard } from "@/lib/type";

export default function ThreeCardReading() {
    const [cards, setCards] = useState<
        Array<{ card: TarotCard; isReversed: boolean } | null>
    >(Array(3).fill(null));
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
        setCards(Array(3).fill(null));
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
                            <Compass className="mr-2 inline-block h-6 w-6 text-mint-400" />
                            Past-Present-Future Reading
                            <Compass className="ml-2 inline-block h-6 w-6 text-mint-400" />
                        </h1>
                        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                        This classic three-card spread reveals influences from
                        your past, energies in your present, and potential
                        outcomes in your future.
                    </p>
                </header>

                <div className="mb-8 text-center">
                    <Button
                        onClick={startReading}
                        disabled={isReading && !isComplete}
                        className="group relative bg-mint-400 px-8 py-6 text-lg font-medium text-white hover:bg-mint-500"
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
                            <div className="relative mx-auto mb-8 h-[200px] w-full max-w-3xl">
                                {/* Decorative elements */}
                                <div className="absolute left-1/2 top-1/2 h-[180px] w-[80%] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed border-mint-200 opacity-30"></div>

                                {/* Star pattern */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-mint-300 opacity-20">
                                    <Star className="h-40 w-40" />
                                </div>

                                <div className="flex h-full items-center justify-center space-x-12">
                                    {positions.map((position, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center"
                                        >
                                            <AnimatePresence mode="wait">
                                                {currentStep === index ? (
                                                    <motion.div
                                                        key="drawing"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex h-40 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-mint-300 bg-white/50"
                                                    >
                                                        <p className="text-center text-sm text-mint-500">
                                                            Drawing...
                                                        </p>
                                                    </motion.div>
                                                ) : cards[index] ? (
                                                    <motion.div
                                                        key="card"
                                                        initial={{
                                                            rotateY: 180,
                                                        }}
                                                        animate={{ rotateY: 0 }}
                                                        transition={{
                                                            duration: 0.8,
                                                        }}
                                                        className="relative h-40 w-28 overflow-hidden rounded-2xl shadow-lg shadow-mint-200"
                                                        style={{
                                                            transform: cards[
                                                                index
                                                            ]?.isReversed
                                                                ? "rotate(180deg)"
                                                                : "rotate(0deg)",
                                                        }}
                                                    >
                                                        <Image
                                                            src={
                                                                cards[index]!
                                                                    .card
                                                                    .image ||
                                                                "/placeholder.svg"
                                                            }
                                                            alt={
                                                                cards[index]!
                                                                    .card.name
                                                            }
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="empty"
                                                        className="flex h-40 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-mint-300 bg-white/50"
                                                    >
                                                        <div className="text-center">
                                                            <p className="text-sm font-medium text-mint-500">
                                                                {position.name}
                                                            </p>
                                                            <p className="text-xs text-mint-400">
                                                                {index + 1}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

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

                                {/* Sparkles decoration */}
                                <div className="absolute -right-4 -top-4">
                                    <Sparkles className="h-8 w-8 text-mint-300 opacity-70" />
                                </div>
                                <div className="absolute -bottom-4 -left-4">
                                    <Sparkles className="h-8 w-8 text-mint-300 opacity-70" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                                        <div className="grid gap-6 md:grid-cols-[120px_1fr]">
                                            <div className="flex flex-col items-center">
                                                {cardData ? (
                                                    <>
                                                        <div
                                                            className="relative mb-2 h-40 w-28 overflow-hidden rounded-2xl shadow-lg shadow-mint-200"
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
                                                    <div className="flex h-40 w-28 items-center justify-center rounded-2xl bg-lavender-100/50">
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

                                                        <div className="rounded-xl bg-mint-100/50 p-3">
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

                                                        <div className="mt-3 rounded-xl bg-lavender-100/50 p-3">
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

                                                        <div className="mt-3">
                                                            <Link
                                                                href={`/cards/${cardData.card.id}`}
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full border-mint-300 text-mint-600 hover:bg-mint-100"
                                                                >
                                                                    Learn More
                                                                    About This
                                                                    Card
                                                                </Button>
                                                            </Link>
                                                        </div>
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
                                        This three-card spread reveals the
                                        journey from your past influences
                                        through your present situation and into
                                        potential future outcomes. Consider how
                                        these cards connect and tell a story.
                                    </p>
                                    <p className="text-lavender-500">
                                        Remember that the future card represents
                                        a potential outcome based on current
                                        energies, not a fixed destiny. Your
                                        choices and actions can influence how
                                        these energies manifest.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isReading && (
                    <div className="rounded-3xl bg-white/70 p-6 text-center shadow-md backdrop-blur-sm">
                        <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                            About the Past-Present-Future Spread
                        </h2>
                        <div className="mx-auto max-w-3xl">
                            <p className="mb-4 text-lavender-500">
                                The Past-Present-Future spread is one of the
                                most popular and versatile tarot spreads. It
                                provides a clear timeline of energies and
                                influences affecting your situation or question.
                            </p>

                            <div className="relative mx-auto mb-8 h-[200px] w-full max-w-3xl">
                                {/* Spread Diagram */}
                                <div className="absolute left-1/2 top-1/2 h-[180px] w-[80%] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed border-mint-200 opacity-30"></div>

                                <div className="flex h-full items-center justify-center space-x-12">
                                    {positions.map((position, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center"
                                        >
                                            <div className="flex h-40 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-mint-300 bg-white/50">
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-mint-500">
                                                        {position.name}
                                                    </p>
                                                    <p className="text-xs text-mint-400">
                                                        {index + 1}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-center text-xs font-medium text-pink-500">
                                                {position.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Sparkles decoration */}
                                <div className="absolute -right-4 -top-4">
                                    <Sparkles className="h-8 w-8 text-mint-300 opacity-70" />
                                </div>
                                <div className="absolute -bottom-4 -left-4">
                                    <Sparkles className="h-8 w-8 text-mint-300 opacity-70" />
                                </div>
                            </div>

                            <div className="mb-6 grid gap-4 md:grid-cols-3">
                                {positions.map((position, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl bg-mint-100/30 p-4"
                                    >
                                        <h3 className="mb-2 text-lg font-medium text-pink-500">
                                            {position.name}
                                        </h3>
                                        <p className="text-sm text-lavender-500">
                                            {position.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-lavender-500">
                                This spread is excellent for understanding how
                                past events have shaped your current situation
                                and how present energies might influence future
                                outcomes. It provides a narrative arc that can
                                offer clarity and perspective on your journey.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
