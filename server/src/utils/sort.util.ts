export const sortObjectByAlpahbet = (object: any) => {
    return Object.keys(object)
        .sort()
        .reduce((acc: any, key: any) => {
            acc[key] = object[key];
            return acc;
        }, {});
};
