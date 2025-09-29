import { Card } from '@/app/dashboard/cards';
import RevenueChart from './revenue-chart';
import LatestInvoices from './latest-invoices';
import { lusitana } from '../ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '../lib/data';
export default async function Page(){
    const revenue = await fetchRevenue();
    const latestInvoices = await  fetchLatestInvoices();
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <Card title="Collected" value={totalPaidInvoices} type='collected'/>
                <Card title="Pending" value={totalPaidInvoices} type='pending'/>
                <Card title="Total Invoices" value={numberOfInvoices} type='invoices'/>
                <Card title="Total Customers" value={numberOfCustomers} type='customers'/>
            </div>
            <div className='mt-6 gap-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 '>
                <RevenueChart revenue={revenue}/>
                <LatestInvoices latestInvoices={latestInvoices}/>
            </div>
        </main>
    )
}