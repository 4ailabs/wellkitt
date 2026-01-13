import { SaladRecipe, SaladMolecularMechanism, SaladSynergy } from '../types';

export const SALAD_MECHANISMS: SaladMolecularMechanism[] = [
  {
    id: 'nrf2',
    name: 'Activación Nrf2',
    simpleDesc: 'El interruptor maestro de la limpieza celular.',
    analogy: 'Es como enviar un equipo de limpieza 24/7 a tus células para eliminar residuos tóxicos.',
    whyItMatters: ['Detox hepática profunda', 'Protección contra contaminación', 'Aumento de glutatión'],
    keyNutrients: [{ name: 'Sulforafano', examples: 'Brotes de brócoli, rúcula, rábanos' }],
    blockers: ['Cocinar verduras >5 min', 'No incluir grasa con fitoquímicos', 'Consumo irregular'],
    scientificEvidence: 'Vía Keap1-Nrf2-ARE. El sulforafano activa más de 200 genes protectores. Evidencia: Muy Alta (5/5)'
  },
  {
    id: 'nfkappab',
    name: 'Inhibición NF-κB',
    simpleDesc: 'El director de orquesta de la inflamación.',
    analogy: 'Es el detector de incendios de la célula. Si está siempre activado, hay "fuego" (inflamación) constante.',
    whyItMatters: ['Reducción de dolor articular', 'Salud cardiovascular', 'Prevención de neuroinflamación'],
    keyNutrients: [
      { name: 'Curcumina', examples: 'Cúrcuma en el aderezo + pimienta' },
      { name: 'Antocianinas', examples: 'Lechuga morada, cebolla roja' }
    ],
    blockers: ['Grasas trans', 'Azúcar refinada en aderezos', 'Falta de sueño', 'Estrés crónico'],
    scientificEvidence: 'Inhibición de la cascada de citoquinas pro-inflamatorias (IL-6, TNF-α). Evidencia: Muy Alta (4/5)'
  },
  {
    id: 'methylation',
    name: 'Soporte Metilación',
    simpleDesc: 'Reparación de ADN y regulación genética.',
    analogy: 'Son las notas adhesivas que marcan qué genes leer y cuáles ignorar en tu biblioteca biológica.',
    whyItMatters: ['Estabilidad del genoma', 'Función cerebral óptima', 'Regulación del ánimo', 'Detox de hormonas'],
    keyNutrients: [
      { name: 'Folato (B9)', examples: 'Espinacas, kale, lechuga' },
      { name: 'Colina', examples: 'Huevo cocido, semillas' },
      { name: 'Betaína', examples: 'Remolacha' }
    ],
    blockers: ['Deficiencia de B12/folato', 'Alcohol excesivo', 'Deficiencia de zinc/magnesio'],
    scientificEvidence: 'Ciclo de un carbono. Donadores de metilos esenciales para expresión genética. Evidencia: Muy Alta (5/5)'
  },
  {
    id: 'sirtuins',
    name: 'Activación Sirtuinas',
    simpleDesc: 'Los genes de la longevidad y el ayuno.',
    analogy: 'Son los trabajadores nocturnos que reparan la infraestructura celular mientras duermes.',
    whyItMatters: ['Longevidad celular', 'Autofagia (reciclaje proteico)', 'Salud metabólica', 'Protección mitocondrial'],
    keyNutrients: [
      { name: 'Quercetina', examples: 'Cebolla morada, manzana con piel' },
      { name: 'Resveratrol', examples: 'Uvas oscuras' },
      { name: 'Apigenina', examples: 'Perejil' }
    ],
    blockers: ['Comida ultraprocesada', 'Sedentarismo', 'Exceso calórico constante'],
    scientificEvidence: 'Proteínas SIRT1-7 reguladas por NAD+ y polifenoles. Mimetiza restricción calórica. Evidencia: Muy Alta (4/5)'
  },
  {
    id: 'telomeres',
    name: 'Protección Telomérica',
    simpleDesc: 'Los relojes biológicos del envejecimiento celular.',
    analogy: 'Como los protectores de plástico en las puntas de las agujetas. Sin ellos, se deshilachan (envejeces).',
    whyItMatters: ['Prevención de envejecimiento prematuro', 'Protección contra cáncer', 'Longevidad celular'],
    keyNutrients: [
      { name: 'Licopeno', examples: 'Tomate asado + aceite de oliva' },
      { name: 'Antioxidantes', examples: 'Vitamina C, E, Betacaroteno' }
    ],
    blockers: ['Estrés oxidativo', 'Inflamación crónica', 'Tabaquismo'],
    scientificEvidence: 'El licopeno y antioxidantes reducen el acortamiento telomérico. Evidencia: Muy Alta (4/5)'
  },
  {
    id: 'psychobiotic',
    name: 'Eje Intestino-Cerebro',
    simpleDesc: 'La conexión directa entre tu digestión y tu mente.',
    analogy: 'Tu intestino es como un segundo cerebro que produce el 90% de tu serotonina (felicidad).',
    whyItMatters: ['Regulación del ánimo', 'Reducción de ansiedad', 'Mejor digestión', 'Sistema inmune fuerte'],
    keyNutrients: [
      { name: 'Prebióticos', examples: 'Espárragos, alcachofa, ajo' },
      { name: 'Fibra', examples: 'Verduras crudas variadas' }
    ],
    blockers: ['Antibióticos frecuentes', 'Dieta baja en fibra', 'Estrés crónico'],
    scientificEvidence: 'El nervio vago conecta intestino-cerebro. Microbioma produce neurotransmisores. Evidencia: Muy Alta (4/5)'
  }
];

