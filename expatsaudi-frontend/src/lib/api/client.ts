const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

interface ApiError {
  code: string;
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export async function apiClient<T>(
  endpoint: string,
  init?: RequestInit,
): Promise<T> {
const url = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

console.log('BASE_URL:', BASE_URL);
console.log('Endpoint:', endpoint);
console.log('Final URL:', url);


  const response = await fetch(url, {
    ...init,

    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },

    next: {
      revalidate: 60,
    },
  });


  console.log(
  'Content-Type:',
  response.headers.get('content-type'),
);

  const contentType =
    response.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    const text = await response.text();

    console.error(text);

    throw new Error(
      `Expected JSON but received ${contentType}`,
    );
  }

const json = await response.json();

console.log('Status:', response.status);
console.log('Response:', json);

if (!response.ok || !json.success) {
  throw new Error(
    json.error?.message ??
    'Unexpected API error.',
  );
}

return json.data;
}