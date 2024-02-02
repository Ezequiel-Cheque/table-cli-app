import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugins';

const { b:base, l:limit } = yarg;

let outpuMessage =  "";

const haderMessage = `
==========================================
            Tabla del ${base}
==========================================
\n`;

if (yarg.s) {
    
    for(let i = 1; i<=limit; i++) {
        outpuMessage += `${base} x ${i} = ${i*base}\n`;
    }
    outpuMessage = haderMessage + outpuMessage;
    
    console.log(outpuMessage);
}

const outputPath = "outputs";
fs.mkdirSync(outputPath, {recursive: true});
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outpuMessage);

console.log("file was created!!!");