export const SALAD_SYNERGIES: SaladSynergy[] = [
  {
    id: 'greens_fat_hack',
    title: 'Hack de Verduras + Grasa',
    rule: 'Verduras Crudas + Aceite de Oliva = Absorción de Vitaminas x3-4',
    evidenceLevel: 5,
    science: 'Las vitaminas liposolubles (A, D, E, K) en verduras crudas se absorben hasta 4 veces más cuando se consumen con grasa. El aceite de oliva proporciona polifenoles + vehículo de absorción. Estudio: Rebello 2015.',
    howToApply: ['Usar verduras crudas variadas', 'Añadir 2-3 cucharadas de aceite de oliva virgen extra', 'Consumir inmediatamente (máximo 15 min de preparación)'],
    commonMistakes: ['Usar solo aceites refinados (menos polifenoles)', 'Cocinar las verduras (destruye enzimas)', 'Esperar mucho tiempo antes de comer'],
    alternatives: ['Aguacate picado', 'Semillas de girasol', 'Frutos secos picados']
  },
  {
    id: 'brassica_enzyme_hack',
    title: 'Hack de Enzima Mirrosinasa',
    rule: 'Brócoli/Rúcula Cruda + Mostaza/Rábano = Sulforafano x4-5',
    evidenceLevel: 5,
    science: 'Las crucíferas crudas contienen glucorafanina que la enzima mirosinasa convierte en sulforafano. La mostaza y rábanos crudos aportan más mirosinasa. Estudio: Okunade 2018 (n=12 humanos).',
    howToApply: ['Añadir brócoli o rúcula cruda', 'Incluir semillas de mostaza molidas o rábanos frescos picados', 'Mezclar bien antes de comer'],
    commonMistakes: ['Cocinar las crucíferas primero (inactiva mirosinasa)', 'Usar mostaza Dijon procesada', 'No mezclar los ingredientes'],
    alternatives: ['Coles de Bruselas crudas', 'Col rizada (kale)', 'Rábanos picados']
  },
  {
    id: 'antioxidant_combo',
    title: 'Tríada Antioxidante',
    rule: 'Tomate + Verduras Rojas/Moradas + Aceite = Licopeno + Antocianinas x2-3',
    evidenceLevel: 4,
    science: 'El licopeno del tomate se absorbe mejor con grasa. Las antocianinas de vegetales morados potencian efecto antioxidante. Combinación = sinergia cardiovascular comprobada.',
    howToApply: ['Tomate fresco o asado', 'Lechuga roja o cebolla morada', '2-3 cucharadas aceite de oliva virgen'],
    commonMistakes: ['Tomate verde sin madurar (menos licopeno)', 'Usar tomate cocido sin aceite', 'Ingredientes procesados'],
    alternatives: ['Zanahoria morada', 'Remolacha', 'Frambuesas']
  },
  {
    id: 'protein_bioavailability',
    title: 'Absorción de Proteína',
    rule: 'Proteína Cruda + Vitamina C + Enzimas = Absorción x2',
    evidenceLevel: 4,
    science: 'La vitamina C aumenta absorción de proteínas y hierro. Las enzimas de verduras crudas facilitan digestión. Especialmente importante para proteína vegetal.',
    howToApply: ['Huevo cocido o pollo a la parrilla', 'Limón fresco o tomate', 'Variedad de verduras crudas'],
    commonMistakes: ['Proteína sola sin acompañamientos', 'Verduras cocidas (menos enzimas)', 'Sin ácido cítrico (limón/vinagre)'],
    alternatives: ['Atún enlatado', 'Queso fresco', 'Legumbres cocidas frías']
  }
];

