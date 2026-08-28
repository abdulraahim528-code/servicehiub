// Small helper used by client components that call our own /api/* routes.
// A plain `fetch(url).then(res => res.json())` throws a cryptic
// "Unexpected token '<' ... is not valid JSON" error whenever the server
// returns an HTML page instead of JSON (a 404 page, a 500 error page, a
// login redirect, etc). This wrapper checks the response first and logs
// the *real* problem (status code + the first bit of the actual response
// body) so it's obvious what went wrong, instead of a confusing parse error.
export async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error(
        `[fetchJson] ${url} → HTTP ${res.status} ${res.statusText}. ` +
          `Expected JSON but got:\n${text.slice(0, 500)}`
      );
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error(`[fetchJson] ${url} threw an error:`, err);
    return null;
  }
}