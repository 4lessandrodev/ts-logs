/**
 * @description Check if provided char is a letter of alphabet
 * @param char as string
 * @returns true if char is a letter of alphabet and false if not.
 */
const IsAlphaChar = (char: string): boolean => {
    const upper = char.toUpperCase();
    const asciiCode = upper.charCodeAt(0);
    return asciiCode <= 90 && asciiCode >= 65;
}

/**
 * @description Check if provided char is a valid separator.
 * @param char string as char
 * @returns true if char is "-" and false if its not.
 */
const IsValidSeparator = (char: string): boolean => {
    const asciiCode = char.charCodeAt(0);
    return asciiCode === 45;
}

/**
 * @description Normalize folder name. Remove special chars and numbers.
 * @param value folder name as string
 * @returns normalized folder name
 */
export const GetFolderName = (value: string): string => {
    if(typeof value !== 'string') return 'default';
    
    let result = value.trim().replace(/\s|_/g, '-');
    result = result.replace(/[0-9]/g, '');

    let i = 0;
    let changed = '';
    while(result[i]){
        const char = result[i];
        if(IsAlphaChar(char) || IsValidSeparator(char)){
            changed = changed + char;
            i++;
            continue;
        }
        i++;
    }

    while(changed[0] && IsValidSeparator(changed[0])) { changed = changed.slice(1); }
    while(changed && IsValidSeparator(changed.at(-1)!)) { changed = changed.slice(0, changed.length -1); }

    if(!changed) return 'default';

    while(/--/g.test(changed)){
        changed = changed.replace(/--/g, '-');
    }

    if(!changed) return 'default';

    return changed.toLowerCase();
}

export default GetFolderName;
