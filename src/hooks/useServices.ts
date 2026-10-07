/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ServiceItem } from '../types';
import { subscribeToServices } from '../lib/db';

export function useServices(includeUnpublished = false) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToServices((items) => {
      const filtered = includeUnpublished ? items : items.filter((s) => s.published);
      setServices(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [includeUnpublished]);

  return { services, loading };
}
