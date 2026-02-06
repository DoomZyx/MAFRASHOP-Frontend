import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "./useAuth";

interface WebSocketMessage {
  event: string;
  data: any;
}

interface UseWebSocketOptions {
  onCartUpdate?: (cart: any[]) => void;
  onFavoritesUpdate?: (favorites: any[]) => void;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("authToken");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      // Construire l'URL WebSocket à partir de l'URL de l'API
      const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
      const url = new URL(apiUrl);
      const wsProtocol = url.protocol === "https:" ? "wss" : "ws";
      const wsUrl = `${wsProtocol}://${url.host}/api/ws?token=${encodeURIComponent(token)}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket connecté");
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          
          switch (message.event) {
            case "connected":
              console.log("WebSocket:", message.data.message);
              break;
            case "cart:updated":
              if (options.onCartUpdate) {
                options.onCartUpdate(message.data.cart);
              }
              break;
            case "favorites:updated":
              if (options.onFavoritesUpdate) {
                options.onFavoritesUpdate(message.data.favorites);
              }
              break;
            default:
              console.log("Événement WebSocket non géré:", message.event);
          }
        } catch (error) {
          console.error("Erreur lors du parsing du message WebSocket:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("❌ Erreur WebSocket:", error);
      };

      ws.onclose = () => {
        console.log("🔌 WebSocket déconnecté");
        wsRef.current = null;

        // Tentative de reconnexion
        if (reconnectAttempts.current < maxReconnectAttempts && isAuthenticated) {
          reconnectAttempts.current += 1;
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`Tentative de reconnexion WebSocket (${reconnectAttempts.current}/${maxReconnectAttempts})...`);
            connect();
          }, delay);
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Erreur lors de la connexion WebSocket:", error);
    }
  }, [isAuthenticated, token, options]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && token) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isAuthenticated, token, connect, disconnect]);

  return { connect, disconnect };
}

