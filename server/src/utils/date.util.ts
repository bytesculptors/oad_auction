export const defautStartDate = (): Date => {
    const time = new Date();
    time.setDate(time.getDate() + 2);
    if (time.getDate() <= 2) {
        time.setMonth(time.getMonth() + 1);
        if (time.getMonth() <= 0) {
            time.setFullYear(time.getFullYear() + 1);
        }
    }
    return time;
};
