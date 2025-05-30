"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Star, BookHeart } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className=" py-4 shadow-md backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center text-2xl font-bold text-pink-500"
                    >
                        <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
                        TaroCard
                    </Link>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        className="block text-pink-500 md:hidden"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>

                    {/* Desktop navigation */}
                    <div className="hidden space-x-6 md:flex">
                        <Link
                            href="/"
                            className="text-lavender-500 transition-colors hover:text-pink-500"
                        >
                            Home
                        </Link>
                        <Link
                            href="/readings"
                            className="text-lavender-500 transition-colors hover:text-pink-500"
                        >
                            Readings
                        </Link>
                        <Link
                            href="/cards"
                            className="text-lavender-500 transition-colors hover:text-pink-500"
                        >
                            Card Library
                        </Link>

                        <Link
                            href="/about"
                            className="text-lavender-500 transition-colors hover:text-pink-500"
                        >
                            About Tarot
                        </Link>
                    </div>
                </div>

                {/* Mobile navigation */}
                {isMenuOpen && (
                    <div className="mt-4 flex flex-col space-y-4 rounded-xl bg-white/90 p-4 pb-4 shadow-md md:hidden">
                        <Link
                            href="/"
                            className="flex items-center text-lavender-500 transition-colors hover:text-pink-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Star className="mr-2 h-4 w-4 text-yellow-400" />
                            Home
                        </Link>
                        <Link
                            href="/readings"
                            className="flex items-center text-lavender-500 transition-colors hover:text-pink-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Star className="mr-2 h-4 w-4 text-yellow-400" />
                            Readings
                        </Link>
                        <Link
                            href="/cards"
                            className="flex items-center text-lavender-500 transition-colors hover:text-pink-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Star className="mr-2 h-4 w-4 text-yellow-400" />
                            Card Library
                        </Link>
                        <Link
                            href="/journal"
                            className="flex items-center text-lavender-500 transition-colors hover:text-pink-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <BookHeart className="mr-2 h-4 w-4 text-pink-400" />
                            Journal
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center text-lavender-500 transition-colors hover:text-pink-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Star className="mr-2 h-4 w-4 text-yellow-400" />
                            About Tarot
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
