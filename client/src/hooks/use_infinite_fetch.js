import React from 'react';
import { useInfiniteQuery } from 'react-query';

const LIMIT = 10;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch(apiPath, fetcher) {
  const { data, error, fetchNextPage, isLoading } = useInfiniteQuery(
    apiPath,
    ({ pageParam }) => {
      const { offset } = pageParam ?? { offset: 0 };
      const url = new URL(apiPath, location.href);
      url.searchParams.set('offset', offset);
      url.searchParams.set('limit', LIMIT);

      return fetcher(url);
    },
    {
      getNextPageParam: (data, pages) => {
        if (data.length === 0) { return undefined }
        return { offset: pages.flat().length,  }
      },
      retry: false,
    },
  );

  const flattenData = React.useMemo(() => data?.pages.flat() ?? [], [data])

  return {
    data: flattenData,
    error,
    isLoading,
    fetchMore: fetchNextPage,
  }
}
