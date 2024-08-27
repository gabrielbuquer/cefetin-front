const USER_AGENT = `${process.env['NEXT_PUBLIC_APP_NAME']}@${process.env['NEXT_PUBLIC_APP_VERSION']}`;

interface FetchAPIOptions {
  storeCookies?: (headers: Headers) => void;
}

export const fetchAPI = async (
  info: RequestInfo,
  init?: RequestInit,
  options?: FetchAPIOptions,
) => {
  const response = await fetch(info, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      'User-Agent': USER_AGENT,
    },
  });

  if (response.ok) {
    if (options?.storeCookies) {
      options.storeCookies(response.headers);
    }

    return response.status !== 204 ? response.json() : undefined;
  }

  const text = await response.text();

  throw new Error(text);
};
