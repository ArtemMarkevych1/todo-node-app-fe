const API_URL = import.meta.env.VITE_API_KEY


class TodoApi {

    static async fetchTodos() {
        const response = await fetch(`${API_URL}/todos`)
        return response.json()
    }

    static async addTodo(text) {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        return response.json();
    }

    static async toggleTodo(id, completed) {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        });
        return response.json();
    }

    static async deleteTodo(id) {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }
}

export default TodoApi;