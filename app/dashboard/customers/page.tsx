import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Customers',
}
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  
  // 1. Memanggil fungsi data dari page.tsx untuk mengambil SEMUA customer yang cocok
  const customers = await fetchFilteredCustomers(query);

  return (
    <main>
      {/* 2. Mengirim data 'customers' sebagai prop ke komponen CustomersTable */}
      <CustomersTable customers={customers} />
    </main>
  );
}