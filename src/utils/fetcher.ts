export const fetcher = async <T>(
  url: string,
  method: string = "GET",
  body: object | null = null,
  headers: HeadersInit = {}
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, options);
  return response.json();
};
