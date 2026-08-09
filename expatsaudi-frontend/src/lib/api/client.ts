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
  if (!BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not defined.',
    );
  }

  const url =
    `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  console.log(
    '[API]',
    url,
  );

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

  const contentType =
    response.headers.get('content-type');

  console.log(
    '[API]',
    response.status,
    contentType,
    url,
  );

  if (!contentType?.includes('application/json')) {
    const text = await response.text();

    console.error(
      '[API] Non-JSON response:',
      text,
    );

    throw new Error(
      `Expected JSON but received ${contentType}`,
    );
  }

  const json =
    (await response.json()) as ApiResponse<T>;

  if (!response.ok || !json.success) {
    throw new Error(
      json.error?.message ??
        'Unexpected API error.',
    );
  }

  if (json.data === undefined) {
    throw new Error(
      `API returned no data for ${endpoint}`,
    );
  }

  return json.data;
}