import React from 'react';
import styles from '../styles/Revenue.module.css'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar
} from 'recharts';
import { useState } from 'react';
import { useEffect } from 'react';
import { getRevenueWithLabels } from '../services/order';
import { getRange,generateRangeLabels } from '../services/helper';



const RevenueChart = ({range}) => {

  const [revenueData, setRevenueData] = useState([])
  const [startDate, endDate] = getRange(range)
  const [data, setData] = useState([])
  const labels = generateRangeLabels(range, startDate, endDate)

   function mergeRevenueData(labels,backendData){
    const map = new Map(backendData.map((item)=>[item.label,item.totalRevenue]))

    return labels.map((label)=>({
      label,
      totalRevenue:map.get(label) || 0
    }))

   }
  useEffect(() => {
    getRevenueWithLabels(range, setRevenueData);
  }, [range]);

  useEffect(() => {
    if (Array.isArray(revenueData)) {
      const merged = mergeRevenueData(labels, revenueData);
      setData(merged);
    }
  }, [revenueData]);
  return (
    <div className={styles.chartCard}>
     <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0F5F3" stopOpacity={0} />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" axisLine={false} tickLine={false}  />
        <YAxis hide={true} />
        <Tooltip />
        <Bar
          dataKey="totalRevenue"
          barSize={47}
          fill="url(#barGradient)"
          fillOpacity={0.2}
          radius={[2.7, 2.7, 2.7, 2.7]}
          
        />
        <Line type="monotone" dataKey="totalRevenue" stroke="#000" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;
