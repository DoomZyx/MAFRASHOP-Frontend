import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { useAuth } from "../hooks/useAuth";

interface WebSocketMessage {
  event: string;
  data: any;
}

interface WebSocketContextType {
  subscribe: (event: string, callback: (data: any) => void) => () => void;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("authToken");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const [isConnected, setIsConnected] = useState(false);

  // Store pour les callbacks par événement
  const subscribersRef = useRef<Map<string, Set<(data: any) => void>>>(
    new Map()
  );

  const subscribe = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (!subscribersRef.current.has(event)) {
        subscribersRef.current.set(event, new Set());
      }
      subscribersRef.current.get(event)!.add(callback);

      // Retourner une fonction pour se désabonner
      return () => {
        const eventSubscribers = subscribersRef.current.get(event);
        if (eventSubscribers) {
          eventSubscribers.delete(callback);
        }
      };
    },
    []
  );

  const connect = useCallback(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const wsUrl = `ws://mafrashop-backend.onrender.com/ws?token=${encodeURIComponent(token)}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket connecté");
        reconnectAttempts.current = 0;
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          // Notifier tous les subscribers de cet événement
          const eventSubscribers = subscribersRef.current.get(message.event);
          if (eventSubscribers) {
            eventSubscribers.forEach((callback) => {
              try {
                callback(message.data);
              } catch (error) {
                console.error(
                  `Erreur dans le callback pour ${message.event}:`,
                  error
                );
              }
            });
          }

          // Gérer l'événement "connected"
          if (message.event === "connected") {
            console.log("WebSocket:", message.data.message);
          }
        } catch (error) {
          console.error("Erreur lors du parsing du message WebSocket:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("Erreur WebSocket:", error);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log("WebSocket déconnecté");
        wsRef.current = null;
        setIsConnected(false);

        // Tentative de reconnexion
        if (
          reconnectAttempts.current < maxReconnectAttempts &&
          isAuthenticated
        ) {
          reconnectAttempts.current += 1;
          const delay = Math.min(
            1000 * Math.pow(2, reconnectAttempts.current),
            30000
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(
              `Tentative de reconnexion WebSocket (${reconnectAttempts.current}/${maxReconnectAttempts})...`
            );
            connect();
          }, delay);
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Erreur lors de la connexion WebSocket:", error);
      setIsConnected(false);
    }
  }, [isAuthenticated, token]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
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

  return (
    <WebSocketContext.Provider value={{ subscribe, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      "useWebSocketContext doit être utilisé à l'intérieur d'un WebSocketProvider"
    );
  }
  return context;
}
