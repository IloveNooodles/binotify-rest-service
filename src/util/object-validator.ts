export const instanceOfStandardError = (object: any) => {
    if (object === null || object === undefined) {
        return false;
    }

    if (typeof object !== 'object') {
        return true;
    }

    return 'error_code' in object && 'message' in object;
};
