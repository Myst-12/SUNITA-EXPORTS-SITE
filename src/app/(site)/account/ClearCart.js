'use client';

import { useEffect } from 'react';
import { clearCart } from '@/lib/shop/cart';

/** Empties the browser's order once the server has confirmed it was placed. */
export default function ClearCart() {
  useEffect(() => { clearCart(); }, []);
  return null;
}
