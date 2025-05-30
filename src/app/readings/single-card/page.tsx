"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Heart, Star, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    chooseRandomCard,
    isReversed as getIsReversed,
} from "@/lib/chooseTarotCard";

import { TarotCard } from "@/lib/type";

import { useTarotCards } from "@/app/hooks/useTarotCards";

export default function SingleCardReading() {
    const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);
    const [isReversed, setIsReversed] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);

    const { data, isLoading, isSuccess } = useTarotCards();

    useEffect(() => {
        if (!isLoading && isSuccess) {
            setTarotCards(data);
        }
    }, [isLoading, isSuccess, data]);

    const drawCard = () => {
        setIsDrawing(true);
        setCurrentCard(null);

        // Simulate card shuffling and drawing
        setTimeout(() => {
            const randomIndex = chooseRandomCard();
            //Math.floor(Math.random() * tarotCards.length);
            //chooseRandomCard()
            //Math.floor(Math.random() * tarotCards.length);
            const randomCard = tarotCards[randomIndex];
            const cardIsReversed = getIsReversed();
            //Math.random() > 0.5;

            setCurrentCard(randomCard);
            setIsReversed(cardIsReversed);
            setIsDrawing(false);
        }, 1500);
    };

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
                            <Star className="mr-2 inline-block h-6 w-6 text-yellow-400" />
                            Single Card Reading
                            <Star className="ml-2 inline-block h-6 w-6 text-yellow-400" />
                        </h1>
                        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                        Draw a single card for a delicate whisper of guidance
                        for your day or a specific question in your heart.
                    </p>
                </header>

                <div className="relative mx-auto mb-12 max-w-md">
                    {/* Decorative elements */}
                    <div className="absolute -left-4 -top-4 -z-10 h-20 w-20 rounded-full bg-lavender-200 opacity-40 blur-xl"></div>
                    <div className="absolute -bottom-4 -right-4 -z-10 h-20 w-20 rounded-full bg-pink-200 opacity-40 blur-xl"></div>

                    <div className="mb-8 text-center">
                        <Button
                            onClick={drawCard}
                            disabled={isDrawing || isLoading}
                            className="group relative bg-pink-400 px-8 py-6 text-lg font-medium text-white hover:bg-pink-500"
                        >
                            <span className="relative z-10">
                                {isDrawing
                                    ? "Drawing..."
                                    : currentCard
                                    ? "Draw Another Card"
                                    : "Draw Your Card"}
                            </span>
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 transform transition-all group-hover:rotate-45">
                                <Sparkles className="h-5 w-5" />
                            </span>
                        </Button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {isDrawing ? (
                        <motion.div
                            key="drawing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex h-[500px] items-center justify-center"
                        >
                            <div className="text-xl text-lavender-500">
                                <div className="flex items-center space-x-2">
                                    <span>Shuffling the deck</span>
                                    <span className="inline-block animate-bounce delay-75">
                                        ✨
                                    </span>
                                    <span className="inline-block animate-bounce delay-150">
                                        ✨
                                    </span>
                                    <span className="inline-block animate-bounce delay-300">
                                        ✨
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ) : currentCard ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mx-auto max-w-4xl">
                                <div className="relative">
                                    {/* Decorative elements */}
                                    <div className="absolute -left-10 -top-10 -z-10 h-40 w-40 rounded-full bg-lavender-200 opacity-20 blur-xl"></div>
                                    <div className="absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full bg-pink-200 opacity-20 blur-xl"></div>

                                    <Card className="overflow-hidden rounded-3xl bg-white/90 text-pink-600 shadow-lg backdrop-blur-sm">
                                        <CardContent className="p-8">
                                            <div className="grid gap-12 md:grid-cols-2">
                                                <div className="flex flex-col items-center">
                                                    <div className="relative mb-6">
                                                        <div className="absolute -left-6 -top-6 -z-10 h-full w-full rounded-full bg-yellow-100 opacity-50 blur-sm"></div>
                                                        <motion.div
                                                            initial={{
                                                                rotateY: 180,
                                                            }}
                                                            animate={{
                                                                rotateY: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.8,
                                                            }}
                                                            className="relative h-96 w-64 overflow-hidden rounded-2xl shadow-lg"
                                                            style={{
                                                                transform:
                                                                    isReversed
                                                                        ? "rotate(180deg)"
                                                                        : "rotate(0deg)",
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    currentCard.image ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={
                                                                    currentCard.name
                                                                }
                                                                fill
                                                                className="object-cover"
                                                            />

                                                            {/* Card border decoration */}
                                                            <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/20"></div>
                                                        </motion.div>
                                                    </div>

                                                    <div className="relative inline-block">
                                                        <h3 className="text-center text-2xl font-semibold text-pink-500">
                                                            {currentCard.name}{" "}
                                                            {isReversed
                                                                ? "(Reversed)"
                                                                : ""}
                                                        </h3>
                                                        <div className="absolute -bottom-2 left-0 right-0 h-2 rounded-full bg-mint-200 opacity-50"></div>
                                                    </div>

                                                    <p className="mt-2 text-center text-sm text-lavender-400">
                                                        {currentCard.arcana}{" "}
                                                        {currentCard.suit
                                                            ? `• ${currentCard.suit}`
                                                            : ""}
                                                    </p>

                                                    <div className="mt-4 flex justify-center space-x-2">
                                                        <span className="inline-block h-2 w-2 rounded-full bg-pink-300"></span>
                                                        <span className="inline-block h-2 w-2 rounded-full bg-lavender-300"></span>
                                                        <span className="inline-block h-2 w-2 rounded-full bg-mint-300"></span>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="rounded-2xl bg-lavender-100/50 p-5">
                                                        <h4 className="mb-3 flex items-center font-medium text-pink-500">
                                                            <Heart className="mr-2 h-5 w-5 text-peach-400" />
                                                            {isReversed
                                                                ? "Reversed Meaning"
                                                                : "Upright Meaning"}
                                                        </h4>
                                                        <p className="text-lavender-500">
                                                            {isReversed
                                                                ? currentCard.reversedMeaning
                                                                : currentCard.uprightMeaning}
                                                        </p>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            {(isReversed
                                                                ? currentCard.reversedKeywords
                                                                : currentCard.keywords
                                                            ).map(
                                                                (
                                                                    keyword,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="rounded-full bg-white/50 px-3 py-1 text-xs text-pink-500"
                                                                    >
                                                                        {
                                                                            keyword
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="rounded-2xl bg-mint-100/50 p-5">
                                                        <h4 className="mb-3 flex items-center font-medium text-pink-500">
                                                            <Star className="mr-2 h-5 w-5 text-yellow-400" />
                                                            Card Description
                                                        </h4>
                                                        <p className="text-lavender-500">
                                                            {
                                                                currentCard.description
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="rounded-2xl bg-peach-100/50 p-5">
                                                        <h4 className="mb-3 flex items-center font-medium text-pink-500">
                                                            <Moon className="mr-2 h-5 w-5 text-lavender-400" />
                                                            Reflection Questions
                                                        </h4>
                                                        <ul className="list-inside list-disc text-lavender-500">
                                                            {currentCard.reflectionQuestions.map(
                                                                (
                                                                    question,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="mb-2"
                                                                    >
                                                                        {
                                                                            question
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>

                                                    <div className="mt-6 flex justify-between">
                                                        <Link
                                                            href={`/cards/${currentCard.id}`}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                className="border-2 border-lavender-300 text-lavender-500 hover:bg-lavender-100"
                                                            >
                                                                Learn More
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mx-auto max-w-lg"
                        >
                            <div className="relative">
                                <div className="absolute -left-10 -top-10 -z-10 h-40 w-40 rounded-full bg-lavender-200 opacity-20 blur-xl"></div>
                                <div className="absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full bg-pink-200 opacity-20 blur-xl"></div>

                                <div className="flex h-[400px] items-center justify-center rounded-3xl border-2 border-dashed border-pink-300 bg-white/30">
                                    <div className="text-center">
                                        <div className="mb-4 flex justify-center">
                                            <div className="relative h-32 w-24 rounded-xl border-2 border-pink-200 bg-white/50 p-2">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Star className="h-10 w-10 text-yellow-300 opacity-30" />
                                                </div>
                                                <div className="absolute bottom-2 left-0 right-0 text-center">
                                                    <p className="text-xs text-pink-400">
                                                        Your Card
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mb-2 text-xl text-pink-400">
                                            Focus on your question
                                        </p>
                                        <p className="text-sm text-lavender-400">
                                            Click the button above to draw your
                                            tarot card
                                        </p>
                                        <div className="mt-4 flex justify-center space-x-2">
                                            <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-pink-300 delay-75"></span>
                                            <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-lavender-300 delay-150"></span>
                                            <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-mint-300 delay-300"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 rounded-3xl bg-white/70 p-6 text-center shadow-md backdrop-blur-sm">
                                <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                                    How to Use a Single Card Reading
                                </h2>
                                <div className="mx-auto max-w-3xl">
                                    <p className="mb-4 text-lavender-500">
                                        A single card reading offers gentle
                                        guidance for daily reflection or a
                                        specific question. Here&apos;s how to
                                        make the most of your reading:
                                    </p>
                                    <ol className="mb-6 list-inside list-decimal text-left text-lavender-500">
                                        <li className="mb-2">
                                            Take a moment to center yourself
                                            with a few deep breaths
                                        </li>
                                        <li className="mb-2">
                                            Focus on your question or set an
                                            intention for guidance
                                        </li>
                                        <li className="mb-2">
                                            Click the &quot;Draw Your Card&quot;
                                            button with your question in mind
                                        </li>
                                        <li className="mb-2">
                                            Reflect on how the card&apos;s
                                            meaning relates to your situation
                                        </li>
                                        <li>
                                            Consider the reflection questions to
                                            deepen your understanding
                                        </li>
                                    </ol>
                                    <p className="text-lavender-500">
                                        Remember that the cards offer gentle
                                        whispers of guidance and perspective,
                                        but you always hold the power to shape
                                        your own path.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
