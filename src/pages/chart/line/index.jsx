/*
 * @Descripttion: 折线图
 * @Author: Hades
 * @Date: 2020-12-19 22:55:14
 * @LastEditTime: 2020-12-19 23:26:56
 */

import React ,{ useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import fetch from 'axios'
import { Card } from 'antd';
const G2Line = () =>{
    return (
        <div className="chart-base">
            <Card title="基础折线图" hoverable={true} className="chart-card">
                <BasisLine/>
            </Card>
            <Card title="多折线动画" hoverable={true} className="chart-card">
                <Polyline/>
            </Card>
            
        </div>
    )
}

export default G2Line;


const BasisLine = () =>{
    const [data, setData] = useState([]);
    const ref = React.useRef();
    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () =>{
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => {
                setData(response.data)
            })
            
    }
    var config = {
        data: data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          type: 'timeCat',
          tickCount: 5,
        },
      };
    useEffect(() => {
        console.log(ref.current);
      }, []);
    return (
        <Line {...config} chartRef={ref} />
    )
}

const Polyline = () =>{
    const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
    .then((response) => {
        setData(response.data)
    })
  };
  var config = {
    data: data,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v / 1000000000).toFixed(1), ' B');
        },
      },
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  return <Line {...config} />;
}