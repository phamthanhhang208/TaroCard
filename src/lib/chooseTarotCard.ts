import random from "random";

export const chooseRandomCard = (max: number = 78) => {
    return random.int(0, max);
};

export const isReversed = () => {
    return random.boolean();
};
