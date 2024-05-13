export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format hours, minutes, and seconds with leading zeros if necessary
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Concatenate and return the formatted time
    return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
};

export const formatColor = (
    seconds: number,
    colors: { 0: string } & { 1: string } & string[],
): { 0: number } & { 1: number } & number[] => {
    return colors.map((color, index) => {
        return Math.ceil((seconds * (colors.length - index - 1)) / colors.length);
    }) as { 0: number } & { 1: number } & number[];
};

const formatCountdown = (miniseconds: number) => {
    const days = Math.floor(miniseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((miniseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((miniseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((miniseconds % (1000 * 60)) / 1000);
};
