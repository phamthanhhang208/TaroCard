import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function AboutTarot() {
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
                        About Tarot
                        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                        Discover the magical history, symbolism, and practice of
                        tarot card reading.
                    </p>
                </header>

                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="rounded-3xl bg-white/80 text-pink-600 shadow-md backdrop-blur-sm">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                                History of Tarot
                            </h2>
                            <p className="mb-3 text-lavender-500">
                                Tarot cards originated in the mid-15th century
                                in Europe, initially as playing cards used for
                                games. The earliest known decks came from
                                Northern Italy, with the oldest surviving cards
                                being the mid-15th century sets such as the
                                Visconti-Sforza deck, created for the Duke of
                                Milan&apos;s family.
                            </p>
                            <p className="mb-3 text-lavender-500">
                                It wasn&apos;t until the late 18th century that
                                tarot began to be widely used for divination and
                                spiritual purposes. Antoine Court de Gébelin, a
                                French occultist, was among the first to assign
                                mystical meanings to the cards in his work
                                &quot;Le Monde Primitif&quot; (1781), claiming
                                they contained the hidden wisdom of ancient
                                Egypt.
                            </p>
                            <p className="text-lavender-500">
                                The tarot gained further popularity in the late
                                19th and early 20th centuries with the rise of
                                organizations like the Hermetic Order of the
                                Golden Dawn and the publication of the
                                Rider-Waite-Smith deck in 1909, which remains
                                one of the most influential and widely used
                                tarot decks today.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl bg-white/80 text-pink-600 shadow-md backdrop-blur-sm">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                                Structure of the Tarot
                            </h2>
                            <p className="mb-3 text-lavender-500">
                                A traditional tarot deck consists of 78 cards
                                divided into two main groups:
                            </p>

                            <h3 className="mb-2 text-xl font-medium text-pink-500">
                                Major Arcana (22 cards)
                            </h3>
                            <p className="mb-4 text-lavender-500">
                                These cards represent significant life events,
                                karmic influences, and spiritual lessons. They
                                depict archetypal figures and situations that
                                reflect the human experience on a deeper level.
                                The Major Arcana tells the story of the
                                Fool&apos;s journey, symbolizing the path to
                                spiritual awareness and fulfillment.
                            </p>

                            <h3 className="mb-2 text-xl font-medium text-pink-500">
                                Minor Arcana (56 cards)
                            </h3>
                            <p className="mb-3 text-lavender-500">
                                These cards deal with everyday matters and are
                                divided into four suits:
                            </p>
                            <ul className="mb-4 list-inside list-disc text-lavender-500">
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Cups
                                    </span>{" "}
                                    - Emotions, relationships, intuition, love
                                    (associated with Water)
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Wands
                                    </span>{" "}
                                    - Energy, passion, creativity, inspiration
                                    (associated with Fire)
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Swords
                                    </span>{" "}
                                    - Intellect, thoughts, challenges, conflict
                                    (associated with Air)
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Pentacles
                                    </span>{" "}
                                    - Material world, work, finances, physical
                                    health (associated with Earth)
                                </li>
                            </ul>
                            <p className="text-lavender-500">
                                Each suit contains ten numbered cards (Ace
                                through Ten) and four court cards (Page, Knight,
                                Queen, and King).
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl bg-white/80 text-pink-600 shadow-md backdrop-blur-sm">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                                Reading Tarot Cards
                            </h2>
                            <p className="mb-3 text-lavender-500">
                                Tarot readings involve drawing cards and
                                interpreting their meanings in relation to a
                                specific question or situation. The cards are
                                typically arranged in patterns called
                                &quot;spreads,&quot; each position having a
                                specific meaning.
                            </p>

                            <h3 className="mb-2 text-xl font-medium text-pink-500">
                                Common Tarot Spreads
                            </h3>
                            <ul className="mb-4 list-inside list-disc text-lavender-500">
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Single Card
                                    </span>{" "}
                                    - For daily guidance or a quick answer
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Three-Card Spread
                                    </span>{" "}
                                    - Often representing past, present, and
                                    future
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Celtic Cross
                                    </span>{" "}
                                    - A comprehensive 10-card spread for complex
                                    situations
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Five-Card Spread
                                    </span>{" "}
                                    - Reveals different aspects of a situation
                                </li>
                            </ul>

                            <p className="mb-3 text-lavender-500">
                                Interpretation involves understanding both the
                                traditional meanings of each card and intuitive
                                insights that arise during the reading. The
                                position of the card, whether it appears upright
                                or reversed, and its relationship to other cards
                                in the spread all contribute to the overall
                                interpretation.
                            </p>

                            <p className="text-lavender-500">
                                Remember that tarot is a tool for
                                self-reflection and guidance rather than
                                fortune-telling. The cards don&apos;t predict a
                                fixed future but rather illuminate possibilities
                                and potential paths.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl bg-white/80 text-pink-600 shadow-md backdrop-blur-sm">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                                Tarot as a Spiritual Practice
                            </h2>
                            <p className="mb-3 text-lavender-500">
                                Beyond divination, tarot can be used as a tool
                                for personal growth, meditation, and spiritual
                                development. Many practitioners view the tarot
                                as a mirror that reflects the unconscious mind
                                and helps bring hidden thoughts, feelings, and
                                patterns to light.
                            </p>

                            <h3 className="mb-2 text-xl font-medium text-pink-500">
                                Ways to Use Tarot for Spiritual Growth
                            </h3>
                            <ul className="mb-4 list-inside list-disc text-lavender-500">
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Daily Card Practice
                                    </span>{" "}
                                    - Drawing a single card each morning for
                                    reflection
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Tarot Journaling
                                    </span>{" "}
                                    - Recording readings and insights to track
                                    patterns over time
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Meditation
                                    </span>{" "}
                                    - Using card imagery as a focus for
                                    meditation
                                </li>
                                <li>
                                    <span className="font-medium text-pink-400">
                                        Shadow Work
                                    </span>{" "}
                                    - Exploring challenging aspects of the self
                                    through specific cards
                                </li>
                            </ul>

                            <p className="text-lavender-500">
                                The journey with tarot is deeply personal. As
                                you develop your relationship with the cards,
                                you may find that certain cards speak to you in
                                unique ways or that your intuitive understanding
                                of the symbols evolves over time. Trust your
                                inner wisdom as you explore this ancient
                                practice.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <h2 className="mb-6 text-2xl font-semibold text-pink-500">
                        Begin Your Tarot Journey
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/cards">
                            <Button className="bg-pink-400 hover:bg-pink-500">
                                Explore the Cards
                            </Button>
                        </Link>
                        <Link href="/readings/five-card">
                            <Button className="bg-lavender-400 hover:bg-lavender-500">
                                Try a Reading
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
