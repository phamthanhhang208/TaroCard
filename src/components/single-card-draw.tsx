"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { tarotCards } from "@/lib/tarot-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star } from "lucide-react";
import { useTarotCards } from "@/app/hooks/useTarotCards";
import {
    chooseRandomCard,
    isReversed as getIsReversed,
} from "@/lib/chooseTarotCard";
import { TarotCard } from "@/lib/type";

export default function SingleCardDraw() {
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
            const randomCard = tarotCards[randomIndex];
            const cardIsReversed = getIsReversed();

            setCurrentCard(randomCard);
            setIsReversed(cardIsReversed);
            setIsDrawing(false);
        }, 1500);
    };

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
                <div className="relative mb-4 inline-block">
                    <h2 className="text-3xl font-bold text-pink-500">
                        <Star className="mr-2 inline-block h-6 w-6 text-yellow-400" />
                        Single Card Reading
                        <Star className="ml-2 inline-block h-6 w-6 text-yellow-400" />
                    </h2>
                    <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                </div>
                <p className="mb-6 text-lavender-500">
                    Draw a single card for a sprinkle of magical guidance for
                    your day or a specific question!
                </p>
                <Button
                    onClick={drawCard}
                    disabled={isDrawing}
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

            <AnimatePresence mode="wait">
                {isDrawing ? (
                    <motion.div
                        key="drawing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex h-80 items-center justify-center"
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
                        <Card className="overflow-hidden rounded-3xl bg-white/80 text-pink-600 shadow-lg backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            initial={{ rotateY: 180 }}
                                            animate={{ rotateY: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="relative mb-4 h-80 w-48 overflow-hidden rounded-2xl shadow-lg"
                                            style={{
                                                transform: isReversed
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)",
                                            }}
                                        >
                                            <Image
                                                src={
                                                    currentCard.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={currentCard.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.div>
                                        <div className="relative inline-block">
                                            <h3 className="text-center text-xl font-semibold text-pink-500">
                                                {currentCard.name}{" "}
                                                {isReversed ? "(Reversed)" : ""}
                                            </h3>
                                            <div className="absolute -bottom-2 left-0 right-0 h-2 rounded-full bg-mint-200 opacity-50"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <Tabs defaultValue="meaning">
                                            <TabsList className="mb-4 grid w-full grid-cols-2 bg-lavender-100">
                                                <TabsTrigger
                                                    value="meaning"
                                                    className="data-[state=active]:bg-lavender-300"
                                                >
                                                    Meaning
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="description"
                                                    className="data-[state=active]:bg-lavender-300"
                                                >
                                                    Description
                                                </TabsTrigger>
                                            </TabsList>
                                            <TabsContent
                                                value="meaning"
                                                className="rounded-2xl bg-lavender-100/50 p-4"
                                            >
                                                <h4 className="mb-2 flex items-center font-medium text-pink-500">
                                                    <Heart className="mr-2 h-4 w-4 text-peach-400" />
                                                    {isReversed
                                                        ? "Reversed Meaning"
                                                        : "Upright Meaning"}
                                                </h4>
                                                <p className="text-lavender-500">
                                                    {isReversed
                                                        ? currentCard.reversedMeaning
                                                        : currentCard.uprightMeaning}
                                                </p>
                                            </TabsContent>
                                            <TabsContent
                                                value="description"
                                                className="rounded-2xl bg-lavender-100/50 p-4"
                                            >
                                                <h4 className="mb-2 flex items-center font-medium text-pink-500">
                                                    <Star className="mr-2 h-4 w-4 text-yellow-400" />
                                                    Card Description
                                                </h4>
                                                <p className="text-lavender-500">
                                                    {currentCard.description}
                                                </p>
                                            </TabsContent>
                                        </Tabs>

                                        <div className="mt-4 rounded-2xl bg-mint-100/50 p-4">
                                            <h4 className="mb-2 flex items-center font-medium text-pink-500">
                                                <Sparkles className="mr-2 h-4 w-4 text-mint-400" />
                                                Reflection Questions
                                            </h4>
                                            <ul className="list-inside list-disc text-lavender-500">
                                                {currentCard.reflectionQuestions.map(
                                                    (question, index) => (
                                                        <li key={index}>
                                                            {question}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex h-80 items-center justify-center rounded-3xl border-2 border-dashed border-pink-300 bg-white/30"
                    >
                        <div className="text-center">
                            <p className="mb-2 text-xl text-pink-400">
                                Click the button above to draw your tarot card
                            </p>
                            <div className="flex justify-center space-x-2">
                                <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-pink-300 delay-75"></span>
                                <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-lavender-300 delay-150"></span>
                                <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-mint-300 delay-300"></span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
