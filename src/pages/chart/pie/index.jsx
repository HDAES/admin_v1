/*
 * @Descripttion: 饼状图
 * @Author: Hades
 * @Date: 2020-12-20 00:05:15
 * @LastEditTime: 2020-12-20 00:19:54
 */

import React from 'react';
import { Pie } from '@ant-design/charts';
import { Card } from 'antd';
const G2Pie = () =>{
    const data = [
        {
          type: '分类一',
          value: 27,
        },
        {
          type: '分类二',
          value: 25,
        },
        {
          type: '分类三',
          value: 18,
        },
        {
          type: '分类四',
          value: 15,
        },
        {
          type: '分类五',
          value: 10,
        },
        {
          type: '其他',
          value: 5,
        },
    ];
    const BasisConfig = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }]
    };
    const SpiderConfig = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          type: 'spider',
          labelHeight: 28,
          content: '{name}\n{percentage}',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    };
    const RingConfig = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
          value: {
            formatter: function formatter(v) {
              return ''.concat(v, ' \xA5');
            },
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          style: { textAlign: 'center' },
          autoRotate: false,
          content: '{value}',
        },
        interactions: [
          { type: 'element-selected' },
          { type: 'element-active' },
          { type: 'pie-statistic-active' },
        ],
    };
    return (
        <div className="chart-base">
            <Card title="饼图" hoverable={true} className="chart-card">
                <Pie {...BasisConfig} /> 
            </Card>
            <Card title="饼图-蜘蛛布局标签" hoverable={true} className="chart-card">
                <Pie {...SpiderConfig} /> 
            </Card>
            <Card title="环图统计指标卡" hoverable={true} className="chart-card">
                <Pie {...RingConfig} />;
            </Card>
        </div>
    )
}
export default G2Pie;



