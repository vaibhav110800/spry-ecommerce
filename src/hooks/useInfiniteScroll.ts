import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Throttles a callback so it can only fire once per `delay` ms,
 * regardless of how often the returned function is invoked.
 */
const useThrottle = (callback: () => void, delay: number) => {
  const lastRun = useRef(0);

  return useCallback(() => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      callback();
    }
  }, [callback, delay]);
};

interface UseInfiniteScrollParams {
  totalItems: number;
  batchSize: number;
  /** Changes to this value reset visibleCount back to one batch (e.g. filters/sort changed) */
  resetKey: string;
  throttleDelay?: number;
}

/**
 * Progressively reveals items from an already-loaded list as the user
 * scrolls, using an IntersectionObserver on a sentinel element and a
 * throttled loader to avoid rapid-fire triggers.
 */
export const useInfiniteScroll = ({
  totalItems,
  batchSize,
  resetKey,
  throttleDelay = 300,
}: UseInfiniteScrollParams) => {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset back to the first batch whenever filters/sort/search change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(batchSize);
  }, [resetKey, batchSize]);

  // Callback function to load more products
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + batchSize, totalItems));
  }, [batchSize, totalItems]);

  const throttledLoadMore = useThrottle(loadMore, throttleDelay);

  useEffect(() => {
    const node = sentinelRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          throttledLoadMore();
        }
      },
      { rootMargin: "200px" }, // start loading slightly before it's on-screen
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [throttledLoadMore, visibleCount, totalItems]);

  return {
    visibleCount,
    sentinelRef,
    hasMore: visibleCount < totalItems,
  };
};
