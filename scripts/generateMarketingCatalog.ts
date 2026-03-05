import * as fs from 'fs';
import * as path from 'path';
import { products, kits } from '../constants/data';

const outputFilePath = '/Users/miguelojedarios/Desktop/Wellkitt_Catalogo_Productos.md';

let md = `# Catálogo Completo de Productos Wellkitt
> Documento de referencia para campañas de marketing y publicidad en redes sociales.
> Uso interno: generación de contenido, infografías, audio y materiales publicitarios.

---

## MARCAS DISPONIBLES
- **Soria Natural** — Suplementos nutricionales, vitaminas, minerales, oligoelementos
- **Biofito** — Fitoterapia, extractos herbales, tinturas madres
- **Aminas y derivados** — Aminoácidos especializados en polvo y cápsulas
- **DOZ** — Suplementos Premium
- **Flores de Bach** — Terapia floral
- **Homeopatía** — Remedios homeopáticos
- **Sales de Schüssler** — Terapias bioquímicas

---
`;

const brands = [
    'Soria Natural',
    'Biofito',
    'Aminas y Derivados',
    'DOZ',
    'Flores de Bach',
    'Homeopatía',
    'Sales de Schüssler'
];

// Helper to determine Uses based on Benefits
function getUses(benefits: string[], category: string) {
    const uses = benefits.map(b => {
        let word = b.split(' ')[0].replace(/[^a-zA-ZáéíóúÁÉÍÓÚ]/g, '');
        if (word.length > 4) return word;
        return b.split(' ').slice(0, 2).join(' ').replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, '');
    }).slice(0, 3).join(', ');
    return uses;
}

// Helper to determine Systems based on Category
function getSystems(category: string) {
    const catLower = category.toLowerCase();
    if (catLower.includes('inmune')) return 'inmune';
    if (catLower.includes('digestiv')) return 'digestivo';
    if (catLower.includes('nervios') || catLower.includes('estrés') || catLower.includes('sueño') || catLower.includes('cerebral')) return 'nervioso';
    if (catLower.includes('articulaciones') || catLower.includes('huesos')) return 'musculoesquelético';
    if (catLower.includes('circulacion') || catLower.includes('corazón')) return 'circulatorio';
    if (catLower.includes('piel') || catLower.includes('belleza')) return 'piel';
    if (catLower.includes('energia') || catLower.includes('rendimiento')) return 'energético';
    if (catLower.includes('hormonal') || catLower.includes('femenina') || catLower.includes('masculina')) return 'hormonal';
    if (catLower.includes('metabolismo') || catLower.includes('peso')) return 'metabólico';
    if (catLower.includes('detox')) return 'hepático, urinario';
    return 'general';
}

brands.forEach(brand => {
    const brandProducts = products.filter(p => p.brand === brand);
    if (brandProducts.length === 0) return;

    md += `\n## PRODUCTOS INDIVIDUALES — ${brand.toUpperCase()}\n\n`;

    brandProducts.forEach(p => {
        md += `### [${p.id}] ${p.name}\n`;
        md += `- **Marca:** ${p.brand}\n`;
        md += `- **Categoría:** ${p.category} / Salud General\n`;
        if (p.presentation) {
            md += `- **Presentación:** ${p.presentation}\n`;
        }
        md += `- **Ingredientes:** ${p.ingredients.join(', ')}\n`;
        md += `- **Beneficios:** ${p.benefits.join(' · ')}\n`;
        md += `- **Usos:** ${getUses(p.benefits, p.category)}\n`;
        md += `- **Sistemas:** ${getSystems(p.category)}\n\n`;
    });
});

md += `---

## KITS WELLKITT

`;

kits.forEach(k => {
    md += `### [${k.id}] ${k.name}\n`;
    md += `- **Problema que resuelve:** ${k.problem}\n`;
    md += `- **Beneficio principal:** ${k.benefit}\n`;
    md += `- **Descripción:** Tratamiento integral para ${k.problem.toLowerCase()}.\n`;
    md += `- **Productos incluidos:**\n`;
    k.productIds.forEach(pid => {
        const prod = products.find(p => p.id === pid);
        if (prod) {
            md += `  - ${prod.name} — ${prod.category}\n`;
        } else {
            md += `  - Producto ${pid}\n`;
        }
    });
    md += `- **Descuento:** ${k.discount}%\n`;
    md += `- **Duración sugerida:** 30-60 días\n`;
    md += `- **Categoría:** Diferentes áreas\n\n`;
});

md += `---

*Documento generado para uso interno Wellkitt — Campañas de marketing en redes sociales*
`;

fs.writeFileSync(outputFilePath, md, 'utf8');
console.log('Catalog generated successfully at', outputFilePath);
