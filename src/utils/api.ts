import { useAuthStore } from '../stores/auth';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Функция обновления токена
async function refreshAccessToken(): Promise<boolean> {
  const auth = useAuthStore();
  try {
    await auth.refresh();     // используем существующий метод refresh
    return true;
  } catch {
    auth.logout();
    return false;
  }
}

// Обёртка для fetch с автоматическим обновлением токена
export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const auth = useAuthStore();
  
  // Функция выполнения запроса с текущим токеном
  const performRequest = async (retry = false): Promise<Response> => {
    const headers = {
      'Content-Type': 'application/json',
      ...(auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {}),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    // Если получили 401 и это первая попытка – пробуем обновить токен
    if (response.status === 401 && !retry) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Повторяем запрос с новым токеном
        return performRequest(true);
      }
    }
    return response;
  };

  return performRequest();
}