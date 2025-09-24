import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import "leaflet/dist/leaflet.css";

import { motion } from "framer-motion";
import AdminMap from "../../components/admin/AdminMap";
import KpiRow from "../../components/admin/KpiRow";


export default function UomoDashboard() {


  const salesByDay = [
    { name: "Mon", Online: 400, InStore: 600 },
    { name: "Tue", Online: 500, InStore: 700 },
    { name: "Wed", Online: 650, InStore: 540 },
    { name: "Thu", Online: 700, InStore: 810 },
    { name: "Fri", Online: 900, InStore: 950 },
    { name: "Sat", Online: 1200, InStore: 1350 },
    { name: "Sun", Online: 800, InStore: 700 },
  ];

  const monthly = [
    { name: "Jan", Tops: 4000, Bottoms: 2400, Accessories: 2400 },
    { name: "Feb", Tops: 3000, Bottoms: 1398, Accessories: 2210 },
    { name: "Mar", Tops: 2000, Bottoms: 9800, Accessories: 2290 },
    { name: "Apr", Tops: 2780, Bottoms: 3908, Accessories: 2000 },
    { name: "May", Tops: 1890, Bottoms: 4800, Accessories: 2181 },
    { name: "Jun", Tops: 2390, Bottoms: 3800, Accessories: 2500 },
    { name: "Jul", Tops: 3490, Bottoms: 4300, Accessories: 2100 },
  ];

  const storePerf = [
    { subject: "Conversion", A: 120, fullMark: 150 },
    { subject: "Avg Order", A: 98, fullMark: 150 },
    { subject: "Return Rate", A: 86, fullMark: 150 },
    { subject: "Stock", A: 99, fullMark: 150 },
    { subject: "Traffic", A: 85, fullMark: 150 },
  ];

  return (
    <div className="min-h-screen p-6 text-gray-100">
      <header className="max-w-7xl mx-auto mb-6">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Uomo — Admin Dashboard
            </h1>
          </div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto grid gap-6">
        {/* KPI row */}
        <section className="">
          <KpiRow />
        </section>

        {/* Charts + Map grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="col-span-2 bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">
                Weekly Sales Breakdown
              </h2>
              <div className="text-xs text-gray-400">Online vs In-Store</div>
            </div>

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={salesByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="InStore" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="Online" stackId="a" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <AdminMap />

        </section>

        {/*Radar charts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700 col-span-2 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">
                Monthly Revenue Trend
              </h3>
              <div className="text-xs text-gray-400">By category</div>
            </div>

            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <AreaChart data={monthly}>
                  <defs>
                    <linearGradient id="colorTops" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorBottoms"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Tops"
                    stackId="1"
                    fill="url(#colorTops)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Bottoms"
                    stackId="1"
                    fill="url(#colorBottoms)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Accessories"
                    stackId="1"
                    fill="#f59e0b"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Store Health</h3>
              <div className="text-xs text-gray-400">Composite metrics</div>
            </div>

            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <RadarChart outerRadius={80} data={storePerf}>
                  <PolarGrid stroke="#555" />
                  <PolarAngleAxis dataKey="subject" stroke="#ccc" />
                  <PolarRadiusAxis stroke="#ccc" />
                  <Radar
                    name="Uomo"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>

        {/* Recent orders table */}
        <motion.section
          className="bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700 hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recent Orders</h3>
            <div className="text-xs text-gray-400">Latest 10 transactions</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-700">
                  <th className="py-2">Order</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Channel</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-3">#00124</td>
                  <td className="py-3">Alex Moreno</td>
                  <td className="py-3">Online</td>
                  <td className="py-3">$120.00</td>
                  <td className="py-3 text-green-400">Completed</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-3">#00123</td>
                  <td className="py-3">Selin Y.</td>
                  <td className="py-3">In-Store</td>
                  <td className="py-3">$89.00</td>
                  <td className="py-3 text-yellow-400">Pending</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-3">#00122</td>
                  <td className="py-3">John Smith</td>
                  <td className="py-3">Online</td>
                  <td className="py-3">$220.00</td>
                  <td className="py-3 text-red-400">Refunded</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        <footer className="text-center text-xs text-gray-500 py-6">
          © {new Date().getFullYear()} Uomo — All rights reserved
        </footer>
      </main>
    </div>
  );
}
