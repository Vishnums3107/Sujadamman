import api from './api';

// Auth Services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/api/auth/profile', userData);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },
};

// Product Services
export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/api/products', { params });
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/api/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/api/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  },

  uploadImages: async (id, formData, options = {}) => {
    const response = await api.post(`/api/products/${id}/images`, formData, {
      params: options,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteImage: async (id, imageUrl) => {
    const response = await api.delete(`/api/products/${id}/images`, {
      data: { imageUrl },
    });
    return response.data;
  },
};

// Category Services
export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/api/categories');
    return response.data;
  },

  getCategory: async (id) => {
    const response = await api.get(`/api/categories/${id}`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/api/categories', categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/api/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/api/categories/${id}`);
    return response.data;
  },

  uploadImage: async (id, formData) => {
    const response = await api.post(`/api/categories/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Contact Services
export const contactService = {
  submitContact: async (contactData) => {
    const response = await api.post('/api/contact', contactData);
    return response.data;
  },

  getContacts: async (params = {}) => {
    const response = await api.get('/api/contact', { params });
    return response.data;
  },

  getContact: async (id) => {
    const response = await api.get(`/api/contact/${id}`);
    return response.data;
  },

  updateContactStatus: async (id, status) => {
    const response = await api.put(`/api/contact/${id}`, { status });
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await api.delete(`/api/contact/${id}`);
    return response.data;
  },
};

// Service Services
export const serviceService = {
  getServices: async (params = {}) => {
    const response = await api.get('/api/services', { params });
    return response.data;
  },

  getService: async (id) => {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await api.post('/api/services', serviceData);
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const response = await api.put(`/api/services/${id}`, serviceData);
    return response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/api/services/${id}`);
    return response.data;
  },
};
