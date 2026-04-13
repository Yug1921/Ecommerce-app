import axios from "axios";

const productAPI = axios.create({
  baseURL: "https://fakestoreapi.com"
});

const backendBaseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const backendAPI = axios.create({
  baseURL: `${backendBaseURL}/api`
});

const normalizeImageUrl = (imagePath) => {
  if (!imagePath) {
    return imagePath;
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  return `${backendBaseURL}${imagePath}`;
};

export const setAuthToken = (token) => {
  if (token) {
    backendAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete backendAPI.defaults.headers.common.Authorization;
};

const storedToken = localStorage.getItem('authToken');
if (storedToken) {
  setAuthToken(storedToken);
}

export const getProducts = () => productAPI.get("/products");
export const getProduct = (id) => productAPI.get(`/products/${id}`);
export const getCatalogProducts = () => backendAPI.get('/products');
export const getCatalogProduct = (id) => backendAPI.get(`/products/${id}`);

export const getStorefrontProducts = async () => {
  const [remoteProductsResponse, customProductsResponse] = await Promise.all([
    getProducts(),
    getCatalogProducts()
  ]);

  const customProducts = customProductsResponse.data.data.products.map((product) => ({
    ...product,
    image: normalizeImageUrl(product.image),
    source: 'custom'
  }));

  const remoteProducts = remoteProductsResponse.data.map((product) => ({
    ...product,
    source: 'remote'
  }));

  return [...customProducts, ...remoteProducts];
};

export const getStorefrontProductById = async (id) => {
  if (id.startsWith('local-')) {
    const response = await getCatalogProduct(id);
    return {
      ...response.data.data.product,
      image: normalizeImageUrl(response.data.data.product.image),
      source: 'custom'
    };
  }

  const response = await getProduct(id);
  return {
    ...response.data,
    source: 'remote'
  };
};

export const registerUser = (payload) => backendAPI.post('/auth/register', payload);
export const loginUser = (payload) => backendAPI.post('/auth/login', payload);
export const getCurrentUser = () => backendAPI.get('/auth/me');
export const createMockPayment = (payload) => backendAPI.post('/payments/mock', payload);

export const uploadProductImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return backendAPI.post('/uploads/product-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const createCatalogProduct = ({ title, description, price, image }) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('image', image);

  return backendAPI.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};