import { useQuery } from "react-query";

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch(apiPath, fetcher) {
  const { data, error, isLoading } = useQuery(apiPath, () => fetcher(apiPath), {
    retry: false
  });

  return { data: data ?? null, error, isLoading };
}
