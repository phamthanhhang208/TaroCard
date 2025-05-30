import Link from "next/link";
import { Button } from "@/components/ui/button";
import SingleCardDraw from "@/components/single-card-draw";
import { Sparkles, Star, Heart, Moon, Compass, Flower } from "lucide-react";

export default function Home() {
    return (
        <>
            <main className="min-h-screen bg-gradient-to-b from-lavender-100 to-pink-100 text-pink-600">
                <div className="container mx-auto px-4 py-12">
                    <header className="mb-12 text-center">
                        <div className="relative mx-auto mb-4 inline-block">
                            <h1 className="relative z-10 text-5xl font-bold tracking-tight text-pink-500">
                                TaroCard
                                <span className="ml-2 inline-block animate-bounce">
                                    <Sparkles className="h-8 w-8 text-yellow-400" />
                                </span>
                            </h1>
                            <div className="absolute -bottom-2 left-0 right-0 h-4 rounded-full bg-mint-200 opacity-50"></div>
                        </div>
                        <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                            Discover magical insights into your past, present,
                            and future with our super cute tarot readings!
                        </p>
                    </header>

                    <div className="mb-16">
                        <SingleCardDraw />
                    </div>

                    <section className="mb-16 rounded-3xl bg-white/70 p-8 shadow-lg backdrop-blur-sm">
                        <h2 className="mb-6 text-center text-3xl font-semibold text-pink-500">
                            <Star className="mr-2 inline-block h-6 w-6 text-yellow-400" />
                            Magical Readings
                            <Star className="ml-2 inline-block h-6 w-6 text-yellow-400" />
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                            {/* Single Card Reading */}
                            <div className="rounded-2xl bg-lavender-100 p-6 text-center shadow-md transition-transform hover:scale-105">
                                <div className="mb-2 flex justify-center">
                                    <Moon className="h-10 w-10 text-lavender-400" />
                                </div>
                                <h3 className="mb-3 text-2xl font-medium text-lavender-500">
                                    Single Card
                                </h3>
                                <p className="mb-4 text-pink-400">
                                    A quick glimpse of guidance for your day or
                                    a specific question.
                                </p>
                                <Link href="/readings/single-card">
                                    <Button className="bg-lavender-400 font-medium hover:bg-lavender-500">
                                        Start Reading
                                    </Button>
                                </Link>
                            </div>

                            {/* Three Card Reading */}
                            <div className="rounded-2xl bg-mint-100 p-6 text-center shadow-md transition-transform hover:scale-105">
                                <div className="mb-2 flex justify-center">
                                    <Compass className="h-10 w-10 text-mint-400" />
                                </div>
                                <h3 className="mb-3 text-2xl font-medium text-lavender-500">
                                    Past-Present-Future
                                </h3>
                                <p className="mb-4 text-pink-400">
                                    Explore your timeline with this classic
                                    three-card spread.
                                </p>
                                <Link href="/readings/three-card">
                                    <Button className="bg-mint-400 font-medium hover:bg-mint-500">
                                        Start Reading
                                    </Button>
                                </Link>
                            </div>

                            {/* Five Card Reading */}
                            <div className="rounded-2xl bg-peach-100 p-6 text-center shadow-md transition-transform hover:scale-105">
                                <div className="mb-2 flex justify-center">
                                    <Heart className="h-10 w-10 text-peach-400" />
                                </div>
                                <h3 className="mb-3 text-2xl font-medium text-lavender-500">
                                    Five Card Spread
                                </h3>
                                <p className="mb-4 text-pink-400">
                                    A detailed reading revealing multiple
                                    aspects of your situation.
                                </p>
                                <Link href="/readings/five-card">
                                    <Button className="bg-peach-400 font-medium hover:bg-peach-500">
                                        Start Reading
                                    </Button>
                                </Link>
                            </div>

                            {/* Celtic Cross */}
                            <div className="rounded-2xl bg-yellow-100 p-6 text-center shadow-md transition-transform hover:scale-105">
                                <div className="mb-2 flex justify-center">
                                    <Flower className="h-10 w-10 text-yellow-400" />
                                </div>
                                <h3 className="mb-3 text-2xl font-medium text-lavender-500">
                                    Celtic Cross
                                </h3>
                                <p className="mb-4 text-pink-400">
                                    Our most comprehensive reading for complex
                                    situations.
                                </p>
                                <Link href="/readings/celtic-cross">
                                    <Button className="bg-yellow-400 font-medium hover:bg-yellow-500">
                                        Start Reading
                                    </Button>
                                </Link>
                            </div>

                            {/* Freestyle Reading */}
                            <div className="rounded-2xl bg-pink-100 p-6 text-center shadow-md transition-transform hover:scale-105">
                                <div className="mb-2 flex justify-center">
                                    <Sparkles className="h-10 w-10 text-pink-400" />
                                </div>
                                <h3 className="mb-3 text-2xl font-medium text-lavender-500">
                                    Freestyle
                                </h3>
                                <p className="mb-4 text-pink-400">
                                    Create your own spread with AI-powered
                                    interpretation.
                                </p>
                                <Link href="/readings/freestyle">
                                    <Button className="bg-pink-400 font-medium hover:bg-pink-500">
                                        Start Reading
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Link href="/readings">
                                <Button
                                    variant="outline"
                                    className="border-2 border-pink-300 text-pink-500 hover:bg-pink-100"
                                >
                                    View All Reading Types
                                </Button>
                            </Link>
                        </div>
                    </section>

                    <div className="grid gap-6 md:grid-cols-3">
                        <section className="rounded-3xl bg-white/70 p-6 text-center shadow-lg backdrop-blur-sm">
                            <div className="mb-2 flex justify-center">
                                <Moon className="h-10 w-10 text-lavender-400" />
                            </div>
                            <h3 className="mb-3 text-2xl font-medium text-lavender-500">
                                Card Library
                            </h3>
                            <p className="mb-4 text-pink-400">
                                Explore our adorable tarot deck and discover the
                                meaning behind each magical card!
                            </p>
                            <Link href="/cards">
                                <Button className="bg-lavender-400 font-medium hover:bg-lavender-500">
                                    Browse Cards
                                </Button>
                            </Link>
                        </section>

                        <section className="rounded-3xl bg-white/70 p-6 text-center shadow-lg backdrop-blur-sm">
                            <div className="mb-2 flex justify-center">
                                <Star className="h-10 w-10 text-yellow-400" />
                            </div>
                            <h3 className="mb-3 text-2xl font-medium text-lavender-500">
                                Learn About Tarot
                            </h3>
                            <p className="mb-4 text-pink-400">
                                Discover the history and meaning behind tarot
                                readings and how to interpret them.
                            </p>
                            <Link href="/about">
                                <Button className="bg-yellow-400 font-medium hover:bg-yellow-500">
                                    Learn More
                                </Button>
                            </Link>
                        </section>
                    </div>

                    <section className="relative mt-16 rounded-3xl bg-white/70 p-8 text-center shadow-lg backdrop-blur-sm">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                            <div className="inline-block rounded-full bg-yellow-200 px-6 py-2 text-sm font-medium text-pink-500 shadow-md">
                                ✨ Magical Journey ✨
                            </div>
                        </div>
                        <h2 className="mb-4 pt-4 text-2xl font-semibold text-pink-500">
                            Begin Your Spiritual Adventure
                        </h2>
                        <p className="mb-6 text-lavender-500">
                            Whether you are looking for guidance, clarity, or
                            just curious about what the cards have to say, our
                            super cute tarot readings are here to light up your
                            path!
                        </p>

                        <div className="mt-8 flex justify-center space-x-2">
                            <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-pink-300 delay-75"></span>
                            <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-lavender-300 delay-150"></span>
                            <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-mint-300 delay-300"></span>
                            <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-peach-300 delay-75"></span>
                            <span className="inline-block h-3 w-3 animate-bounce rounded-full bg-yellow-300 delay-150"></span>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
