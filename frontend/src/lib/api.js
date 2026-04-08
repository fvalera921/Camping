const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const buildHeaders = (token, hasBody = false) => {
  const headers = {};

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const apiRequest = async (path, options = {}) => {
  const { token, body, headers, ...rest } = options;

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      ...buildHeaders(token, body !== undefined),
      ...headers
    },
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message || "La solicitud ha fallado");
  }

  return data;
};

export const authApi = {
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: credentials
    }),
  register: (payload) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: payload
    })
};

export const accommodationApi = {
  getAll: () => apiRequest("/accommodations"),
  getById: (id) => apiRequest(`/accommodations/${id}`)
};

export const userApi = {
  getMe: (token) =>
    apiRequest("/users/me", {
      token
    }),
  getBookings: (token) =>
    apiRequest("/users/me/bookings", {
      token
    })
};

export const bookingApi = {
  create: (token, payload) =>
    apiRequest("/bookings", {
      method: "POST",
      token,
      body: payload
    })
};

export const adminApi = {
  getBookings: (token) =>
    apiRequest("/admin/bookings", {
      token
    }),
  updateBookingStatus: (token, bookingId, status) =>
    apiRequest(`/admin/bookings/${bookingId}/status`, {
      method: "PATCH",
      token,
      body: { status }
    })
};
