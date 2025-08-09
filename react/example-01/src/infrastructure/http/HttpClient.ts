export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async get<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(this.url(path), {
      method: 'GET',
      headers: { 'Accept': 'application/json', ...(init?.headers ?? {}) },
      ...init,
    });
    return this.handle<T>(res);
  }

  async post<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    const res = await fetch(this.url(path), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...init,
    });
    return this.handle<T>(res);
  }

  private url(path: string): string {
    if (!path.startsWith('/')) return `${this.baseUrl}/${path}`;
    return `${this.baseUrl}${path}`;
  }

  private async handle<T>(res: Response): Promise<T> {
    const contentType = res.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      const message = (isJson && typeof data === 'object' && data && 'message' in data)
        ? String((data as any).message)
        : `HTTP ${res.status}`;
      throw new HttpError(message, res.status, data);
    }
    return data as T;
  }
} 