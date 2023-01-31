export const BgColors = {
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    magenta: 45,
    cyan: 46,
    white: 47,
    grey: 100,
    gray: 100,
}

export const FtSizes = {
    fontDefault: 10,
    font2: 11,
    font3: 12,
    font4: 13,
    font5: 14,
    font6: 15,
}

export const StyleTypes = {
    bold: 1,
    italic: 3,
    underline: 4,
    reset: 0
}

export type StyleType = keyof typeof StyleTypes;
export type FtSize = keyof typeof FtSizes;
export type BgColor = keyof typeof BgColors;
/**
Name                ||   Type   ||    Default
reset               ||  string  ||  "\u001b[0m"
bold                ||  string  ||  "\u001b[1m"
italic              ||  string  ||  "\u001b[3m"
underline           ||  string  ||  "\u001b[4m"
fontDefault         ||  string  ||  "\u001b[10m"
font2               ||  string  ||  "\u001b[11m"
font3               ||  string  ||  "\u001b[12m"
font4               ||  string  ||  "\u001b[13m"
font5               ||  string  ||  "\u001b[14m"
font6               ||  string  ||  "\u001b[15m"
imageNegative       ||  string  ||  "\u001b[7m"
imagePositive       ||  string  ||  "\u001b[27m"
black               ||  string  ||  "\u001b[30m"
red                 ||  string  ||  "\u001b[31m"
green               ||  string  ||  "\u001b[32m"
yellow              ||  string  ||  "\u001b[33m"
blue                ||  string  ||  "\u001b[34m"
magenta             ||  string  ||  "\u001b[35m"
cyan                ||  string  ||  "\u001b[36m"
white               ||  string  ||  "\u001b[37m"
grey                ||  string  ||  "\u001b[90m"
gray                ||  string  ||  "\u001b[90m"
brightRed           ||  string  ||  "\u001b[91m"
brightGreen         ||  string  ||  "\u001b[92m"
brightYellow        ||  string  ||  "\u001b[93m"
brightBlue          ||  string  ||  "\u001b[94m"
brightMagenta       ||  string  ||  "\u001b[95m"
brightCyan          ||  string  ||  "\u001b[96m"
brightWhite         ||  string  ||  "\u001b[97m"
"bg-black"          ||  string  ||  "\u001b[40m"
"bg-red"            ||  string  ||  "\u001b[41m"
"bg-green"          ||  string  ||  "\u001b[42m"
"bg-yellow"         ||  string  ||  "\u001b[43m"
"bg-blue"           ||  string  ||  "\u001b[44m"
"bg-magenta"        ||  string  ||  "\u001b[45m"
"bg-cyan"           ||  string  ||  "\u001b[46m"
"bg-white"          ||  string  ||  "\u001b[47m"
"bg-grey"           ||  string  ||  "\u001b[100m"
"bg-gray"           ||  string  ||  "\u001b[100m"
"bg-brightRed"      ||  string  ||  "\u001b[101m"
"bg-brightGreen"    ||  string  ||  "\u001b[102m"
"bg-brightYellow"   ||  string  ||  "\u001b[103m"
"bg-brightBlue"     ||  string  ||  "\u001b[104m"
"bg-brightMagenta"  ||  string  ||  "\u001b[105m"
"bg-brightCyan"     ||  string  ||  "\u001b[106m"
"bg-brightWhite"    ||  string  ||  "\u001b[107m"
 */
export const Color = ({
    byNum: (message: string, color: number, bg: BgColor): string => {
        const msg = typeof message === 'string' ? message : '';
        const fgNum = color === undefined ? 31 : color;
        const bgNum = BgColors[bg] === undefined ? 47 : BgColors[bg];
        return '\u001b[' + fgNum + 'm' + '\u001b[' + bgNum + 'm' + msg + '\u001b[39m\u001b[49m';
    },
    applyStyle: (message: string, type: StyleType, size?: FtSize): string => {
        const msg = typeof message === 'string' ? message : '';
        const fontSize = FtSizes?.[size!] === undefined ? FtSizes['fontDefault'] : FtSizes[size!];
        const style = StyleTypes?.[type] === undefined ? StyleTypes['reset'] : StyleTypes[type];
        if(type === 'reset') return message + '\u001b[' + style + 'm';
        return '\u001b[' + fontSize + 'm' + '\u001b[' + style + 'm' + msg + '\u001b[39m\u001b[49m';
    },
    black: (message: string, bgColor: BgColor): string => Color.byNum(message, 30, bgColor),
    red: (message: string, bgColor: BgColor): string => Color.byNum(message, 31, bgColor),
    green: (message: string, bgColor: BgColor): string => Color.byNum(message, 32, bgColor),
    yellow: (message: string, bgColor: BgColor): string => Color.byNum(message, 33, bgColor),
    blue: (message: string, bgColor: BgColor): string => Color.byNum(message, 34, bgColor),
    magenta: (message: string, bgColor: BgColor): string => Color.byNum(message, 35, bgColor),
    cyan: (message: string, bgColor: BgColor): string => Color.byNum(message, 36, bgColor),
    white: (message: string, bgColor: BgColor): string => Color.byNum(message, 37, bgColor),
    style: (size?: FtSize) => ({
        bold: (message: string): string => Color.applyStyle(message, 'bold', size),
        italic: (message: string): string => Color.applyStyle(message, 'italic', size),
        underline: (message: string): string => Color.applyStyle(message, 'underline', size),
        reset: (message: string): string => Color.applyStyle(message, 'reset', size),
    })
});

export default Color;
