/**
 * Categorías disponibles en la carta VIP de Momart Theatre Cádiz.
 */
export const categorias = [
  { id: 1, nombre: 'Botellas Premium' },
  { id: 2, nombre: 'Copas y Combinados' },
  { id: 3, nombre: 'Hielos y Extras' },
  { id: 4, nombre: 'Cachimbas' },
];

/**
 * Catálogo de productos de la carta VIP relacionados mediante categoriaId.
 */
export const productos = [
  {
    id: 1,
    categoriaId: 1,
    nombre: 'Barceló Añejo 70cl',
    precio: 120,
    refrescosIncluidos: 10,
    stock: true,
    descripcion: 'Ron dominicano añejo servido en mesa con cubitera de hielo, bengala de cortesía y 10 refrescos a elegir.',
  },
  {
    id: 2,
    categoriaId: 1,
    nombre: 'Puerto de Indias Strawberry 70cl',
    precio: 130,
    refrescosIncluidos: 10,
    stock: true,
    descripcion: 'Ginebra sevillana con aroma a fresa natural, acompañada de cubitera, fresas laminadas y 10 tónicas o refrescos.',
  },
  {
    id: 3,
    categoriaId: 1,
    nombre: 'Belvedere Vodka 70cl',
    precio: 190,
    refrescosIncluidos: 10,
    stock: true,
    descripcion: 'Vodka polaco super-premium de centeno Dankowskie, servicio VIP con hielo cristalino y 10 refrescos o energéticos.',
  },
  {
    id: 4,
    categoriaId: 1,
    nombre: 'Moët & Chandon Impérial Brut 75cl',
    precio: 180,
    refrescosIncluidos: 0,
    stock: true,
    descripcion: 'Champagne francés icónico servido bien frío en champanera iluminada con bengala especial de reservado.',
  },
  {
    id: 5,
    categoriaId: 1,
    nombre: 'Johnnie Walker Black Label 70cl',
    precio: 150,
    refrescosIncluidos: 10,
    stock: false,
    descripcion: 'Whisky escocés blended envejecido 12 años, servido con hielo y 10 refrescos incluidos.',
  },
  {
    id: 6,
    categoriaId: 2,
    nombre: 'Copa Nacional',
    precio: 12,
    refrescosIncluidos: 1,
    stock: true,
    descripcion: 'Combinado individual con marcas nacionales estándar (ron, ginebra, vodka o whisky) y refresco de 20cl.',
  },
  {
    id: 7,
    categoriaId: 2,
    nombre: 'Copa Premium',
    precio: 15,
    refrescosIncluidos: 1,
    stock: true,
    descripcion: 'Combinado individual con destilados de gama alta y mixer premium servido en copa balón.',
  },
  {
    id: 8,
    categoriaId: 3,
    nombre: 'Cubitera Hielo Extra',
    precio: 8,
    refrescosIncluidos: 0,
    stock: true,
    descripcion: 'Reposición completa de cubitera VIP con hielo macizo de larga duración para la mesa.',
  },
  {
    id: 9,
    categoriaId: 3,
    nombre: 'Pack 4 Refrescos',
    precio: 16,
    refrescosIncluidos: 4,
    stock: true,
    descripcion: 'Cuatro botellas de refresco o tónica surtidos (cola, limón, naranja, tónica o lima) para completar tu botella.',
  },
  {
    id: 10,
    categoriaId: 4,
    nombre: 'Shisha VIP',
    precio: 35,
    refrescosIncluidos: 0,
    stock: true,
    descripcion: 'Cachimba de acero inoxidable con cazoleta premium, carbón natural y boquillas desechables para todo el reservado.',
  },
  //nuevo producto pedido por marea y comprobado que su id corresponde 
  {
    id: 11,
    categoriaId: 1,
    nombre: 'Vodka Eristoff black 70cl',
    precio: 70,
    refrescosIncluidos: 0,
    stock: true,
    descripcion: 'Vodka Eristoff, vodka originario de Georgia con aromas intensos y dulces y una sensacion en boca sedosa y densa',
  },
];
