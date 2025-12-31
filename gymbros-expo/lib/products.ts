// Centralized Product Catalog for GymBros
// All product data in one place for consistency across the app

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  sizes: string[];
  features: string[];
  isNew?: boolean;
}

// Full product catalog with details
export const PRODUCTS: Record<string, Product> = {
  // =====================
  // MEN'S COLLECTION
  // =====================
  "1": {
    id: "1",
    name: "Sudadera Oversized Esencial",
    price: 1100.0,
    category: "Lifestyle Hombres",
    description:
      "La combinación perfecta de comodidad y estilo. Nuestra Sudadera Oversized Esencial está confeccionada con una mezcla de algodón premium para una suavidad inigualable.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      "Mezcla premium de algodón y poliéster",
      "Ajuste relajado oversized",
      "Puños y dobladillo acanalados",
      "Bolsillo canguro",
    ],
    isNew: true,
  },
  "4": {
    id: "4",
    name: "Sudadera Gym Pro",
    price: 1200.0,
    category: "Lifestyle Hombres",
    description:
      "Tu compañera ideal para entrar en calor o para el día a día. Esta sudadera técnica combina estilo urbano con funcionalidad deportiva.",
    images: [
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Interior de felpa suave",
      "Capucha ajustable",
      "Bolsillo frontal grande",
      "Transpirable y cálida",
    ],
  },
  "6": {
    id: "6",
    name: "Pantalones Deportivos Track",
    price: 1200.0,
    category: "Entrenamiento Hombres",
    description:
      "Versatilidad para dentro y fuera del gym. Estos pantalones track combinan comodidad premium con un look atlético moderno.",
    images: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Tela elástica 4 direcciones",
      "Bolsillos con cierre",
      "Cintura elástica con cordón",
      "Puños elásticos",
    ],
  },
  "7": {
    id: "7",
    name: "Tank Top Muscle Fit",
    price: 650.0,
    category: "Entrenamiento Hombres",
    description:
      "Diseñada para mostrar tu progreso. Esta tank top de corte muscle fit resalta tu físico mientras te mantiene fresco durante los entrenamientos más intensos.",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Corte muscle fit",
      "Tela ultra-ligera",
      "Secado rápido",
      "Costuras reforzadas",
    ],
    isNew: true,
  },
  "8": {
    id: "8",
    name: "Shorts Performance Pro",
    price: 850.0,
    category: "Entrenamiento Hombres",
    description:
      "Libertad de movimiento total. Estos shorts de alto rendimiento cuentan con tela elástica y bolsillos seguros para tus llaves y teléfono.",
    images: [
      "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Tela elástica 4-way stretch",
      "Forro interior de compresión",
      "Bolsillos laterales con cierre",
      "Cintura elástica con cordón",
    ],
  },
  "9": {
    id: "9",
    name: "Playera Compression Elite",
    price: 750.0,
    category: "Entrenamiento Hombres",
    description:
      "Compresión muscular que mejora la circulación y reduce la fatiga. Ideal para entrenamientos de alta intensidad y competencias.",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Compresión graduada",
      "Tela anti-microbiana",
      "Costuras planas anti-roce",
      "Protección UV UPF 50+",
    ],
  },

  // =====================
  // WOMEN'S COLLECTION
  // =====================
  "2": {
    id: "2",
    name: "Mallas Seamless High-Rise",
    price: 900.0,
    category: "Performance Mujeres",
    description:
      "Diseñadas para el máximo rendimiento. Estas mallas sin costuras de cintura alta brindan compresión donde más la necesitas.",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "Construcción sin costuras",
      "Cintura alta",
      "Tejido a prueba de sentadillas",
      "Absorción de humedad",
    ],
    isNew: true,
  },
  "3": {
    id: "3",
    name: "Set Deportivo Pink",
    price: 1300.0,
    category: "Performance Mujeres",
    description:
      "Destaca en el gimnasio con este set coordinado de alto rendimiento. Incluye top deportivo de soporte medio y leggings con tecnología seamless para máxima comodidad.",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Tecnología absorbe-sudor",
      "Tejido elástico 4-way stretch",
      "Soporte medio compresivo",
      "Cintura alta favorecedora",
    ],
  },
  "10": {
    id: "10",
    name: "Sports Bra High Impact",
    price: 800.0,
    category: "Performance Mujeres",
    description:
      "Soporte máximo para entrenamientos de alto impacto. Diseño encapsulado que reduce el movimiento hasta un 75%.",
    images: [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "Soporte de alto impacto",
      "Tirantes ajustables",
      "Banda inferior reforzada",
      "Copas removibles",
    ],
    isNew: true,
  },
  "11": {
    id: "11",
    name: "Crop Top Seamless",
    price: 700.0,
    category: "Lifestyle Mujeres",
    description:
      "Comodidad y estilo en un solo diseño. Este crop top seamless es perfecto para yoga, pilates o tu día a día activo.",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Construcción sin costuras",
      "Largo cropped favorecedor",
      "Soporte ligero integrado",
      "Tela ultra-suave",
    ],
  },
  "12": {
    id: "12",
    name: "Leggings Push-Up",
    price: 950.0,
    category: "Performance Mujeres",
    description:
      "Realza tus curvas con estos leggings de efecto push-up. Tecnología de compresión estratégica que esculpe tu silueta.",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "Efecto push-up en glúteos",
      "Cintura alta moldeadora",
      "Tejido a prueba de sentadillas",
      "Bolsillo lateral para celular",
    ],
  },
  "13": {
    id: "13",
    name: "Hoodie Cropped",
    price: 1050.0,
    category: "Lifestyle Mujeres",
    description:
      "Estilo urbano con un toque fitness. Esta hoodie cropped es perfecta para antes y después del gym, o para tus días de descanso activo.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Corte cropped moderno",
      "Interior de felpa suave",
      "Capucha con cordón",
      "Bolsillo canguro",
    ],
  },

  // =====================
  // ACCESSORIES
  // =====================
  "5": {
    id: "5",
    name: "Cinturón de Levantamiento",
    price: 1500.0,
    category: "Accesorios",
    description:
      "Soporte profesional para tus levantamientos más pesados. Fabricado con cuero premium de 10mm para máxima estabilidad del core.",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Cuero genuino de 10mm",
      "Hebilla de acero inoxidable",
      "Ancho uniforme de 10cm",
      "Costuras reforzadas",
    ],
  },
  "14": {
    id: "14",
    name: "Banda de Resistencia Pro",
    price: 450.0,
    category: "Accesorios",
    description:
      "Set completo de bandas de resistencia para entrenamiento en casa o gimnasio. Incluye 5 niveles de resistencia para progresión gradual.",
    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["Set Completo"],
    features: [
      "5 niveles de resistencia",
      "Látex natural premium",
      "Asas acolchadas incluidas",
      "Bolsa de transporte",
    ],
    isNew: true,
  },
  "15": {
    id: "15",
    name: "Thermo Premium",
    price: 650.0,
    category: "Accesorios",
    description:
      "Mantén tu hidratación a la temperatura perfecta. Este termo de acero inoxidable premium mantiene tus bebidas frías por 24 horas o calientes por 12 horas.",
    images: [
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["500ml", "750ml", "1L"],
    features: [
      "Acero inoxidable premium",
      "Tecnología de doble pared al vacío",
      "Tapa hermética anti-derrames",
      "Diseño ergonómico",
    ],
  },
  "16": {
    id: "16",
    name: "Mochila Gym Pro",
    price: 1800.0,
    category: "Accesorios",
    description:
      "Todo lo que necesitas, organizado. Esta mochila cuenta con compartimento para zapatos, bolsillo para laptop y múltiples bolsillos organizadores.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["Único"],
    features: [
      "Compartimento para zapatos ventilado",
      "Bolsillo para laptop 15\"",
      "Material resistente al agua",
      "Correas acolchadas",
    ],
  },
  "17": {
    id: "17",
    name: "Straps de Muñeca",
    price: 350.0,
    category: "Accesorios",
    description:
      "Soporte extra para tus muñecas durante levantamientos pesados. Diseño ergonómico con ajuste personalizable.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["Único"],
    features: [
      "Algodón premium",
      "Cierre de velcro",
      "Bucle para pulgar",
      "Par incluido",
    ],
  },
  "18": {
    id: "18",
    name: "Toalla Microfibra XL",
    price: 400.0,
    category: "Accesorios",
    description:
      "Ultra absorbente y de secado rápido. Esta toalla de microfibra es perfecta para el gym, yoga o cualquier actividad deportiva.",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XL"],
    features: [
      "Microfibra premium",
      "Secado ultra-rápido",
      "Compacta y ligera",
      "Incluye bolsa de transporte",
    ],
  },
};

// Helper function to get products as array for listing
export const getProductList = () => Object.values(PRODUCTS);

// Helper function to get products by category
export const getProductsByCategory = (category: string) => {
  return getProductList().filter((product) => product.category.includes(category));
};

// Featured products for home page (first 4 newest items)
export const getFeaturedProducts = () => {
  return getProductList()
    .filter((p) => p.isNew)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category.split(" ")[0], // First word only for display
      image: p.images[0],
      isNew: p.isNew,
    }));
};

// Shop page products (simplified for cards)
export const getShopProducts = () => {
  return getProductList().map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    image: p.images[0],
    isNew: p.isNew,
  }));
};
