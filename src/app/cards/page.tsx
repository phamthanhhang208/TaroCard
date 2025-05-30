"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { TarotCard } from "@/lib/type";
import { useTarotCards } from "../hooks/useTarotCards";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion, AnimatePresence } from "framer-motion";

export default function CardLibrary() {
    const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const { data, isLoading, isSuccess } = useTarotCards();

    useEffect(() => {
        if (!isLoading && isSuccess) {
            setTarotCards(data);
        }
    }, [isLoading, isSuccess, data]);

    const filteredCards = tarotCards.filter((card) => {
        const matchesSearch =
            card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );

        if (filter === "all") return matchesSearch;
        if (filter === "major")
            return matchesSearch && card.arcana === "Major Arcana";
        if (filter === "minor")
            return matchesSearch && card.arcana === "Minor Arcana";
        if (filter === "cups") return matchesSearch && card.suit === "Cups";
        if (filter === "wands") return matchesSearch && card.suit === "Wands";
        if (filter === "swords") return matchesSearch && card.suit === "Swords";
        if (filter === "pentacles")
            return matchesSearch && card.suit === "Pentacles";

        return matchesSearch;
    });

    return (
        <main className="min-h-screen bg-gradient-to-b from-lavender-100 to-pink-100 text-pink-600">
            <div className="container mx-auto px-4 py-12">
                <header className="mb-12 text-center">
                    <h1 className="relative z-10 mb-4 inline-block text-4xl font-bold text-pink-500">
                        Tarot Card Library
                        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                        Explore all 78 magical tarot cards and discover their
                        meanings, symbolism, and guidance.
                    </p>
                </header>

                <div className="mb-8 rounded-3xl bg-white/70 p-6 shadow-md backdrop-blur-sm">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Search by card name or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-lavender-300 bg-white/80 text-pink-500 placeholder:text-lavender-400"
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <Select
                                value={filter}
                                onValueChange={setFilter}
                            >
                                <SelectTrigger className="border-lavender-300 bg-white/80 text-pink-500">
                                    <SelectValue placeholder="Filter cards" />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-pink-500">
                                    <SelectItem value="all">
                                        All Cards
                                    </SelectItem>
                                    <SelectItem value="major">
                                        Major Arcana
                                    </SelectItem>
                                    <SelectItem value="minor">
                                        Minor Arcana
                                    </SelectItem>
                                    <SelectItem value="cups">Cups</SelectItem>
                                    <SelectItem value="wands">Wands</SelectItem>
                                    <SelectItem value="swords">
                                        Swords
                                    </SelectItem>
                                    <SelectItem value="pentacles">
                                        Pentacles
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            onClick={() => {
                                setSearchTerm("");
                                setFilter("all");
                            }}
                            variant="outline"
                            className="border-lavender-300 text-lavender-500 hover:bg-lavender-100"
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                <AnimatePresence>
                    {isLoading && (
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
                    )}
                </AnimatePresence>

                {filteredCards.length > 0 && !isLoading ? (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredCards.map((card) => (
                            <Link
                                key={card.id}
                                href={`/cards/${card.id}`}
                            >
                                <Card className="h-full overflow-hidden rounded-2xl bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-200">
                                    <CardContent className="p-4">
                                        <div className="relative mx-auto mb-3 h-48 w-32 overflow-hidden rounded-xl">
                                            <Image
                                                src={
                                                    card.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={card.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="text-center text-lg font-medium text-pink-500">
                                            {card.name}
                                        </h3>
                                        <p className="text-center text-sm text-lavender-400">
                                            {card.arcana}
                                        </p>
                                        {card.suit && (
                                            <p className="text-center text-xs text-lavender-300">
                                                {card.suit}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border-2 border-dashed border-pink-300 bg-white/30 p-12 text-center">
                        <p className="text-xl text-pink-400">
                            No cards found matching your search criteria.
                        </p>
                        <Button
                            onClick={() => {
                                setSearchTerm("");
                                setFilter("all");
                            }}
                            variant="outline"
                            className="mt-4 border-lavender-300 text-lavender-500 hover:bg-lavender-100"
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}
