import Color, { BgColors, FtSizes, StyleTypes } from '../lib/utils/color.util';

describe('colors', () => {
    it('should print font color red and background color blue', () => {
        const result = Color.red("Font Red & Background Blue", 'blue');
        expect(result).toBe('\u001b[31m\u001b[44mFont Red & Background Blue\u001b[39m\u001b[49m');
    });

    it('should print font color black and background color gray', () => {
        const result = Color.black("Font Black & Background Gray", 'gray');
        expect(result).toBe('\u001b[30m\u001b[100mFont Black & Background Gray\u001b[39m\u001b[49m');
    });

    it('should simple print color white with background red', () => {
        const result = Color.white('Hello World', 'red');
        expect(result).toBe('\u001b[37m\u001b[41mHello World\u001b[39m\u001b[49m');
    })

    it('should print font color green and background color black', () => {
        const result = Color.green("Font Green & Background Black", 'black');
        expect(result).toBe('\u001b[32m\u001b[40mFont Green & Background Black\u001b[39m\u001b[49m');
    });

    it('should print font color yellow and background color red', () => {
        const result = Color.yellow("Font Yellow & Background Red", 'red');
        expect(result).toBe('\u001b[33m\u001b[41mFont Yellow & Background Red\u001b[39m\u001b[49m');
    });

    it('should print font color blue and background color yellow', () => {
        const result = Color.blue("Font Blue & Background Yellow", 'yellow');
        expect(result).toBe('\u001b[34m\u001b[43mFont Blue & Background Yellow\u001b[39m\u001b[49m');
    });

    it('should print font color magenta and background color white', () => {
        const result = Color.magenta("Font Magenta & Background White", 'white');
        expect(result).toBe('\u001b[35m\u001b[47mFont Magenta & Background White\u001b[39m\u001b[49m');
    });

    it('should print font color cyan and background color magenta', () => {
        const result = Color.cyan("Font Cyan & Background Magenta", 'magenta');
        expect(result).toBe('\u001b[36m\u001b[45mFont Cyan & Background Magenta\u001b[39m\u001b[49m');
    });

    it('should print font color white and background color cyan', () => {
        const result = Color.white("Font White & Background Cyan", 'cyan');
        expect(result).toBe('\u001b[37m\u001b[46mFont White & Background Cyan\u001b[39m\u001b[49m');
    });

    it('should print font color white and bold style with background color black', () => {
        const result = Color.style().bold(Color.white("Font White & Background Black", 'black'));
        expect(result).toBe('\u001b[10m\u001b[1m\u001b[37m\u001b[40mFont White & Background Black\u001b[39m\u001b[49m\u001b[39m\u001b[49m');
    });

    it('should print font color white and italic style with background color black ', () => {
        const result = Color.style().italic(Color.white("Font White & Background Black & Italic", 'black'));
        expect(result).toBe('\u001b[10m\u001b[3m\u001b[37m\u001b[40mFont White & Background Black & Italic\u001b[39m\u001b[49m\u001b[39m\u001b[49m');
    });

    it("colors", () => {
        expect(BgColors).toMatchSnapshot();
        expect(FtSizes).toMatchSnapshot();
        expect(StyleTypes).toMatchSnapshot();
    })
});