export const MASTER_SALADS: SaladRecipe[] = [
  {
    id: 'nrf2_master_salad',
    name: 'Ensalada Detox NRF2',
    target: 'Limpieza Celular Profunda',
    molecularGoalDesc: 'Activa tu sistema de limpieza intracelular (vía NRF2) para eliminar toxinas, metales pesados y radicales libres. La combinación de brásicas crudas + grasas saludables = máxima expresión de genes protectores.',
    scienceQuick: {
      mechanism: 'Activación Nrf2 → Fase II Detoxificación',
      evidence: 'Muy Alta (5/5)',
      timeToEffect: '3-7 días de consumo regular'
    },
    ingredients: [
      { name: 'Rúcula fresca', amount: '80g', reason: 'Rica en glucorafanina, precursor de sulforafano', category: 'base', power: 'Sulforafano x4-5' },
      { name: 'Brócoli crudo (flores pequeñas)', amount: '60g', reason: 'Máxima concentración de mirosinasa', category: 'verdura' },
      { name: 'Rábanos frescos', amount: '40g', reason: 'Aportan enzima mirosinasa + afinidad por rúcula', category: 'verdura', power: 'Amplifica sulforafano' },
      { name: 'Col rizada (kale) cruda', amount: '50g', reason: 'Glutatión + folato para metilación', category: 'verdura' },
      { name: 'Zanahoria morada rallada', amount: '40g', reason: 'Antocianinas + betacaroteno', category: 'verdura' },
      { name: 'Huevo cocido', amount: '1 unidad', reason: 'Colina para detox hepático', category: 'proteina', power: 'Metilación' },
      { name: 'Semillas de cáñamo', amount: '20g', reason: 'Ácidos grasos omega-3 para absorción', category: 'topping', power: 'Biodisponibilidad' },
      { name: 'Aceite de oliva virgen extra', amount: '3 cucharadas', reason: 'Vehículo de absorción + polifenoles', category: 'aderezo', power: 'Absorción x4' },
      { name: 'Limón fresco (jugo)', amount: '1 limón', reason: 'Ácido cítrico + vitamina C + quercetina', category: 'aderezo' },
      { name: 'Mostaza amarilla (molida)', amount: '1 cucharadita', reason: 'Enzimas + sabor', category: 'aderezo' }
    ],
    preparation: [
      'Lavar todas las verduras crudo bajo agua fría',
      'Cortar brócoli en flores pequeñas del tamaño de una moneda',
      'Picar rábanos en rodajas finas',
      'Rallar zanahoria morada con un rallador fino',
      'Desmenuzar el huevo cocido con un tenedor',
      'En un bol grande, combinar TODAS las verduras crudas',
      'Añadir semillas de cáñamo',
      'En un recipiente aparte, emulsionar: aceite + jugo de limón + mostaza',
      'Verter aderezo sobre la ensalada justo antes de servir',
      'Mezclar vigorosamente durante 30 segundos (activa enzimas)'
    ],
    totalTime: '12 minutos',
    secret: 'La mirosinasa se activa con MOVIMIENTO. Mientras más mezcles antes de comer, más sulforafano se genera. Come en los primeros 15 minutos de preparar.',
    proOptimization: {
      whenToEat: 'En el desayuno o almuerzo temprano (máxima energía mitocondrial)',
      frequency: '4-5 veces a la semana para detox óptimo',
      combinesWith: 'Té verde sin azúcar (duplica antioxidantes), evitar café 2 horas después (compite por absorción)'
    },
    smartRotation: 'Semana 1-2: Lunes, miércoles, viernes. Semana 3: Descansa. Semana 4: Añade brotes de brócoli (2x más sulforafano que flores). Este ciclo mantiene el sistema NRF2 sensible sin tolerancia.',
    recommendedProducts: [
      {
        productId: 'DOZ03',
        reason: 'Glutatión - Antioxidante maestro que potencia la vía NRF2 activada por el sulforafano de la ensalada',
        synergy: 'El glutatión trabaja sinérgicamente con la vía NRF2. Mientras el sulforafano ACTIVA los genes, el glutatión EJECUTA la detoxificación. Tomar 30 min antes de la ensalada maximiza la limpieza celular.'
      },
      {
        productId: 'SN28',
        reason: 'Oligosor Azufre - Cofactor esencial para la Fase II de detoxificación hepática',
        synergy: 'El azufre es crucial para conjugar toxinas con glutatión. Esta ensalada activa NRF2 pero necesita azufre biodisponible para completar el proceso. Tomar en ayunas antes de la ensalada.'
      },
      {
        productId: 'BF01',
        reason: 'Hepacryl - Protección hepática con cardo mariano y alcachofa para maximizar detoxificación',
        synergy: 'El hígado es donde ocurre 80% de la detoxificación. La silimarina del cardo mariano protege hepatocitos mientras procesan las toxinas movilizadas por el sulforafano. Tomar con la ensalada.'
      },
      {
        productId: 'SN15',
        reason: 'Minesor con Selenio - Oligoelemento clave para glutatión peroxidasa',
        synergy: 'El selenio es cofactor de la glutatión peroxidasa, enzima que neutraliza peróxidos generados durante detox. Sin selenio, el glutatión no funciona óptimamente. Tomar diario.'
      },
      {
        productId: 'SN35',
        reason: 'Vitamina C - Regenera glutatión oxidado y potencia absorción de sulforafano',
        synergy: 'La vitamina C recicla glutatión usado de vuelta a su forma activa. También aumenta absorción intestinal de sulforafano hasta 3x. Tomar 1g con la ensalada.'
      }
    ]
  },
  {
    id: 'nfkappab_master_salad',
    name: 'Ensalada Anti-Inflamatoria NF-κB',
    target: 'Apagado de Inflamación Sistémica',
    molecularGoalDesc: 'Bloquea el factor de transcripción NF-κB responsable de la cascada inflamatoria. Ideal para personas con dolor articular, reumatismo o inflamación crónica silenciosa.',
    scienceQuick: {
      mechanism: 'Inhibición NF-κB → Supresión IL-6, TNF-α',
      evidence: 'Muy Alta (4/5)',
      timeToEffect: '5-14 días para notar reducción de dolor'
    },
    ingredients: [
      { name: 'Lechuga roja (roble o sanguina)', amount: '100g', reason: 'Antocianinas + acción antiinflamatoria', category: 'base', power: 'Antocianinas x3' },
      { name: 'Cebolla roja', amount: '60g', reason: 'Quercetina: inhibidor NF-κB natural', category: 'verdura', power: 'Quercetina 168 mg/100g' },
      { name: 'Tomate cherry', amount: '100g', reason: 'Licopeno antioxidante + ácido cítrico', category: 'verdura' },
      { name: 'Espinacas frescas', amount: '50g', reason: 'Luteína + folato para reparación tisular', category: 'verdura' },
      { name: 'Cúrcuma molida', amount: '0.5 cucharadita', reason: 'Curcumina: bloqueador NF-κB más potente', category: 'topping', power: 'Antiinflamatorio x10' },
      { name: 'Pimienta negra molida', amount: '1 pellizco', reason: 'Piperina aumenta absorción de curcumina x2000%', category: 'topping' },
      { name: 'Pechuga de pollo a la parrilla', amount: '120g', reason: 'Proteína + selenio antioxidante', category: 'proteina' },
      { name: 'Aceite de coco virgen', amount: '2 cucharadas', reason: 'Ácido láurico antiinflamatorio + SFA sano', category: 'aderezo' },
      { name: 'Limón fresco (jugo)', amount: '0.5 limón', reason: 'Vitamina C + quercetina potencia', category: 'aderezo' },
      { name: 'Semillas de sésamo negro', amount: '15g', reason: 'Lignanos + omega-6 balanceado', category: 'topping' }
    ],
    preparation: [
      'Cortar lechuga roja en tiras medianas',
      'Picar cebolla roja en medias lunas delgadas',
      'Cortar tomates cherry por la mitad',
      'Raspar espinacas y dejarlas enteras o ligeramente picadas',
      'Desmenuzar pechuga de pollo tibia en trozos',
      'En un bol aparte, mezclar cúrcuma + pimienta',
      'En otro bol, mezclar aceite de coco + jugo de limón',
      'Añadir la mezcla de cúrcuma al aceite de coco y remover bien',
      'Combinar todas las verduras en un plato',
      'Distribuir pollo sobre la ensalada',
      'Verter aderezo de cúrcuma-coco',
      'Espolvorear semillas de sésamo negro',
      'Mezclar bien 20 segundos antes de comer'
    ],
    totalTime: '15 minutos',
    secret: 'La curcumina requiere GRASA + PIMIENTA para ser biodisponible (si no, tu cuerpo solo absorbe 5%). El aceite de coco + pimienta negro es la tríada perfecta. Comela tibia, no fría.',
    proOptimization: {
      whenToEat: 'Almuerzo o cena temprana (la curcumina trabaja durante el sueño reparador)',
      frequency: '5-6 veces a la semana si hay dolor inflamatorio activo',
      combinesWith: 'Jengibre fresco rayado (dobla efecto antiinflamatorio), evitar lácteos 1 hora antes (inhiben absorción de curcumina)'
    },
    smartRotation: 'Mes 1: 5x/semana. Mes 2: 3x/semana + añade ajo crudo. Mes 3: 2x/semana de mantenimiento. Alterna entre pollo, pavo y huevo cocido para no crear tolerancia.',
    recommendedProducts: [
      {
        productId: 'BF17',
        reason: 'Cúrcuma Biofito - Curcumina concentrada para bloqueo sostenido de NF-κB',
        synergy: 'La curcumina oral mantiene niveles plasmáticos constantes de este inhibidor NF-κB. La ensalada da el golpe agudo, el suplemento da cobertura 24/7. Tomar 2 cápsulas con la ensalada (grasa maximiza absorción).'
      },
      {
        productId: 'DOZ07',
        reason: 'Omega-3 EPA/DHA - Resolvinas anti-inflamatorias de resolución activa',
        synergy: 'Los omega-3 se convierten en SPMs (mediadores pro-resolución) que RESUELVEN la inflamación sin suprimirla. Complementa perfectamente la inhibición NF-κB de la curcumina. Tomar 2-3g/día.'
      },
      {
        productId: 'SN19',
        reason: 'Resverasor - Resveratrol que modula expresión de genes inflamatorios',
        synergy: 'El resveratrol activa SIRT1 que a su vez DESACTIVA NF-κB a nivel epigenético. Es un regulador upstream. Tomar con la ensalada para máxima biodisponibilidad.'
      },
      {
        productId: 'BF15',
        reason: 'Uña de Gato - Alcaloides pentacíclicos antiinflamatorios e inmunomoduladores',
        synergy: 'La uña de gato tiene acción dual: inhibe TNF-α (downstream de NF-κB) Y modula inmunidad. Perfecta para inflamación crónica con componente inmune. Tomar 500mg 2x/día.'
      },
      {
        productId: 'SN26',
        reason: 'Oligosor Magnesio - Cofactor para más de 300 enzimas antiinflamatorias',
        synergy: 'El magnesio estabiliza membranas celulares y reduce liberación de citoquinas. La deficiencia de Mg se asocia con inflamación crónica de bajo grado. Tomar en ayunas o antes de dormir.'
      }
    ]
  },
  {
    id: 'psychobiotic_master_salad',
    name: 'Ensalada Psicobiótica Intestino-Cerebro',
    target: 'Salud Mental + Microbiota Óptima',
    molecularGoalDesc: 'Alimenta tu segundo cerebro (microbiota intestinal) para producir serotonina, dopamina y GABA. Rebalancéa el eje intestino-cerebro afectado por estrés, antibióticos o dieta moderna.',
    scienceQuick: {
      mechanism: 'Prebióticos → Eubiosis → Neurotransmisores',
      evidence: 'Muy Alta (4/5)',
      timeToEffect: '2-4 semanas para cambios notorios en ánimo'
    },
    ingredients: [
      { name: 'Rúcula', amount: '80g', reason: 'Probiótico natural + glucosinolatos', category: 'base' },
      { name: 'Espárragos crudos (cortados finos)', amount: '100g', reason: 'Inulina: prebiótico top para lactobacilos', category: 'verdura', power: 'Inulina 2.5g/100g' },
      { name: 'Ajo crudo (picado muy fino)', amount: '1 diente', reason: 'Alicina + inulina: fermentador de microbiota', category: 'verdura', power: 'Prebiótico 20g/100g' },
      { name: 'Cebolla morada cruda', amount: '50g', reason: 'FOS (fructooligosacáridos) + quercetina', category: 'verdura', power: 'FOS 1.3g/100g' },
      { name: 'Tomate', amount: '80g', reason: 'Licopeno + ácido fólico para síntesis de serotonina', category: 'verdura' },
      { name: 'Cúrcuma molida', amount: '0.5 cucharadita', reason: 'Antiinflamatoria intestinal (permeabilidad)', category: 'topping' },
      { name: 'Caldo óseo fermentado', amount: '30ml', reason: 'Colágeno + aminoácidos para revestimiento intestinal', category: 'aderezo' },
      { name: 'Aceite de lino', amount: '1 cucharada', reason: 'ALA para síntesis de neurotransmisores', category: 'aderezo' },
      { name: 'Limón fresco (jugo)', amount: '0.5 limón', reason: 'Ácido cítrico + vitamina C prebiótica', category: 'aderezo' },
      { name: 'Nueces picadas', amount: '25g', reason: 'Polifenoles + omega-3 para eje vagal', category: 'topping', power: 'Polifenoles 8-12 mmol/100g' }
    ],
    preparation: [
      'Picar rúcula en tiras medianas',
      'Cortar espárragos en trocitos de 1cm (máxima liberación de inulina)',
      'Picar ajo MUY fino y dejar reposar 10 minutos (activa alicina)',
      'Picar cebolla morada en rodajas delgadas y dejar en agua fría 5 min (reduce picante, mantiene FOS)',
      'Cortar tomate en cubos',
      'En un recipiente, mezclar caldo óseo + aceite de lino + limón',
      'Añadir cúrcuma a este aderezo y remover bien',
      'En un bol, combinar todas las verduras',
      'Verter aderezo prebiótico sobre verduras',
      'Dejar reposar 2-3 minutos (las verduras fermentan ligeramente)',
      'Mezclar y espolvorear nueces picadas justo antes de comer'
    ],
    totalTime: '18 minutos (incluye reposo)',
    secret: 'Los PREBIÓTICOS necesitan tiempo para pre-digerir (osmosis + enzimas de verduras). Espera 3+ minutos después de preparar. El ajo crudo es poderoso pero picante: picarlo fino + tiempo = sabor + sinergia. Come con calma (20+ minutos), masticando bien para activar eje vagal.',
    proOptimization: {
      whenToEat: 'Almuerzo (máxima saliva + ácidos digestivos para fermentación optima)',
      frequency: '3-4 veces a la semana, especialmente si hay ansiedad o depresión',
      combinesWith: 'Kéfir de cabra después de 30 min (probióticos + prebióticos = eubiosis), meditación 5 min durante/después (vagal tone)'
    },
    smartRotation: 'Semana 1-2: Todos los ingredientes. Semana 3: Duplica ajo y espárragos (máxima fermentación). Semana 4: Descansa 3 días. Este ciclo evita adaptación del microbiota y mantiene diversidad microbiana.',
    recommendedProducts: [
      {
        productId: 'DOZ04',
        reason: 'Innerbiotic - Probióticos multiespecie para recolonización intestinal',
        synergy: 'Los PREBIÓTICOS de la ensalada alimentan bacterias, pero primero necesitas TENER esas bacterias. Los probióticos introducen cepas beneficiosas que fermentarán la inulina y FOS. Tomar en ayunas 30 min antes de la ensalada.'
      },
      {
        productId: 'SN12',
        reason: 'Inulac - Inulina concentrada + enzimas digestivas para máxima eubiosis',
        synergy: 'La ensalada aporta 3-4g de prebióticos, este suplemento añade 5-8g más. Dosis clínica para cambios reales en microbiota: 10-12g/día total. Tomar con la ensalada.'
      },
      {
        productId: 'SN20',
        reason: 'Analis L-Triptófano - Precursor directo de serotonina (95% producida en intestino)',
        synergy: 'El eje intestino-cerebro NECESITA triptófano para sintetizar serotonina. Una microbiota sana produce enzimas que convierten triptófano → 5-HTP → serotonina. Sin triptófano, no hay sustrato. Tomar 500mg 2x/día lejos de proteínas.'
      },
      {
        productId: 'SN47',
        reason: 'Glicam (Glicina + Glutamina) - Reparación de permeabilidad intestinal',
        synergy: 'La glutamina es el combustible #1 de los enterocitos. Repara tight junctions y reduce permeabilidad ("leaky gut"). Sin pared intestinal íntegra, los psicobióticos no funcionan. Tomar 10g en ayunas.'
      },
      {
        productId: 'SN34',
        reason: 'Vitamina B12 - Cofactor para síntesis de neurotransmisores y metilación',
        synergy: 'La B12 es esencial para la conversión de homocisteína → metionina, crítica para producción de SAMe (donador de metilos). SAMe regula serotonina, dopamina y norepinefrina. Deficiencia = depresión. Sublingual 1000mcg/día.'
      }
    ]
  },
  {
    id: 'longevity_master_salad',
    name: 'Ensalada de Longevidad SIRT',
    target: 'Activación de Genes de Longevidad',
    molecularGoalDesc: 'Activa proteínas sirtuinas (SIRT1-7) responsables del envejecimiento lento. Mimetiza los efectos del ayuno intermitente en cada bocado. Ideal para optimización anti-aging y salud mitocondrial.',
    scienceQuick: {
      mechanism: 'Polifenoles → NAD+ ↑ → Sirtuinas Activas',
      evidence: 'Muy Alta (5/5)',
      timeToEffect: '4-8 semanas para telómeros notoriamente más largos'
    },
    ingredients: [
      { name: 'Rúcula', amount: '80g', reason: 'Glucosinolatos + EGCG (catequina)', category: 'base' },
      { name: 'Cebolla morada', amount: '50g', reason: 'Quercetina 150 mg/100g: activador SIRT1', category: 'verdura', power: 'Quercetina x5 vs blanca' },
      { name: 'Manzana verde con piel', amount: '60g', reason: 'Quercetina epicuticular + polifenoles', category: 'verdura', power: 'Piel = 10x polifenoles' },
      { name: 'Uva negra', amount: '50g', reason: 'Resveratrol 0.4-12 mg/100g (según variedad)', category: 'topping', power: 'Resveratrol x40 vs uva blanca' },
      { name: 'Perejil fresco', amount: '30g', reason: 'Apigenina + luteína para SIRT6', category: 'verdura', power: 'Apigenina 215 mg/100g' },
      { name: 'Nueces', amount: '25g', reason: 'Polifenoles + ALA para NAD+ mitocondrial', category: 'topping', power: 'Polifenoles 1524 mg/100g' },
      { name: 'Salmón salvaje a la parrilla', amount: '100g', reason: 'Astaxantina + omega-3 para longevidad mitocondrial', category: 'proteina', power: 'Astaxantina antioxidante x500 vs luteína' },
      { name: 'Aceite de oliva virgen extra', amount: '2 cucharadas', reason: 'Oleuropeína activadora de sirtuinas', category: 'aderezo', power: 'Polifenoles 200-300 mg/100ml' },
      { name: 'Vinagre de vino tinto', amount: '1 cucharada', reason: 'Resveratrol + ácido acético para sensibilidad insulina', category: 'aderezo' },
      { name: 'Semillas de calabaza', amount: '15g', reason: 'Zinc + magnesio para NAD+ metabolismo', category: 'topping' }
    ],
    preparation: [
      'Picar rúcula en tiras medianas',
      'Picar cebolla morada en rodajas finísimas',
      'Cortar manzana verde (con piel) en láminas finas',
      'Cortar uvas negras en cuartos (máxima exposición)',
      'Picar perejil fresco muy fino (justo antes de servir)',
      'Desmenuzar salmón salvaje en trozos pequeños',
      'En un recipiente, emulsionar: aceite de oliva + vinagre de vino tinto',
      'Combinar todas las verduras crudas en un bol grande',
      'Distribuir salmón encima',
      'Verter aderezo polifenólico',
      'Espolvorear nueces + semillas de calabaza',
      'Esparcir perejil fresco justo antes de servir',
      'Mezclar suavemente (máximo 10 segundos para no romper salmón)'
    ],
    totalTime: '14 minutos',
    secret: 'Los polifenoles son TERMOLÁBILES (se destruyen con calor). SOLO verduras crudas + salmón apenas tibia. La combinación Quercetina (cebolla/manzana) + Resveratrol (uva) + Apigenina (perejil) activa múltiples sirtuinas simultáneamente. Come sin prisa: los polifenoles necesitan 20+ minutos de contacto con enzimas salivales.',
    proOptimization: {
      whenToEat: 'Almuerzo (máxima eficiencia mitocondrial). Evitar carbohidratos refinados después (compiten por absorción de polifenoles)',
      frequency: '2-3 veces a la semana en modo anti-aging, 4-5x si hay historia familiar de enfermedad cardiovascular',
      combinesWith: 'Té blanco sin azúcar 30 min después (duplica polifenoles circulantes). Camina 30 min lentamente después de comer (NAD+ utilization).'
    },
    smartRotation: 'Mes 1: 2x/semana. Mes 2: 3x/semana. Mes 3: 4x/semana. Ciclo de 12 semanas y vuelve al inicio. Alterna entre salmón, trucha y arenque para máxima variedad de polifenoles.',
    recommendedProducts: [
      {
        productId: 'SN19',
        reason: 'Resverasor - Resveratrol concentrado, activador directo de SIRT1',
        synergy: 'El resveratrol es el activador de sirtuinas más estudiado. La ensalada aporta ~5-10mg, el suplemento añade 250mg para alcanzar dosis terapéutica (≥150mg/día). Tomar con la ensalada para aprovechar grasa de absorción.'
      },
      {
        productId: 'SN02',
        reason: 'Coenzima Q10 - Protección mitocondrial y producción de ATP',
        synergy: 'Las sirtuinas protegen mitocondrias, pero estas necesitan CoQ10 para producir energía. La combinación SIRT + CoQ10 es anti-aging sinérgico: uno repara, el otro energiza. Tomar 100-200mg con grasa.'
      },
      {
        productId: 'SN45',
        reason: 'Cronovida - Aminoácidos + vitaminas para regeneración celular y telómeros',
        synergy: 'Los aminoácidos son los bloques de construcción para reparación celular activada por sirtuinas. Cronovida aporta perfil completo para síntesis proteica óptima. Tomar 1 scoop 30 min antes de la ensalada.'
      },
      {
        productId: 'DOZ07',
        reason: 'Omega-3 EPA/DHA - Fluidez de membrana y reducción de inflamación',
        synergy: 'Los omega-3 se incorporan a membranas celulares, reduciendo inflamaging (inflamación del envejecimiento). Las sirtuinas trabajan mejor en un ambiente antiinflamatorio. Tomar 2-3g/día.'
      },
      {
        productId: 'SN36',
        reason: 'Vitamina D3 - Regulación epigenética y salud mitocondrial',
        synergy: 'La vitamina D modula expresión de genes relacionados con longevidad y función mitocondrial. Complementa la acción epigenética de las sirtuinas. Tomar 5000 UI/día con la ensalada (grasa).'
      }
    ]
  }
];
