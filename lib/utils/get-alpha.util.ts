/**
 * @description Check if provided char is a letter of alphabet
 * @param char as string
 * @returns true if char is a letter of alphabet and false if not.
 */
const IsAlphaChar = (char: string): boolean => {
    if(typeof char !== 'string') return false;
    const upper = char.toUpperCase();
    const asciiCode = upper.charCodeAt(0);
    return asciiCode <= 90 && asciiCode >= 65;
}

/**
 * @description Check if provided char is a valid separator.
 * @param char string as char
 * @returns true if char is "-" or "_" and false if its not.
 */
const IsValidSeparator = (char: string): boolean => {
    if(typeof char !== 'string') return false;
    const asciiCode = char.charCodeAt(0);
    return asciiCode === 45 || asciiCode === 95;
}

/**
 * @description Check if provided char is space.
 * @param char as string
 * @returns true if value if space and false if not
 */
const IsSpace = (char: string): boolean => {
    if(typeof char !== 'string') return false;
    const asciiCode = char.charCodeAt(0);
    return asciiCode === 32;
}

/**
 * @description Normalize folder name. Remove special chars and numbers.
 * @param value folder name as string
 * @returns normalized folder name
 */
export const GetFolderName = (value: string): string => {
    if(typeof value !== 'string') return 'default';
    const result = value.split('').reduce((char, current, i) => {
        if(IsSpace(current)) return char + '-';
        if(IsAlphaChar(current) || (i > 0 && IsValidSeparator(current))) return char + current;
        return '';
    }, '');
    if(!result) return 'default';
    return result;
}

export default GetFolderName;
