const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async (id = null) => {
  const endpoint = id ? `${BASE_URL}/products/${id}` : `${BASE_URL}/products`;
  const res = await fetch(endpoint);
  
  if (!res.ok) {
    throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
  }
  
  return await res.json();
};

export const createProduct = async (productData) => {
  const { title, price, category } = productData;
  
  // Usamos spread para armar el payload asegurando los tipos correspondientes
  const payload = {
    ...{ title, category },
    price: Number(price),
    description: `Producto ${title} creado desde CLI`,
    image: 'https://i.pravatar.cc'
  };

  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`Error al crear producto: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error(`Error al eliminar producto: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};