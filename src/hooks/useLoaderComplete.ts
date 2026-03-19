'use client';

import { useState, useCallback } from 'react';

export function useLoaderComplete() {
  const [isComplete, setIsComplete] = useState(false);

  const onComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  return { isLoaderComplete: isComplete, onLoaderComplete: onComplete };
}
