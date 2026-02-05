import React, { useEffect, useMemo, useState } from 'react';
import { StarFilled, TrophyFilled, CrownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import user from "./../../public/user.jpg"

const LEVELS = [
  { key: 'bronze',    name: 'Bronze Seller',    color: '#cd7f32', icon: null,             requiredOrders: 0 },
  { key: 'silver',    name: 'Silver Seller',    color: '#bfc1c2', icon: <StarFilled />,   requiredOrders: 5 },
  { key: 'gold',      name: 'Gold Seller',      color: '#fadb14', icon: <StarFilled />,   requiredOrders: 10 },
  { key: 'platinum',  name: 'Platinum Seller',  color: '#597ef7', icon: <CrownOutlined />, requiredOrders: 50 },
  { key: 'top-rated', name: 'Top Rated Seller', color: '#722ed1', icon: <TrophyFilled />, requiredOrders: 100 },
  { key: 'power',     name: 'Power Seller',     color: '#eb2f96', icon: <TrophyFilled />, requiredOrders: 200 },
];

// const SAMPLE_PROFILE = {
//   name: 'Mahfuj Enterprise',
//   username: 'mahfuj_alam92',
//   avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
//   joined: 'January 2023',
//   totalOrders: 10,
// };

const TOP_RATED_TARGET = LEVELS.find(l => l.key === 'top-rated')?.requiredOrders || 100;

function computeProgress(totalOrders) {
  const sorted = [...LEVELS].sort((a, b) => a.requiredOrders - b.requiredOrders);
  const currentLevel =
    [...sorted].reverse().find(l => totalOrders >= l.requiredOrders) || sorted[0];
  const currentIndex = sorted.findIndex(l => l.key === currentLevel.key);
  const nextLevel = sorted[currentIndex + 1];

  const ordersNeeded = nextLevel ? Math.max(0, nextLevel.requiredOrders - totalOrders) : 0;

  const progressToTopRated = TOP_RATED_TARGET
    ? Math.min(100, (totalOrders / TOP_RATED_TARGET) * 100)
    : null;

  const levelProgressList = sorted.map((level, index) => {
    if (index === 0) return { ...level, percent: 100 };
    const prevLevel = sorted[index - 1];
    if (totalOrders < prevLevel.requiredOrders) return { ...level, percent: 0 };
    if (totalOrders >= level.requiredOrders) return { ...level, percent: 100 };
    const gained = totalOrders - prevLevel.requiredOrders;
    const needed = level.requiredOrders - prevLevel.requiredOrders;
    const percent = Math.min(100, (gained / needed) * 100);
    return { ...level, percent };
  });

  return {
    currentLevel,
    nextLevel,
    ordersNeeded,
    progressToTopRated,
    levelProgressList,
  };
}

const SellerProfile = () => {
  const user = useSelector((state) => state.auth?.user);
  const [totalOrders] = useState(user?.orders || 0); // read-only from sample; wire to backend/state as needed

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const {
    currentLevel,
    nextLevel,
    ordersNeeded,
    progressToTopRated,
    levelProgressList,
  } = useMemo(() => computeProgress(totalOrders), [totalOrders]);

  return (
    <div className="max-w-5xl mx-auto md:px-6 py-6">
      <div className="bg-white shadow rounded-xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
            <img
              src={user?.imageUrl || user}
              alt={user?.name || "User"}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-gray-500">
              @{user?.username} • Joined {user?.joined}
            </p>

            {/* User Input (read-only for now) */}
            <div className="mt-3 flex items-center gap-2">
              <span className="font-semibold">Total successful orders:</span>
              <span className="text-2xl text-blue-600 font-bold">{totalOrders}</span>
            </div>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {LEVELS.map(level => {
                const achieved = totalOrders >= level.requiredOrders;
                return (
                  <span
                    key={level.key}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
                      achieved ? '' : 'border-dashed opacity-70'
                    }`}
                    style={{
                      borderColor: achieved ? level.color : '#d1d5db',
                      backgroundColor: achieved ? `${level.color}1A` : '#f9fafb',
                      color: achieved ? '#111827' : '#6b7280',
                    }}
                  >
                    {level.icon}
                    {level.name}
                    {achieved && '✓'}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Level-wise Progress */}
        <div className="mt-8">
          <div className="text-xl font-semibold mb-4">Level-wise Progress</div>
          <div className="space-y-4">
            {levelProgressList.map(level => (
              <div key={level.key} className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div className="text-lg flex items-center gap-2">
                    <span className="text-xl">{level.icon}</span>
                    <span className="font-semibold">{level.name}</span>
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-semibold"
                    style={{ backgroundColor: `${level.color}1A`, color: '#111827' }}
                  >
                    {level.requiredOrders} orders
                  </span>
                  <span className="ml-auto text-sm text-gray-500">
                    {level.percent.toFixed(0)}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${level.percent}%`,
                      backgroundColor: level.color,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-4 text-gray-700">
            Next target:{' '}
            <span className="font-semibold text-yellow-600">
              {nextLevel ? nextLevel.name : 'Max Level'}
            </span>{' '}
            — need <strong>{nextLevel ? ordersNeeded : 0}</strong> more orders.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Orders" value={totalOrders} icon={<TrophyFilled />} />
          <StatCard title="Current Level" value={currentLevel.name} color="text-green-600" />
          <StatCard
            title="Progress to Top Rated"
            value={
              progressToTopRated !== null
                ? `${Math.round(progressToTopRated)}%`
                : 'N/A'
            }
          />
          <StatCard title="Next Milestone" value={nextLevel ? nextLevel.name : 'Max Level'} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color = 'text-gray-800' }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
    <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
      {icon && <span className="text-lg">{icon}</span>}
      <span>{title}</span>
    </div>
    <div className={`text-2xl font-semibold ${color}`}>{value}</div>
  </div>
);

export default SellerProfile;