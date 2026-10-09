import { getProducts, createProduct, deleteProduct } from './api.js';

// Extraemos los argumentos omitiendo los ejecutables (node y ruta al script)
const [, , methodArg, resourceArg, ...extraArgs] = process.argv;

const run = async () => {
  if (!methodArg || !resourceArg) {
    console.error('Uso: npm run start <METODO> <RECURSO> [...ARGUMENTOS]');
    console.error('Ejemplos:');
    console.error('  npm run start GET products');
    console.error('  npm run start GET products/15');
    console.error('  npm run start POST products "Remera Rex" 300 remeras');
    console.error('  npm run start DELETE products/7');
    process.exit(1);
  }

  const method = methodArg.toUpperCase();
  
  // Dividimos la cadena del recurso para extraer la entidad y el ID si existe
  const [resource, id] = resourceArg.split('/');

  if (resource !== 'products') {
    console.error(`Recurso no soportado: ${resource}. Solo soportamos "products".`);
    process.exit(1);
  }

  try {
    switch (method) {
      case 'GET': {
        const result = await getProducts(id);
        console.log('Resultado GET:');
        console.dir(result, { depth: null, colors: true });
        break;
      }

      case 'POST': {
        const [title, price, category] = extraArgs;

        if (!title || !price || !category) {
          console.error('Faltan parámetros para POST. Uso: POST products <title> <price> <category>');
          process.exit(1);
        }

        const newProduct = await createProduct({ title, price, category });
        console.log('Producto creado con éxito:');
        console.dir(newProduct, { depth: null, colors: true });
        break;
      }

      case 'DELETE': {
        if (!id) {
          console.error('Debes indicar un ID para DELETE. Ejemplo: products/7');
          process.exit(1);
        }

        const deleted = await deleteProduct(id);
        console.log(`Producto ${id} eliminado con éxito:`);
        console.dir(deleted, { depth: null, colors: true });
        break;
      }

      default:
        console.error(`Método HTTP "${method}" no soportado.`);
        process.exit(1);
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);
    process.exit(1);
  }
};

run();