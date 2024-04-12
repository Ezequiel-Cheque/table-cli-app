

const runCommand = async (args: string[]) => {
    
    process.argv = [ ...process.argv, ...args ];

    const { yarg } = await import('./yargs.plugins');

    return yarg;
};

describe("Test args.plugins.ts", () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test("should return default values", async () => {
        
        const argv = await runCommand([ '-b', '5' ]);
        
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
        }));

    });

    test("should return configuration with custom values", async() => {
        
        const options = {
            b: 8,
            l: 20,
            s: true,
            n: 'multiplication-custom-table',
            d: 'outputs-custom'
        };

        const argv = await runCommand([ '-b', `${options.b}`, '-l', `${options.l}`, '-s', `${options.s}`, '-n', `${options.n}`, '-d', `${options.d}`]);

        expect(argv).toEqual(expect.objectContaining(options));
    
    });

});