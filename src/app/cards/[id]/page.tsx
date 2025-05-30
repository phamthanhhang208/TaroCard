"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useTarotCard } from "@/app/hooks/useTarotCards";
import { useEffect, useState } from "react";
import { TarotCard } from "@/lib/type";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function CardDetail() {
    const { id } = useParams();
    const [card, setCard] = useState<TarotCard>();
    const stringId = Array.isArray(id) ? id[0] : id ?? "";
    const { data, isLoading, isSuccess } = useTarotCard(stringId);

    useEffect(() => {
        if (!isLoading && isSuccess) {
            if (data) {
                setCard(data);
            } else {
                return notFound();
            }
        }
    }, [isLoading, isSuccess, data]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-lavender-100 to-pink-100 text-pink-600">
            <div className="container mx-auto px-4 py-12">
                <Link href="/cards">
                    <Button
                        variant="ghost"
                        className="mb-6 text-lavender-500 hover:bg-lavender-100 hover:text-pink-500"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Card Library
                    </Button>
                </Link>
                {isLoading ? (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-8"
                        >
                            <Card className="rounded-3xl bg-white/90 text-pink-600 shadow-md backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <LoadingSpinner
                                        message="Channeling cosmic energies and interpreting your cards..."
                                        size="lg"
                                    />
                                    <div className="mt-6 text-center">
                                        <p className="text-sm text-lavender-500">
                                            ✨ The universe is weaving together
                                            the meanings of your chosen cards ✨
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                        <div className="flex flex-col items-center">
                            <div className="relative mb-6 h-96 w-64 overflow-hidden rounded-2xl shadow-lg shadow-pink-200">
                                <Image
                                    src={card?.image || "/placeholder.svg"}
                                    alt={card?.name || "Tarot card image"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <h1 className="mb-2 text-center text-3xl font-bold text-pink-500">
                                {card?.name}
                            </h1>
                            <p className="mb-1 text-center text-lg text-lavender-400">
                                {card?.arcana}
                            </p>
                            {card?.suit && (
                                <p className="text-center text-lavender-300">
                                    {card?.suit}
                                </p>
                            )}
                            {card?.number && (
                                <p className="text-center text-lavender-300">
                                    Card {card?.number}
                                </p>
                            )}
                        </div>

                        <div>
                            <Card className="rounded-3xl bg-white/80 text-pink-600 shadow-lg backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <Tabs defaultValue="meanings">
                                        <TabsList className="mb-6 grid w-full grid-cols-3 bg-lavender-100">
                                            <TabsTrigger
                                                value="meanings"
                                                className="data-[state=active]:bg-lavender-300"
                                            >
                                                Meanings
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="description"
                                                className="data-[state=active]:bg-lavender-300"
                                            >
                                                Description
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="symbolism"
                                                className="data-[state=active]:bg-lavender-300"
                                            >
                                                Symbolism
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent
                                            value="meanings"
                                            className="space-y-6"
                                        >
                                            <div className="rounded-2xl bg-lavender-100/50 p-4">
                                                <h2 className="mb-3 text-xl font-semibold text-pink-500">
                                                    Upright Meaning
                                                </h2>
                                                <p className="text-lavender-500">
                                                    {card?.uprightMeaning}
                                                </p>
                                                <div className="mt-4">
                                                    <h3 className="mb-2 text-lg font-medium text-pink-500">
                                                        Keywords
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {card?.keywords.map(
                                                            (
                                                                keyword,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                    className="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-500"
                                                                >
                                                                    {keyword}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-2xl bg-lavender-100/50 p-4">
                                                <h2 className="mb-3 text-xl font-semibold text-pink-500">
                                                    Reversed Meaning
                                                </h2>
                                                <p className="text-lavender-500">
                                                    {card?.reversedMeaning}
                                                </p>
                                                <div className="mt-4">
                                                    <h3 className="mb-2 text-lg font-medium text-pink-500">
                                                        Reversed Keywords
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {card?.reversedKeywords.map(
                                                            (
                                                                keyword,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                    className="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-500"
                                                                >
                                                                    {keyword}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="description">
                                            <div className="rounded-2xl bg-mint-100/50 p-4">
                                                <h2 className="mb-3 text-xl font-semibold text-pink-500">
                                                    Card Description
                                                </h2>
                                                <p className="text-lavender-500">
                                                    {card?.description}
                                                </p>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="symbolism">
                                            <div className="rounded-2xl bg-peach-100/50 p-4">
                                                <h2 className="mb-3 text-xl font-semibold text-pink-500">
                                                    Symbolism & Imagery
                                                </h2>
                                                <p className="mb-4 text-lavender-500">
                                                    {card?.symbolism}
                                                </p>

                                                <h3 className="mb-2 text-lg font-medium text-pink-500">
                                                    Elements & Associations
                                                </h3>
                                                <ul className="mb-4 list-inside list-disc text-lavender-500">
                                                    {card?.associations.map(
                                                        (
                                                            association,
                                                            index
                                                        ) => (
                                                            <li key={index}>
                                                                {association}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    <div className="mt-6 rounded-2xl bg-yellow-100/50 p-4">
                                        <h2 className="mb-3 text-xl font-semibold text-pink-500">
                                            Reflection Questions
                                        </h2>
                                        <ul className="list-inside list-disc text-lavender-500">
                                            {card?.reflectionQuestions.map(
                                                (question, index) => (
                                                    <li key={index}>
                                                        {question}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
