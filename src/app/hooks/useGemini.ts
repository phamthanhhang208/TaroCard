import { useMutation } from "@tanstack/react-query";
import { TarotCard } from "@/lib/type";

export function useGemini() {
    return useMutation({
        mutationKey: ["tarot", "ai"],
        mutationFn: async ({
            question,
            cards,
        }: {
            question: string;
            cards: { card: TarotCard; isReversed: boolean }[];
        }) =>
            fetch("/api/gemini-reading", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cards, question }),
            }),
    });
}
