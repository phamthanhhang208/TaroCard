import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowLeft,
    Moon,
    Compass,
    Heart,
    Flower,
    Sparkles,
} from "lucide-react";

export default function ReadingsPage() {
    const readings = [
        {
            id: "single-card",
            name: "Single Card Reading",
            description:
                "Draw a single card for daily guidance or a quick answer to a specific question.",
            duration: "2-5 minutes",
            bestFor: "Quick guidance, daily reflection, simple questions",
            icon: <Moon className="h-8 w-8 text-lavender-400" />,
            color: "bg-lavender-100/40",
            textColor: "text-lavender-500",
            borderColor: "border-lavender-200",
        },
        {
            id: "three-card",
            name: "Past-Present-Future",
            description:
                "A classic three-card spread that reveals influences from the past, current energies, and potential future outcomes.",
            duration: "5-10 minutes",
            bestFor:
                "Timeline insights, situation development, moderate complexity",
            icon: <Compass className="h-8 w-8 text-mint-400" />,
            color: "bg-mint-100/40",
            textColor: "text-mint-600",
            borderColor: "border-mint-200",
        },
        {
            id: "five-card",
            name: "Five Card Spread",
            description:
                "A comprehensive reading that explores past influences, present situation, future outcomes, underlying causes, and potential for growth.",
            duration: "10-15 minutes",
            bestFor: "Deeper insights, complex situations, life path guidance",
            icon: <Heart className="h-8 w-8 text-peach-400" />,
            color: "bg-peach-100/40",
            textColor: "text-peach-500",
            borderColor: "border-peach-200",
        },
        {
            id: "celtic-cross",
            name: "Celtic Cross",
            description:
                "A detailed ten-card spread that provides a comprehensive overview of a situation, including influences, obstacles, hopes, and outcomes.",
            duration: "20-30 minutes",
            bestFor:
                "In-depth analysis, complex life situations, major decisions",
            icon: <Flower className="h-8 w-8 text-yellow-400" />,
            color: "bg-yellow-100/40",
            textColor: "text-yellow-600",
            borderColor: "border-yellow-200",
        },
        {
            id: "freestyle",
            name: "Freestyle Spread",
            description:
                "Create your own custom spread by selecting up to 5 cards, then get a magical AI-generated interpretation of your reading.",
            duration: "10-15 minutes",
            bestFor:
                "Personalized readings, specific questions, intuitive selection",
            icon: <Sparkles className="h-8 w-8 text-pink-400" />,
            color: "bg-pink-100/40",
            textColor: "text-pink-500",
            borderColor: "border-pink-200",
        },
    ];

    return (
        <>
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
                            Tarot Readings
                            <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-mint-200 opacity-50"></div>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-lavender-500">
                            Explore different tarot spreads to gain insight into
                            various aspects of your life journey. Each spread
                            offers unique perspectives and guidance.
                        </p>
                    </header>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {readings.map((reading) => (
                            <Card
                                key={reading.id}
                                className={`overflow-hidden rounded-3xl border-2 ${reading.borderColor} ${reading.color} text-pink-600 backdrop-blur-sm transition-transform hover:scale-[1.02]`}
                            >
                                <CardContent className="p-6">
                                    <div className="mb-4 flex items-center">
                                        <div className="mr-4 rounded-full bg-white/50 p-2">
                                            {reading.icon}
                                        </div>
                                        <h2 className="text-2xl font-semibold text-pink-500">
                                            {reading.name}
                                        </h2>
                                    </div>

                                    <p className="mb-4 text-lavender-500">
                                        {reading.description}
                                    </p>

                                    <div className="mb-4 grid grid-cols-2 gap-4">
                                        <div className="rounded-xl bg-white/50 p-3">
                                            <h3 className="mb-1 text-sm font-medium text-pink-400">
                                                Duration
                                            </h3>
                                            <p className="text-sm text-lavender-500">
                                                {reading.duration}
                                            </p>
                                        </div>
                                        <div className="rounded-xl bg-white/50 p-3">
                                            <h3 className="mb-1 text-sm font-medium text-pink-400">
                                                Best For
                                            </h3>
                                            <p className="text-sm text-lavender-500">
                                                {reading.bestFor}
                                            </p>
                                        </div>
                                    </div>

                                    <Link href={`/readings/${reading.id}`}>
                                        <Button className="w-full bg-pink-400 hover:bg-pink-500">
                                            Start Reading
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 rounded-3xl bg-white/70 p-6 text-center backdrop-blur-sm">
                        <h2 className="mb-4 text-2xl font-semibold text-pink-500">
                            Preparing for Your Reading
                        </h2>
                        <div className="mx-auto max-w-3xl">
                            <p className="mb-4 text-lavender-500">
                                To get the most out of your tarot reading,
                                consider these suggestions:
                            </p>
                            <ul className="mb-6 list-inside list-disc text-left text-lavender-500">
                                <li>
                                    Find a quiet space where you won&apos;t be
                                    disturbed
                                </li>
                                <li>
                                    Take a few deep breaths to center yourself
                                    before beginning
                                </li>
                                <li>
                                    Have a specific question or area of focus in
                                    mind
                                </li>
                                <li>
                                    Approach the reading with an open mind and
                                    heart
                                </li>
                                <li>
                                    Remember that tarot offers guidance, not
                                    fixed predictions
                                </li>
                            </ul>
                            <p className="text-lavender-500">
                                The cards reflect energies and possibilities,
                                but you always have the power to shape your
                                path.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
