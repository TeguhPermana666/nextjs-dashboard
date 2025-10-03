import { fetchRevenue } from '@/app/lib/data';
import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default async function RevenueChart() {
  const chartHeight = 350;
  const revenue = await fetchRevenue();
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="relative mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" style={{ height: `${chartHeight}px` }}>
          {/* Y-axis with grid lines */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: '100%' }}
          >
            {yAxisLabels.map((label) => (
              <div key={label} className="relative w-full">
                <p className="absolute -top-3">{label}</p>
                <div className="absolute w-[105%] border-t border-gray-200 border-dashed -right-2 top-0" />
              </div>
            ))}
          </div>
          
          {/* Chart bars */}
          {revenue.map((month) => (
            <div key={month.month} className="group relative flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-400 hover:bg-blue-500"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              >
                {/* Tooltip for better UX */}
                <div className="
                  absolute bottom-full mb-2 hidden w-24
                  rounded-md bg-gray-800 p-2 text-center text-xs text-white
                  group-hover:block
                ">
                  ${(month.revenue / 100).toLocaleString()}
                </div>
              </div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}