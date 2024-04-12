
import { ServerApp } from "./server-app";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

describe("Server App", () => {
    
    test("should create ServerApp instance", () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test("should run ServerApp width options", () => {

        // const logSpy = jest.spyOn(console, "log");
        // const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

        // const options = {
        //     base: 2,
        //     limit: 10,
        //     showTable: false,
        //     name: 'multiplication-table',
        //     destination: 'outputs'
        // };

        // ServerApp.run(options);

        // expect(logSpy).toHaveBeenCalledTimes(2);
        // expect(logSpy).toHaveBeenCalledWith("Server running...");
        // expect(logSpy).toHaveBeenCalledWith("File created!!");

        // expect(createTableSpy).toHaveBeenCalledTimes(1);
        // expect(createTableSpy).toHaveBeenCalledWith({
        //     base: options.base, limit: options.limit
        // });

        // expect(saveFileSpy).toHaveBeenCalledTimes(1);
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     fileName: options.name, 
        //     fileDestination: options.destination,
        // });

    });

    test("should run with custome values moked", () => {

        const options = {
            base: 2,
            limit: 10,
            showTable: false,
            name: 'multiplication-table',
            destination: 'outputs'
        };

        const logMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);
        const errorFileMock = jest.fn();

        console.log = logMock;
        console.error = errorFileMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        
        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({"base": options.base, "limit": options.limit});
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.destination,
            fileName: options.name
        });
        expect(logMock).toHaveBeenCalledWith('File created!!');
        expect(errorFileMock).not.toHaveBeenCalledWith();

    });

});