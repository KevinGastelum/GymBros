-- GymBros Seed Data
-- Populates categories and products

-- =====================================================
-- CATEGORIES
-- =====================================================
INSERT INTO categories (id, name, slug, description, sort_order) VALUES
    ('c1000000-0000-0000-0000-000000000001', 'Hombres', 'men', 'Ropa deportiva para hombres', 1),
    ('c1000000-0000-0000-0000-000000000002', 'Mujeres', 'women', 'Ropa deportiva para mujeres', 2),
    ('c1000000-0000-0000-0000-000000000003', 'Accesorios', 'accessories', 'Accesorios de entrenamiento', 3);

-- Sub-categories
INSERT INTO categories (id, name, slug, description, parent_id, sort_order) VALUES
    ('c2000000-0000-0000-0000-000000000001', 'Lifestyle Hombres', 'lifestyle-men', 'Ropa casual para hombres', 'c1000000-0000-0000-0000-000000000001', 1),
    ('c2000000-0000-0000-0000-000000000002', 'Entrenamiento Hombres', 'training-men', 'Ropa de entrenamiento para hombres', 'c1000000-0000-0000-0000-000000000001', 2),
    ('c2000000-0000-0000-0000-000000000003', 'Performance Mujeres', 'performance-women', 'Ropa de alto rendimiento para mujeres', 'c1000000-0000-0000-0000-000000000002', 1),
    ('c2000000-0000-0000-0000-000000000004', 'Lifestyle Mujeres', 'lifestyle-women', 'Ropa casual para mujeres', 'c1000000-0000-0000-0000-000000000002', 2);

-- =====================================================
-- PRODUCTS - MEN'S COLLECTION
-- =====================================================
INSERT INTO products (sku, name, description, price, category_id, images, sizes, features, is_new) VALUES
(
    'GB-M-001',
    'Sudadera Oversized Esencial',
    'La combinación perfecta de comodidad y estilo. Nuestra Sudadera Oversized Esencial está confeccionada con una mezcla de algodón premium para una suavidad inigualable.',
    1100.00,
    'c2000000-0000-0000-0000-000000000001',
    ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop'],
    ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Mezcla premium de algodón y poliéster', 'Ajuste relajado oversized', 'Puños y dobladillo acanalados', 'Bolsillo canguro'],
    true
),
(
    'GB-M-002',
    'Sudadera Gym Pro',
    'Tu compañera ideal para entrar en calor o para el día a día. Esta sudadera técnica combina estilo urbano con funcionalidad deportiva.',
    1200.00,
    'c2000000-0000-0000-0000-000000000001',
    ARRAY['https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=800&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Interior de felpa suave', 'Capucha ajustable', 'Bolsillo frontal grande', 'Transpirable y cálida'],
    false
),
(
    'GB-M-003',
    'Pantalones Deportivos Track',
    'Versatilidad para dentro y fuera del gym. Estos pantalones track combinan comodidad premium con un look atlético moderno.',
    1200.00,
    'c2000000-0000-0000-0000-000000000002',
    ARRAY['https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Tela elástica 4 direcciones', 'Bolsillos con cierre', 'Cintura elástica con cordón', 'Puños elásticos'],
    false
),
(
    'GB-M-004',
    'Tank Top Muscle Fit',
    'Diseñada para mostrar tu progreso. Esta tank top de corte muscle fit resalta tu físico mientras te mantiene fresco durante los entrenamientos más intensos.',
    650.00,
    'c2000000-0000-0000-0000-000000000002',
    ARRAY['https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Corte muscle fit', 'Tela ultra-ligera', 'Secado rápido', 'Costuras reforzadas'],
    true
),
(
    'GB-M-005',
    'Shorts Performance Pro',
    'Libertad de movimiento total. Estos shorts de alto rendimiento cuentan con tela elástica y bolsillos seguros para tus llaves y teléfono.',
    850.00,
    'c2000000-0000-0000-0000-000000000002',
    ARRAY['https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?q=80&w=800&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    ARRAY['Tela elástica 4-way stretch', 'Forro interior de compresión', 'Bolsillos laterales con cierre', 'Cintura elástica con cordón'],
    false
),
(
    'GB-M-006',
    'Playera Compression Elite',
    'Compresión muscular que mejora la circulación y reduce la fatiga. Ideal para entrenamientos de alta intensidad y competencias.',
    750.00,
    'c2000000-0000-0000-0000-000000000002',
    ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Compresión graduada', 'Tela anti-microbiana', 'Costuras planas anti-roce', 'Protección UV UPF 50+'],
    false
);

-- =====================================================
-- PRODUCTS - WOMEN'S COLLECTION
-- =====================================================
INSERT INTO products (sku, name, description, price, category_id, images, sizes, features, is_new) VALUES
(
    'GB-W-001',
    'Mallas Seamless High-Rise',
    'Diseñadas para el máximo rendimiento. Estas mallas sin costuras de cintura alta brindan compresión donde más la necesitas.',
    900.00,
    'c2000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop'],
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    ARRAY['Construcción sin costuras', 'Cintura alta', 'Tejido a prueba de sentadillas', 'Absorción de humedad'],
    true
),
(
    'GB-W-002',
    'Set Deportivo Pink',
    'Destaca en el gimnasio con este set coordinado de alto rendimiento. Incluye top deportivo de soporte medio y leggings con tecnología seamless para máxima comodidad.',
    1300.00,
    'c2000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop'],
    ARRAY['XS', 'S', 'M', 'L'],
    ARRAY['Tecnología absorbe-sudor', 'Tejido elástico 4-way stretch', 'Soporte medio compresivo', 'Cintura alta favorecedora'],
    false
),
(
    'GB-W-003',
    'Sports Bra High Impact',
    'Soporte máximo para entrenamientos de alto impacto. Diseño encapsulado que reduce el movimiento hasta un 75%.',
    800.00,
    'c2000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop'],
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    ARRAY['Soporte de alto impacto', 'Tirantes ajustables', 'Banda inferior reforzada', 'Copas removibles'],
    true
),
(
    'GB-W-004',
    'Crop Top Seamless',
    'Comodidad y estilo en un solo diseño. Este crop top seamless es perfecto para yoga, pilates o tu día a día activo.',
    700.00,
    'c2000000-0000-0000-0000-000000000004',
    ARRAY['https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop'],
    ARRAY['XS', 'S', 'M', 'L'],
    ARRAY['Construcción sin costuras', 'Largo cropped favorecedor', 'Soporte ligero integrado', 'Tela ultra-suave'],
    false
),
(
    'GB-W-005',
    'Leggings Push-Up',
    'Realza tus curvas con estos leggings de efecto push-up. Tecnología de compresión estratégica que esculpe tu silueta.',
    950.00,
    'c2000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop'],
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    ARRAY['Efecto push-up en glúteos', 'Cintura alta moldeadora', 'Tejido a prueba de sentadillas', 'Bolsillo lateral para celular'],
    false
),
(
    'GB-W-006',
    'Hoodie Cropped',
    'Estilo urbano con un toque fitness. Esta hoodie cropped es perfecta para antes y después del gym, o para tus días de descanso activo.',
    1050.00,
    'c2000000-0000-0000-0000-000000000004',
    ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'],
    ARRAY['XS', 'S', 'M', 'L'],
    ARRAY['Corte cropped moderno', 'Interior de felpa suave', 'Capucha con cordón', 'Bolsillo canguro'],
    false
);

