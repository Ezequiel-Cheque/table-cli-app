
import { SaveFile } from "./save-file.use-case";
import fs, { mkdir } from "fs";

describe("SaveFileUseCase", () => {

    // beforeEach(() => {
    //     // clean up
    //     fs.rmSync("outputs", { recursive: true });
    // });

    afterEach(() => {
        // clean up
        const existFileFolder =  fs.existsSync("outputs");
        if (existFileFolder) fs.rmSync("outputs", { recursive: true });
        
        const existFileFolderCustom =  fs.existsSync("custom-outputs");
        if (existFileFolderCustom) fs.rmSync("custom-outputs", { recursive: true });
        
    });

    test("should save file width default values", () => {


        const saveFile = new SaveFile();
        const filePath =  "outputs/table.txt"
        const options = {
            fileContent: "test content"
        };

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test("Should save file width custom values", () => {
        
        const options = {
            fileContent: "Custome content",
            fileDestination: "custom-outputs/file-destination",
            fileName: "custom-table-name",
        };

        const filePath = `${options.fileDestination}/${options.fileName}.txt`;

        const saveFileCustom = new SaveFile();
        const result = saveFileCustom.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test("should return false if directory could  not be created", () => {
        
        const options = {
            fileContent: "Custome content",
            fileDestination: "custom-outputs/file-destination",
            fileName: "custom-table-name",
        };

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(
            () => { throw new Error("This is a custome error message from testing"); }
        );
        
        const result = saveFile.execute(options);
        
        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    })

    test("should return false if file could  not be created", () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(
            () => { throw new Error("This is a custome writing error message"); }
        );
        
        const result = saveFile.execute({ fileContent: "Hola" });
        
        expect(result).toBe(false);

        writeFileSpy.mockRestore();
    
    })

});