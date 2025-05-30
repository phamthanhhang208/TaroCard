"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Star, Cpu, RefreshCw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useTarotCards } from "@/app/hooks/useTarotCards";
import { isReversed as getIsReversed } from "@/lib/chooseTarotCard";
import { TarotCard } from "@/lib/type";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useGemini } from "@/app/hooks/useGemini";
import ReactMarkdown from "react-markdown";

export default function FreestyleReading() {
    const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
    const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<
        Array<{ card: TarotCard; isReversed: boolean }>
    >([]);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isRevealed, setIsRevealed] = useState(false);
    const [interpretation, setInterpretation] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [question, setQuestion] = useState("");

    const { data, isLoading, isSuccess } = useTarotCards();
    const mutation = useGemini();

    useEffect(() => {
        if (!isLoading && isSuccess) {
            setTarotCards(data);
        }
    }, [isLoading, isSuccess, data]);

    // Shuffle the deck once data is loaded
    useEffect(() => {
        if (tarotCards.length > 0) {
            shuffleDeck();
        }
    }, [tarotCards]);

    const shuffleDeck = () => {
        // Create a copy of the tarot cards and shuffle them
        const newDeck = [...tarotCards].sort(() => Math.random() - 0.5);
        setShuffledDeck(newDeck);
        // Reset selections when reshuffling
        setSelectedCards([]);
        setSelectedIndices([]);
        setIsRevealed(false);
        setInterpretation(null);
    };

    const handleCardSelect = (card: TarotCard, index: number) => {
        if (selectedCards.length >= 5 || selectedIndices.includes(index))
            return;

        const isReversed = getIsReversed();
        setSelectedCards([...selectedCards, { card, isReversed }]);
        setSelectedIndices([...selectedIndices, index]);
    };

    const revealCards = () => {
        setIsRevealed(true);
    };

    const generateInterpretation = () => {
        if (selectedCards.length === 0) return;

        setIsGenerating(true);

        mutation.mutate(
            { question: question, cards: selectedCards },
            {
                async onSuccess(data) {
                    const res = await data.json();

                    setInterpretation(res.reading);
                    setIsGenerating(false);
                },
            }
        );

        // Simulate AI processing time
        // setTimeout(() => {
        //     const interpretationText = generateMockAIInterpretation(
        //         selectedCards,
        //         question
        //     );
        //     setInterpretation(interpretationText);
        //     setIsGenerating(false);
        // }, 2000);
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
                            Freestyle Tarot Spread
                            <Star className="ml-2 inline-block h-6 w-6 text-yellow-400" />
                        </h1>
                        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                        Create your own custom spread by selecting up to 5
                        face-down cards, then get a magical AI-generated
                        interpretation!
                    </p>
                </header>

                <div className="mb-8 rounded-3xl bg-white/70 p-6 shadow-md backdrop-blur-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="show-question"
                                checked={showQuestion}
                                onCheckedChange={setShowQuestion}
                            />
                            <Label
                                htmlFor="show-question"
                                className="text-pink-500"
                            >
                                Add a question or intention
                            </Label>
                        </div>
                        <Button
                            onClick={shuffleDeck}
                            variant="outline"
                            className="border-lavender-200 text-lavender-500 hover:bg-lavender-100"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reshuffle Deck
                        </Button>
                    </div>

                    {showQuestion && (
                        <div className="mb-6">
                            <Textarea
                                placeholder="What question or intention would you like to focus on for this reading?"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="min-h-[100px] border-lavender-200 text-lavender-600 placeholder:text-lavender-300"
                            />
                        </div>
                    )}

                    <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                        Your Selected Cards
                    </h2>
                    {selectedCards.length === 0 ? (
                        <div className="mb-6 flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-white/30">
                            <div className="text-center">
                                <p className="mb-2 text-lg text-pink-400">
                                    Select up to 5 cards from the deck below
                                </p>
                                <p className="text-sm text-lavender-400">
                                    The cards are face down - trust your
                                    intuition!
                                </p>
                                <div className="mt-4 flex justify-center space-x-2">
                                    <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-pink-300 delay-75"></span>
                                    <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-lavender-300 delay-150"></span>
                                    <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-mint-300 delay-300"></span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-6">
                            <div className="flex flex-wrap justify-center gap-4">
                                {selectedCards.map((cardData, index) => (
                                    <div
                                        key={index}
                                        className="relative"
                                    >
                                        {isRevealed ? (
                                            <motion.div
                                                initial={{ rotateY: 180 }}
                                                animate={{ rotateY: 0 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: index * 0.2,
                                                }}
                                                className="relative h-40 w-28 overflow-hidden rounded-xl shadow-md"
                                                style={{
                                                    transform:
                                                        cardData.isReversed
                                                            ? "rotate(180deg)"
                                                            : "rotate(0deg)",
                                                }}
                                            >
                                                <Image
                                                    src={
                                                        cardData.card.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={cardData.card.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="relative h-40 w-28 overflow-hidden rounded-xl shadow-md">
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-200 to-lavender-300 p-1">
                                                    <div className="h-full w-full rounded-lg border-4 border-white/30 bg-gradient-to-br from-pink-300 to-lavender-400">
                                                        <div className="flex h-full items-center justify-center">
                                                            <div className="absolute h-20 w-20 rounded-full border-2 border-white/30 bg-white/10"></div>
                                                            <Star className="h-10 w-10 text-white/40" />
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                                                            <div className="mb-2 h-3 w-16 rounded-full bg-white/20"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Badge className="bg-white/80 text-pink-500">
                                                        {index + 1}
                                                    </Badge>
                                                </div>
                                            </div>
                                        )}
                                        {isRevealed && (
                                            <div className="mt-2 text-center">
                                                <p className="text-xs font-medium text-pink-500">
                                                    {cardData.card.name}{" "}
                                                    {cardData.isReversed
                                                        ? "(Rev)"
                                                        : ""}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-center space-x-4">
                                {!isRevealed ? (
                                    <Button
                                        onClick={revealCards}
                                        className="group relative bg-pink-400 px-6 py-2 text-white hover:bg-pink-500"
                                        disabled={selectedCards.length === 0}
                                    >
                                        <Check className="mr-2 h-4 w-4" />
                                        Done - Reveal Cards
                                        <span className="absolute -right-1 -top-1 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Sparkles className="h-4 w-4 text-yellow-300" />
                                        </span>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={generateInterpretation}
                                        disabled={isGenerating}
                                        className="group relative bg-pink-400 px-6 py-2 text-white hover:bg-pink-500"
                                    >
                                        <Cpu className="mr-2 h-4 w-4" />
                                        {isGenerating
                                            ? "Generating Interpretation..."
                                            : "Generate AI Interpretation"}
                                        <span className="absolute -right-1 -top-1 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Sparkles className="h-4 w-4 text-yellow-300" />
                                        </span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {isGenerating && (
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
                                                ✨ The universe is weaving
                                                together the meanings of your
                                                chosen cards ✨
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {interpretation && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-8"
                            >
                                <Card className="rounded-3xl bg-white/90 text-pink-600 shadow-md backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-pink-500">
                                                <Cpu className="mr-2 inline-block h-5 w-5 text-pink-400" />
                                                AI-Generated Interpretation
                                            </h3>
                                        </div>
                                        <div className="rounded-xl bg-lavender-50/50 p-4 text-lavender-500">
                                            <ReactMarkdown>
                                                {interpretation}
                                            </ReactMarkdown>
                                            {/* <p className="whitespace-pre-wrap">
                                                {interpretation}
                                            </p> */}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-pink-500">
                        Select Your Cards
                    </h2>
                    <Badge
                        variant="outline"
                        className="bg-white/50 text-pink-500"
                    >
                        {selectedCards.length}/5 cards selected
                    </Badge>
                </div>

                {/* Simple overlapping cards layout */}
                <div className="relative mx-auto mb-8 overflow-hidden rounded-3xl bg-white/30 p-4 shadow-inner backdrop-blur-sm">
                    <div className="card-spread-container mx-auto py-8">
                        <div className="relative h-[180px] w-full overflow-x-auto">
                            <div
                                className="absolute flex h-full"
                                style={{
                                    width: "max-content",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                }}
                            >
                                {shuffledDeck.map((card, index) => {
                                    const isSelected =
                                        selectedIndices.includes(index);
                                    const isDisabled =
                                        selectedCards.length >= 5 &&
                                        !isSelected;

                                    return (
                                        <div
                                            key={`${card.id}-${index}`}
                                            className="relative"
                                            style={{
                                                width: "60px",
                                                height: "90px",
                                                marginLeft:
                                                    index === 0 ? "0" : "-40px", // Overlap cards by 40px
                                                zIndex: index, // Keep original z-index regardless of selection
                                                cursor: isDisabled
                                                    ? "not-allowed"
                                                    : "pointer",
                                                opacity: isDisabled ? 0.5 : 1,
                                                transition:
                                                    "transform 0.2s ease",
                                            }}
                                            onClick={() =>
                                                !isSelected &&
                                                !isDisabled &&
                                                handleCardSelect(card, index)
                                            }
                                        >
                                            <div
                                                className="card-item absolute inset-0 hover:-translate-y-4 transition-transform"
                                                style={{
                                                    transformOrigin:
                                                        "bottom center",
                                                }}
                                            >
                                                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-200 to-lavender-300 p-0.5 shadow-md hover:shadow-lg">
                                                    <div className="h-full w-full rounded-md border-2 border-white/30 bg-gradient-to-br from-pink-300 to-lavender-400 flex items-center justify-center">
                                                        <div className="absolute h-8 w-8 rounded-full border border-white/30 bg-white/10"></div>
                                                        <Star className="h-4 w-4 text-white/40" />
                                                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                                                            <div className="mb-1 h-1 w-6 rounded-full bg-white/20"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <div
                                                        className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30"
                                                        style={{ zIndex: 10 }}
                                                    >
                                                        <Badge className="bg-white/80 text-pink-500">
                                                            {selectedIndices.indexOf(
                                                                index
                                                            ) + 1}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center text-sm text-lavender-500">
                    <p>
                        All 78 tarot cards are displayed in a row. Scroll
                        horizontally to see all cards and click to select.
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-lavender-500">
                        {selectedCards.length < 5
                            ? `Select ${5 - selectedCards.length} more card${
                                  5 - selectedCards.length !== 1 ? "s" : ""
                              } or click "Done" when you're ready`
                            : "You've selected 5 cards. Click 'Done' to reveal them!"}
                    </p>
                </div>
            </div>
        </main>
    );
}

// Mock AI interpretation generator
// function generateMockAIInterpretation(
//     selectedCards: Array<{ card: TarotCard; isReversed: boolean }>,
//     question: string
// ): string {
//     // Introduction based on number of cards
//     let interpretation = `✨ AI Tarot Interpretation ✨\n\n`;

//     if (question) {
//         interpretation += `Regarding your question: "${question}"\n\n`;
//     }

//     interpretation += `I've analyzed your ${selectedCards.length}-card spread and here's what the cards reveal:\n\n`;

//     // Card-specific interpretations
//     selectedCards.forEach((cardData, index) => {
//         const { card, isReversed } = cardData;
//         const position = index + 1;

//         interpretation += `🔮 Card ${position}: ${card.name} ${
//             isReversed ? "(Reversed)" : ""
//         }\n`;
//         interpretation += `This ${
//             isReversed ? "reversed" : "upright"
//         } card suggests ${
//             isReversed ? card.reversedMeaning : card.uprightMeaning
//         }\n\n`;
//     });

//     // Overall synthesis based on card combinations
//     interpretation += `✨ Overall Reading Synthesis ✨\n\n`;

//     // Check for patterns in the cards
//     const hasMajorArcana = selectedCards.some(
//         ({ card }) => card.arcana === "Major Arcana"
//     );
//     const suits = selectedCards.map(({ card }) => card.suit).filter(Boolean);
//     const uniqueSuits = [...new Set(suits)];
//     const reversedCount = selectedCards.filter(
//         ({ isReversed }) => isReversed
//     ).length;

//     // Generate synthesis based on patterns
//     if (hasMajorArcana) {
//         interpretation += `The presence of Major Arcana cards indicates significant life events or spiritual lessons are at play. This is a time of important growth and transformation.\n\n`;
//     }

//     if (uniqueSuits.length === 1 && suits.length > 1) {
//         const suit = uniqueSuits[0];
//         if (suit === "Cups") {
//             interpretation += `With a strong emphasis on Cups, emotions and relationships are central to this situation. Listen to your heart and nurture your connections with others.\n\n`;
//         } else if (suit === "Wands") {
//             interpretation += `The concentration of Wands energy suggests creativity, passion, and inspiration are key themes. This is a time to pursue your ambitions with enthusiasm.\n\n`;
//         } else if (suit === "Swords") {
//             interpretation += `The predominance of Swords indicates intellectual challenges and communication are important. Clear thinking and honest expression will help you navigate this situation.\n\n`;
//         } else if (suit === "Pentacles") {
//             interpretation += `With multiple Pentacles appearing, material concerns and practical matters are highlighted. Focus on building stability and nurturing your resources.\n\n`;
//         }
//     }

//     if (reversedCount > selectedCards.length / 2) {
//         interpretation += `With several reversed cards, there may be obstacles or internal resistance to overcome. This suggests a need to look inward and address what's blocking your progress.\n\n`;
//     } else if (reversedCount === 0 && selectedCards.length > 1) {
//         interpretation += `All cards appearing upright suggests a clear path forward with positive energy flowing. This is a favorable time to take action and embrace opportunities.\n\n`;
//     }

//     // Add a personalized conclusion
//     interpretation += `💖 Personal Guidance 💖\n\n`;
//     interpretation += `Based on these cards, I recommend taking time to reflect on ${selectedCards[0].card.reflectionQuestions[0].toLowerCase()} Trust your intuition as you move forward, and remember that you have the wisdom within to navigate this journey.\n\n`;

//     interpretation += `May these insights bring clarity and light to your path! ✨`;

//     return interpretation;
// }
