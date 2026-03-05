import * as fs from 'fs';
import * as path from 'path';

const filesToUpdate = [
    'wellkitt-knowledge-base-completa.json',
    'base-conocimiento-productos.json'
];

const aminoAcidIds = [
    'SN40', 'SN41', 'SN42', 'SN43', 'SN44', 'SN45', 'SN46', 'SN47', 'SN48', 'SN49', 'SN50', 'SN51', 'SN52',
    'SN20', 'SN21',
    'AA001', 'AA002', 'AA003', 'AA004', 'AA005', 'AA006', 'AA007', 'AA008', 'AA009', 'AA010', 'AA011', 'AA012', 'AA013', 'AA014'
];

for (const filename of filesToUpdate) {
    const filePath = path.join('/Users/miguelojedarios/wellkitt', filename);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping \${filename}, not found.`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let json;
    try {
        json = JSON.parse(content);
    } catch (e) {
        console.error(`Error parsing \${filename}`);
        continue;
    }

    let changes = 0;

    // Function to recursively find and update objects
    function traverseAndUpdate(obj: any) {
        if (Array.isArray(obj)) {
            obj.forEach(item => traverseAndUpdate(item));
        } else if (typeof obj === 'object' && obj !== null) {
            if (obj.id && aminoAcidIds.includes(obj.id)) {
                if (obj.marca === 'Soria Natural') {
                    obj.marca = 'Aminas y Derivados';
                    changes++;
                } else if (!obj.marca && obj.id.startsWith('AA')) {
                    obj.marca = 'Aminas y Derivados';
                    changes++;
                }
            }
            for (const key in obj) {
                traverseAndUpdate(obj[key]);
            }
        }
    }

    traverseAndUpdate(json);

    // We should also look for 'Soria Natural' string replacements if needed, but the object approach is safer
    if (changes > 0) {
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
        console.log(`Updated \${changes} items in \${filename}`);
    } else {
        console.log(`No updates needed for \${filename}`);
    }
}
