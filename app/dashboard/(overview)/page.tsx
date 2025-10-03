// app/dashboard/page.tsx

import CardWrapper from '@/app/dashboard/cards';
import RevenueChart from '@/app/dashboard/revenue-chart';
import LatestInvoices from '@/app/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton, // Renamed for clarity
} from '@/app/ui/skeletons';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Dashboard',
}
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      
      {/* Cards Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      
      {/* Main Content Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
         <Suspense fallback={<RevenueChartSkeleton />}>
           {/* RevenueChart now correctly spans 4/8 columns on medium+ screens */}
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
           {/* LatestInvoices now correctly spans 4/8 columns on medium+ screens */}
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}