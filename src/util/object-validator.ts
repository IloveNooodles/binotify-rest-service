export const instanceOfStandardError = (object: any) => {
    return 'error_code' in object && 'message' in object;
};
