export const instanceOfStandardError = (object: any) => {
    if (object === null || object === undefined) {
        return false;
    }
    return 'error_code' in object && 'message' in object;
};
