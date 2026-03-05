const fs = require('fs');
const path = require('path');
const ids = ['SN40', 'SN41', 'SN42', 'SN43', 'SN44', 'SN45', 'SN46', 'SN47', 'SN48', 'SN49', 'SN50', 'SN51', 'SN52', 'SN20', 'SN21', 'AA001', 'AA002', 'AA003', 'AA004', 'AA005', 'AA006', 'AA007', 'AA008', 'AA009', 'AA010', 'AA011', 'AA012', 'AA013', 'AA014'];

['wellkitt-knowledge-base-completa.json', 'base-conocimiento-productos.json', 'constants/Productos.json'].forEach(file => {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) return;

    let json = JSON.parse(fs.readFileSync(p, 'utf8'));
    let ch = 0;

    function walk(o) {
        if (Array.isArray(o)) o.forEach(walk);
        else if (typeof o === 'object' && o) {
            if (o.id && ids.includes(o.id)) {
                if (o.marca === 'Soria Natural') { o.marca = 'Aminas y Derivados'; ch++; }
                else if (o.marca === undefined && (o.id.startsWith('AA') || o.id.startsWith('SN'))) { o.marca = 'Aminas y Derivados'; ch++; }
            }
            for (const k in o) walk(o[k]);
        }
    }

    walk(json);

    if (ch > 0) {
        fs.writeFileSync(p, JSON.stringify(json, null, 2));
        console.log(file + ': ' + ch + ' updates');
    } else {
        console.log(file + ': 0 updates');
    }
});
