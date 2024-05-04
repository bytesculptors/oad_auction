// export const defautStartDate = (): Date => {
//     const time = new Date();
//     time.setDate(time.getDate() + 2);
//     if (time.getDate() <= 2) {
//         time.setMonth(time.getMonth() + 1);
//         if (time.getMonth() <= 0) {
//             time.setFullYear(time.getFullYear() + 1);
//         }
//     }
//     return time;
// };

export const defaultStartDate = (): Date => {
    const now = new Date();
    const startTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    return startTime;
};

export const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};
