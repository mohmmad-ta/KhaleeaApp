import AsyncStorage from '@react-native-async-storage/async-storage';

class WebSocketService {
    socket: WebSocket | null = null;

    async connect() {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) return;

        this.socket = new WebSocket(`ws://localhost:7060?token=${token}`);

        this.socket.onopen = () => {
            console.log('✅ WebSocket connected');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'new-order') {
                console.log('📦 New order:', data.data);
            }
        };

        this.socket.onerror = (err) => {
            console.error('❌ WebSocket error:', err);
        };

        this.socket.onclose = () => {
            console.log('❎ WebSocket closed');
        };
    }

    send(message: object) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not connected');
        }
    }

    close() {
        this.socket?.close();
    }
}

export default new WebSocketService(); // 👈 singleton instance
