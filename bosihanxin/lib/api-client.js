// 客户端API调用工具
class ApiClient {
  static async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '请求失败');
      }

      return result;
    } catch (error) {
      console.error('API请求错误:', error);
      throw error;
    }
  }

  // 任务管理相关API
  static async getTasks(sessionToken, filters = {}) {
    const params = new URLSearchParams({ sessionToken, ...filters });
    return this.request(`/api/tasks/list?${params}`);
  }

  static async createTask(sessionToken, taskData) {
    return this.request('/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify({ sessionToken, ...taskData }),
    });
  }

  static async updateTask(sessionToken, taskId, updateData) {
    return this.request('/api/tasks/update', {
      method: 'PUT',
      body: JSON.stringify({ sessionToken, taskId, ...updateData }),
    });
  }

  static async deleteTask(sessionToken, taskId) {
    return this.request('/api/tasks/delete', {
      method: 'DELETE',
      body: JSON.stringify({ sessionToken, taskId }),
    });
  }

  // 建议讨论相关API
  static async getSuggestions(sessionToken, filters = {}) {
    const params = new URLSearchParams({ sessionToken, ...filters });
    return this.request(`/api/suggestions/list?${params}`);
  }

  static async createSuggestion(sessionToken, suggestionData) {
    return this.request('/api/suggestions/create', {
      method: 'POST',
      body: JSON.stringify({ sessionToken, ...suggestionData }),
    });
  }

  static async likeSuggestion(sessionToken, suggestionId) {
    return this.request('/api/suggestions/like', {
      method: 'POST',
      body: JSON.stringify({ sessionToken, suggestionId }),
    });
  }

  static async addComment(sessionToken, suggestionId, content, sectId) {
    return this.request('/api/suggestions/comment', {
      method: 'POST',
      body: JSON.stringify({ sessionToken, suggestionId, content, sectId }),
    });
  }
}

export default ApiClient; 