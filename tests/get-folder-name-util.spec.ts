import GetFolderName from '../lib/utils/get-folder-name.util';

describe('get-folder-name.util', () => {
    it('should get "folder-example" on provide "Folder Example"', () => {
        const name = "Folder Example";
        const result = GetFolderName(name);
        expect(result).toBe('folder-example');
    });

    it('should get "folder-example" on provide "Folder 122-Example"', () => {
        const name = "Folder 123-Example";
        const result = GetFolderName(name);
        expect(result).toBe('folder-example');
    });

    it('should get "folder-example-app" on provide "-folder@ example app%"', () => {
        const name = "Folder 123-Example-app";
        const result = GetFolderName(name);
        expect(result).toBe('folder-example-app');
    });

    it('should get "folder-example-app" on provide " -folder@ #! = *-+example app% "', () => {
        const name = " -folder@ #!= *-+example app% ";
        const result = GetFolderName(name);
        expect(result).toBe('folder-example-app');
    });

    it('should get "folder-example-app" on provide " -folder@ #! = *-+example app_"', () => {
        const name = " -folder@ #! = *-+example app_";
        const result = GetFolderName(name);
        expect(result).toBe('folder-example-app');
    });

    it('should get "simple-app-example" on provide "simple app_example"', () => {
        const name = "simple app_example";
        const result = GetFolderName(name);
        expect(result).toBe('simple-app-example');
    });

    it('should get "default" on provide "{}"', () => {
        const name = {} as any;
        const result = GetFolderName(name);
        expect(result).toBe('default');
    });

    it('should get "default" on provide "200"', () => {
        const name = 200 as any;
        const result = GetFolderName(name);
        expect(result).toBe('default');
    });

    it('should get "default" on provide "---_---_---"', () => {
        const name = "---_---_---";
        const result = GetFolderName(name);
        expect(result).toBe('default');
    });

    it('should get "ops" on provide "---_&&ops---_---"', () => {
        const name = "---_&&ops---_---";
        const result = GetFolderName(name);
        expect(result).toBe('ops');
    });
});
