const { database } = require('../config/firebase');

class FirebaseModels {
  // Users Collection
  static async createUser(userData) {
    try {
      const userId = database.ref('users').push().key;
      await database.ref(`users/${userId}`).set({
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return { id: userId, ...userData };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async getUserByPhone(phone) {
    try {
      const snapshot = await database.ref('users')
        .orderByChild('phone')
        .equalTo(phone)
        .once('value');
      
      const users = [];
      snapshot.forEach(child => {
        users.push({ id: child.key, ...child.val() });
      });
      return users[0] || null;
    } catch (error) {
      console.error('Error getting user by phone:', error);
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const snapshot = await database.ref(`users/${userId}`).once('value');
      return snapshot.exists() ? { id: userId, ...snapshot.val() } : null;
    } catch (error) {
      console.error('Error getting user by id:', error);
      throw error;
    }
  }

  static async updateUser(userId, updates) {
    try {
      await database.ref(`users/${userId}`).update({
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      return { id: userId, ...updates };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Products Collection
  static async createProduct(productData) {
    try {
      const productId = database.ref('products').push().key;
      await database.ref(`products/${productId}`).set({
        ...productData,
        createdAt: new Date().toISOString(),
      });
      return { id: productId, ...productData };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async getAllProducts() {
    try {
      const snapshot = await database.ref('products').once('value');
      const products = [];
      snapshot.forEach(child => {
        products.push({ id: child.key, ...child.val() });
      });
      return products;
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  }

  static async getProductById(productId) {
    try {
      const snapshot = await database.ref(`products/${productId}`).once('value');
      return snapshot.exists() ? { id: productId, ...snapshot.val() } : null;
    } catch (error) {
      console.error('Error getting product by id:', error);
      throw error;
    }
  }

  static async updateProduct(productId, updates) {
    try {
      await database.ref(`products/${productId}`).update(updates);
      return { id: productId, ...updates };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Orders Collection
  static async createOrder(orderData) {
    try {
      const orderId = database.ref('orders').push().key;
      await database.ref(`orders/${orderId}`).set({
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
      return { id: orderId, ...orderData };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  static async getOrdersByUserId(userId) {
    try {
      const snapshot = await database.ref('orders')
        .orderByChild('userId')
        .equalTo(userId)
        .once('value');
      
      const orders = [];
      snapshot.forEach(child => {
        orders.push({ id: child.key, ...child.val() });
      });
      return orders;
    } catch (error) {
      console.error('Error getting orders by user:', error);
      throw error;
    }
  }

  static async getOrderById(orderId) {
    try {
      const snapshot = await database.ref(`orders/${orderId}`).once('value');
      return snapshot.exists() ? { id: orderId, ...snapshot.val() } : null;
    } catch (error) {
      console.error('Error getting order by id:', error);
      throw error;
    }
  }

  static async updateOrder(orderId, updates) {
    try {
      await database.ref(`orders/${orderId}`).update({
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      return { id: orderId, ...updates };
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  static async getAllOrders() {
    try {
      const snapshot = await database.ref('orders').once('value');
      const orders = [];
      snapshot.forEach(child => {
        orders.push({ id: child.key, ...child.val() });
      });
      return orders;
    } catch (error) {
      console.error('Error getting all orders:', error);
      throw error;
    }
  }

  // Cart Collection
  static async saveCart(userId, cartItems) {
    try {
      await database.ref(`carts/${userId}`).set({
        items: cartItems,
        updatedAt: new Date().toISOString(),
      });
      return { items: cartItems };
    } catch (error) {
      console.error('Error saving cart:', error);
      throw error;
    }
  }

  static async getCart(userId) {
    try {
      const snapshot = await database.ref(`carts/${userId}`).once('value');
      return snapshot.exists() ? snapshot.val() : { items: [] };
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  }

  // Reviews Collection
  static async createReview(reviewData) {
    try {
      const reviewId = database.ref('reviews').push().key;
      await database.ref(`reviews/${reviewId}`).set({
        ...reviewData,
        createdAt: new Date().toISOString(),
      });
      return { id: reviewId, ...reviewData };
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

  static async getReviewsByProductId(productId) {
    try {
      const snapshot = await database.ref('reviews')
        .orderByChild('productId')
        .equalTo(productId)
        .once('value');
      
      const reviews = [];
      snapshot.forEach(child => {
        reviews.push({ id: child.key, ...child.val() });
      });
      return reviews;
    } catch (error) {
      console.error('Error getting reviews:', error);
      throw error;
    }
  }
}

module.exports = FirebaseModels;
