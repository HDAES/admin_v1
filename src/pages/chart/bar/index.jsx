/*
 * @Descripttion: 条形图
 * @Author: Hades
 * @Date: 2020-12-19 23:41:42
 * @LastEditTime: 2020-12-19 23:52:11
 */
import React, { useEffect, useState} from 'react';
import { Bar } from '@ant-design/charts';
import fetch from 'axios'
import { Card } from 'antd';
const G2Bar = () =>{
    return (
        <div className="chart-base">
            <Card title="基础条形图" hoverable={true} className="chart-card">
                <BasisBar/>
            </Card>
            <Card title="基础条形图 - 滚动条" hoverable={true} className="chart-card">
                <ScrollBar/>
            </Card>
            <Card title="百分百条形图" hoverable={true} className="chart-card">
                <PercentageBar/>
            </Card>
        </div>
    )
}

export default G2Bar;

const BasisBar = () =>{
    var data = [
        {
          year: '1951 年',
          value: 38,
        },
        {
          year: '1952 年',
          value: 52,
        },
        {
          year: '1956 年',
          value: 61,
        },
        {
          year: '1957 年',
          value: 145,
        },
        {
          year: '1958 年',
          value: 48,
        },
      ];
      var config = {
        data: data,
        xField: 'value',
        yField: 'year',
        seriesField: 'year',
        legend: { position: 'top-left' },
      };
      return <Bar {...config} />;
}

const ScrollBar = () =>{
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
            .then((response) => setData(response.data))
    };
    var config = {
        data: data,
        yField: '城市',
        xField: '销售额',
        yAxis: { label: { autoRotate: false } },
        scrollbar: { type: 'vertical' },
    };
    return <Bar {...config} />;
}

const PercentageBar = () =>{
    var data = [
        {
          country: 'Asia',
          year: '1750',
          value: 502,
        },
        {
          country: 'Asia',
          year: '1800',
          value: 635,
        },
        {
          country: 'Asia',
          year: '1850',
          value: 809,
        },
        {
          country: 'Asia',
          year: '1900',
          value: 947,
        },
        {
          country: 'Asia',
          year: '1950',
          value: 1402,
        },
        {
          country: 'Asia',
          year: '1999',
          value: 3634,
        },
        {
          country: 'Asia',
          year: '2050',
          value: 5268,
        },
        {
          country: 'Africa',
          year: '1750',
          value: 106,
        },
        {
          country: 'Africa',
          year: '1800',
          value: 107,
        },
        {
          country: 'Africa',
          year: '1850',
          value: 111,
        },
        {
          country: 'Africa',
          year: '1900',
          value: 133,
        },
        {
          country: 'Africa',
          year: '1950',
          value: 221,
        },
        {
          country: 'Africa',
          year: '1999',
          value: 767,
        },
        {
          country: 'Africa',
          year: '2050',
          value: 1766,
        },
        {
          country: 'Europe',
          year: '1750',
          value: 163,
        },
        {
          country: 'Europe',
          year: '1800',
          value: 203,
        },
        {
          country: 'Europe',
          year: '1850',
          value: 276,
        },
        {
          country: 'Europe',
          year: '1900',
          value: 408,
        },
        {
          country: 'Europe',
          year: '1950',
          value: 547,
        },
        {
          country: 'Europe',
          year: '1999',
          value: 729,
        },
        {
          country: 'Europe',
          year: '2050',
          value: 628,
        },
      ];
    var config = {
    data: data,
    xField: 'value',
    yField: 'year',
    seriesField: 'country',
    isPercent: true,
    isStack: true,
    label: {
        position: 'middle',
        content: function content(item) {
        return item.value.toFixed(2);
        },
        style: { fill: '#fff' },
    },
    };
    return <Bar {...config} />;
}
