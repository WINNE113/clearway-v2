import React, { useState } from "react";
import { Card } from "flowbite-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { FaRegEdit } from "react-icons/fa";

const TrafficStatistics = () => {
  // Sample data for density and speed over time
  const dataDensity = [
    { hour: "00:00", density: 1.2 },
    { hour: "02:00", density: 1.5 },
    { hour: "04:00", density: 1.8 },
    { hour: "06:00", density: 2.1 },
    { hour: "08:00", density: 2.3 },
    { hour: "10:00", density: 2.0 },
    { hour: "12:00", density: 1.7 },
    { hour: "14:00", density: 1.4 },
    { hour: "16:00", density: 3.3 },
    { hour: "18:00", density: 5.3 },
    { hour: "20:00", density: 3.5 },
    { hour: "22:00", density: 6.3 },
    { hour: "23:59", density: 1.5 },
  ];
  const dataSpeed = [
    { hour: "00:00", speed: 50 },
    { hour: "02:00", speed: 60 },
    { hour: "04:00", speed: 40 },
    { hour: "06:00", speed: 30 },
    { hour: "08:00", speed: 20 },
    { hour: "10:00", speed: 70 },
    { hour: "12:00", speed: 20 },
    { hour: "14:00", speed: 70 },
    { hour: "16:00", speed: 40 },
    { hour: "18:00", speed: 30 },
    { hour: "20:00", speed: 10 },
    { hour: "22:00", speed: 90 },
    { hour: "23:59", speed: 30 },
  ];

  const dataStreet = [
    {
      id: 1,
      nameStreet: "Đường A",
      status: "Bình thường",
    },
    {
      id: 2,
      nameStreet: "Đường B",
      status: "Tắt đường",
    },
    {
      id: 3,
      nameStreet: "Đường C",
      status: "Tai nạn giao thông",
    },
    {
      id: 4,
      nameStreet: "Đường D",
      status: "Nước ngập",
    },
    {
      id: 5,
      nameStreet: "Đường E",
      status: "Bình thường",
    },
  ];

  return (
    <main className="mx-9 my-9">
      <div className="grid grid-cols-3 gap-6">
        {/* Biểu đồ */}
        <div className="col-span-2">
          <Card className="w-full">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Thống kê trạng thái tuyến đường:
              <span className="text-blue-600"> Võ Chí Công </span>
            </h5>
            <div className="flex flex-col space-y-5">
              <div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Đo mật độ (g/cm³) trên giờ
                </p>
                <div className="h-[400px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dataDensity}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="hour"
                        label={{
                          value: "Thời gian (giờ)",
                          position: "insideBottomRight",
                          offset: -10,
                        }}
                      />
                      <YAxis
                        yAxisId="left"
                        label={{
                          value: "Mật độ (g/cm³)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="density"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      {/* Brush thêm khả năng zoom */}
                      <Brush
                        dataKey="hour"
                        height={30}
                        stroke="#8884d8"
                        startIndex={0}
                        endIndex={dataDensity.length - 1}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Đo tốc độ (km/h) trên giờ
                </p>
                <div className="h-[400px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dataSpeed}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="hour"
                        label={{
                          value: "Thời gian (giờ)",
                          position: "insideBottomRight",
                          offset: -10,
                        }}
                      />
                      <YAxis
                        yAxisId="left"
                        label={{
                          value: "Tốc độ (km/h)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="speed"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      {/* Brush thêm khả năng zoom */}
                      <Brush
                        dataKey="hour"
                        height={30}
                        stroke="#8884d8"
                        startIndex={0}
                        endIndex={dataSpeed.length - 1}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </Card>
        </div>
        {/* Danh sách tuyến đường */}
        <div className="col-span-1">
          <Card className="w-full">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tuyến đường
            </h5>
            <div className="overflow-x-auto mt-5">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="py-2 px-2 text-left">Tên đường</th>
                    <th className="py-2 px-2 text-left">
                      Tình trạng tuyến đường (Hiện tại)
                    </th>
                    <th className="py-2 px-2 text-left">Xem</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {dataStreet.map((data) => (
                    <tr
                      key={data.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-2 px-2 text-left font-bold">
                        {data.nameStreet}
                      </td>
                      <td className="py-2 px-2 text-left font-bold">
                        {data.status}
                      </td>
                      <td className="py-2 px-2 text-left font-bold flex flex-row space-x-4">
                        <FaRegEdit size={20} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default TrafficStatistics;
