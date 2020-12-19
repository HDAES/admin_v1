/*
 * @Descripttion: 水波图
 * @Author: Hades
 * @Date: 2020-12-20 00:26:23
 * @LastEditTime: 2020-12-20 00:41:11
 */
import React, { useState, useEffect }  from 'react';
import { Liquid } from '@ant-design/charts';
import { Card } from 'antd';

const G2Liquid = () =>{
    var [percent, setPercent] = useState(0.26);
    const ref = React.useRef();
    const BasisConfig = {
        percent: 0.25,
        statistic: {
          content: {
            style: {
              fontSize: 60,
              fill: 'black',
            },
          },
        },
    };

    const config = {
        percent,
        statistic: {
          title: {
            formatter: function formatter() {
              return '盈利率';
            },
            style: function style(_ref) {
              var percent = _ref.percent;
              return { fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)' };
            },
          },
          content: {
            style: function style(_ref2) {
              var percent = _ref2.percent;
              return {
                fontSize: 60,
                lineHeight: 1,
                fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
              };
            },
          },
        },
        liquidStyle: function liquidStyle(_ref4) {
          var percent = _ref4.percent;
          return {
            fill: percent > 0.75 ? '#5B8FF9' : '#FAAD14',
            stroke: percent > 0.75 ? '#5B8FF9' : '#FAAD14',
          };
        },
        color: function color() {
          return '#5B8FF9';
        },
    };
    useEffect(() => {
        var data = 0.25;
        var interval = setInterval(function () {
          data += Math.min(Math.random() * 0.1, 0.1);
          if (data < 0.75) {
            setPercent(data);
          } else {
            clearInterval(interval);
          }
        }, 500);
      }, []);
    return (
        <div className="chart-base">
            <Card title="水波图" hoverable={true} className="chart-card">
                <Liquid {...BasisConfig} />
            </Card>
            <Card title="样式自定义的水波图" hoverable={true} className="chart-card">
                <Liquid {...config} cchartRef={ref} />
            </Card>
        </div>
    )
}

export default G2Liquid;