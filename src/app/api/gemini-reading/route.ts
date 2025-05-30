import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TarotCard } from "@/lib/type";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

function buildPrompt(
    selectedCards: Array<{ card: TarotCard; isReversed: boolean }>,
    question: string
): string {
    let prompt = `You are an insightful tarot reader AI. Please interpret a tarot spread for a user in a friendly, clear, and structured way.

Here is the user's question (if any):
"${question}"

Here are the drawn cards (in order):
`;

    prompt += selectedCards
        .map(
            ({ card, isReversed }, i) => `
Card ${i + 1}:
- Name: ${card.name}
- Orientation: ${isReversed ? "Reversed" : "Upright"}
- Upright Meaning: ${card.uprightMeaning}
- Reversed Meaning: ${card.reversedMeaning}
- Arcana: ${card.arcana}
- Suit: ${card.suit}
- Reflection Questions: ${card.reflectionQuestions.join("; ")}
`
        )
        .join("\n");

    prompt += `
Please follow this format in your response:

1. Start with a warm introduction, referencing the user's question if provided.
2. State how many cards are in the spread.
3. For each card, in order, write:
   - "Card {number}: {card.name} ({Upright or Reversed})"
   - "This {upright/reversed} card suggests: {uprightMeaning or reversedMeaning}"
4. After all cards, write an "Overall Reading Synthesis" section. In this section:
   - If there are any Major Arcana cards, mention their significance.
   - If all or most cards are from the same suit, mention the theme of that suit.
   - If most cards are reversed, mention the significance of reversals.
   - If all cards are upright, mention the positive flow.
5. End with a "Personal Guidance" section, using the first reflection question from the first card as a prompt for the user to reflect on. Encourage intuition and self-trust.
6. Close with a positive, uplifting message.

Please use clear formatting (headings, bullet points, or emojis) to make the reading easy to follow.
`;

    return prompt;
}

// Named export for POST requests
export async function POST(req: NextRequest) {
    try {
        const { cards: selectedCards, question } = await req.json();

        if (
            !selectedCards ||
            !Array.isArray(selectedCards) ||
            selectedCards.length === 0
        ) {
            return NextResponse.json(
                { error: "No cards provided." },
                { status: 400 }
            );
        }

        const prompt = buildPrompt(selectedCards, question || "");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reading: text });
    } catch (error: unknown) {
        // Handle Gemini rate limit
        if (
            (error as { response?: { status: number } })?.response?.status ===
                429 ||
            (error as Error)?.message?.toLowerCase().includes("rate limit")
        ) {
            return NextResponse.json(
                {
                    error: "The tarot reading service is currently busy. Please try again in a moment.",
                },
                { status: 429 }
            );
        }

        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate reading." },
            { status: 500 }
        );
    }
}

// Optionally, you can add a GET handler for health checks or info
export async function GET() {
    return NextResponse.json({ status: "ok" });
}
