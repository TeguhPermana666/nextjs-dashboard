// app/ui/dashboard/cards.tsx

import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import Link from 'next/link'; // Import Link for navigation

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

// CardWrapper can remain the same, as it's just fetching and passing data.
export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  );
}

// Color and link mapping for improved UI/UX
const cardConfig = {
    collected: {
        bgColor: 'bg-green-50',
        href: '/dashboard/invoices?status=paid'
    },
    pending: {
        bgColor: 'bg-yellow-50',
        href: '/dashboard/invoices?status=pending'
    },
    invoices: {
        bgColor: 'bg-blue-50',
        href: '/dashboard/invoices'
    },
    customers: {
        bgColor: 'bg-violet-50',
        href: '/dashboard/customers'
    }
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];
  const {bgColor, href} = cardConfig[type];

  return (
    <Link href={href} className={`
        ${bgColor}
        rounded-xl p-4 shadow-sm 
        transition-transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-500
    `}>
      <div className="flex items-center">
        {Icon && <Icon className="h-5 w-5 text-gray-700" />}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={`
        ${lusitana.className}
        truncate text-3xl font-semibold mt-4 text-gray-900
      `}>
        {value}
      </p>
    </Link>
  );
}