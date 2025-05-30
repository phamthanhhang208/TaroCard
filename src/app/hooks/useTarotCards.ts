import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TarotCard } from "@/lib/type";

export function useTarotCards() {
    return useQuery({
        queryKey: ["tarot", "all"],
        queryFn: () => getDocs(collection(db, "tarot-cards")),
        select(data) {
            return data.docs.map((doc) => doc.data() as TarotCard);
        },
    });
}

export function useTarotCard(id: string) {
    return useQuery({
        queryKey: ["tarot", id],
        queryFn: () => getDoc(doc(db, "tarot-cards", id)),
        select: (docSnap) =>
            docSnap.exists() ? (docSnap.data() as TarotCard) : undefined,
    });
}
