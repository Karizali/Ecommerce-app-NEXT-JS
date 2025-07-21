    'use client';
    import { useParams } from 'next/navigation';

export default function Product() {
  const params = useParams();
  const { Id } = params;
  return (
    <>
      <h1>Product</h1>
      <div className="w-1/2">
      Prouct {Id}
      </div>
    </>
  )
}
