import { promises as fs } from 'fs';
import path from 'path';

const readJSONFile = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

const writeJSONFile = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

export { readJSONFile, writeJSONFile };
