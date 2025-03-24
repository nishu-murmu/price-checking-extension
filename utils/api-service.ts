// utils/api-service.ts

interface RequestOptions {
  method: string;
  headers?: { [key: string]: string };
  body?: string;
}

const api = {
  get: async (url: string, headers?: { [key: string]: string }) => {
    const options: RequestOptions = {
      method: "GET",
      headers,
    };
    return await fetch(url, options).then((r) => r.json());
  },

  post: async (url: string, data: any, headers?: { [key: string]: string }) => {
    const options: RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    };
    return await fetch(url, options).then((r) => r.json());
  },
};

export default api;