-- =====================================================
-- PRODUCTS - ACCESSORIES
-- =====================================================
INSERT INTO products (sku, name, description, price, category_id, images, sizes, features, is_new) VALUES
(
    'GB-A-001',
    'Cinturón de Levantamiento',
    'Soporte profesional para tus levantamientos más pesados. Fabricado con cuero premium de 10mm para máxima estabilidad del core.',
    1500.00,
    'c1000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL'],
    ARRAY['Cuero genuino de 10mm', 'Hebilla de acero inoxidable', 'Ancho uniforme de 10cm', 'Costuras reforzadas'],
    false
),
(
    'GB-A-002',
    'Banda de Resistencia Pro',
    'Set completo de bandas de resistencia para entrenamiento en casa o gimnasio. Incluye 5 niveles de resistencia para progresión gradual.',
    450.00,
    'c1000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=800&auto=format&fit=crop'],
    ARRAY['Set Completo'],
    ARRAY['5 niveles de resistencia', 'Látex natural premium', 'Asas acolchadas incluidas', 'Bolsa de transporte'],
    true
),
(
    'GB-A-003',
    'Thermo Premium',
    'Mantén tu hidratación a la temperatura perfecta. Este termo de acero inoxidable premium mantiene tus bebidas frías por 24 horas o calientes por 12 horas.',
    650.00,
    'c1000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?q=80&w=800&auto=format&fit=crop'],
    ARRAY['500ml', '750ml', '1L'],
    ARRAY['Acero inoxidable premium', 'Tecnología de doble pared al vacío', 'Tapa hermética anti-derrames', 'Diseño ergonómico'],
    false
),
(
    'GB-A-004',
    'Mochila Gym Pro',
    'Todo lo que necesitas, organizado. Esta mochila cuenta con compartimento para zapatos, bolsillo para laptop y múltiples bolsillos organizadores.',
    1800.00,
    'c1000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'],
    ARRAY['Único'],
    ARRAY['Compartimento para zapatos ventilado', 'Bolsillo para laptop 15"', 'Material resistente al agua', 'Correas acolchadas'],
    false
),
(
    'GB-A-005',
    'Straps de Muñeca',
    'Soporte extra para tus muñecas durante levantamientos pesados. Diseño ergonómico con ajuste personalizable.',
    350.00,
    'c1000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop'],
    ARRAY['Único'],
    ARRAY['Algodón premium', 'Cierre de velcro', 'Bucle para pulgar', 'Par incluido'],
    false
),
(
    'GB-A-006',
    'Toalla Microfibra XL',
    'Ultra absorbente y de secado rápido. Esta toalla de microfibra es perfecta para el gym, yoga o cualquier actividad deportiva.',
    400.00,
    'c1000000-0000-0000-0000-000000000003',
    ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'],
    ARRAY['XL'],
    ARRAY['Microfibra premium', 'Secado ultra-rápido', 'Compacta y ligera', 'Incluye bolsa de transporte'],
    false
);
