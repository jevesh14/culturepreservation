import React from 'react';
import { View, StyleSheet, ViewStyle, Platform, Text, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-svg-charts';
import { Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Circle, G, Line, Text as SVGText } from 'react-native-svg';

type ChartType = 'line' | 'bar' | 'pie';

interface ChartData {
  x: number | string;
  y: number;
  label?: string;
  color?: string;
}

interface ChartProps {
  data: ChartData[];
  type?: ChartType;
  style?: ViewStyle;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  showGrid?: boolean;
  height?: number;
  showDataPoints?: boolean;
  formatYLabel?: (value: number) => string;
  formatXLabel?: (value: string | number) => string;
}

const Chart = ({
  data,
  type = 'line',
  style,
  xLabel,
  yLabel,
  color = '#FF7F00',
  showGrid = true,
  height = 250,
  showDataPoints = true,
  formatYLabel = (value) => value.toString(),
  formatXLabel = (value) => value.toString(),
}: ChartProps) => {
  const screenWidth = Dimensions.get('window').width;
  const chartData = data.map(item => item.y);
  const xData = data.map(item => item.x);

  const Decorator = ({ x, y, data }: any) => {
    if (!showDataPoints) return null;
    return data.map((value: number, index: number) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke={color}
        fill="white"
        strokeWidth={2}
      />
    ));
  };

  const Labels = ({ slices }: any) => {
    return slices.map((slice: any, index: number) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <G key={index}>
          <Line
            x1={labelCentroid[0]}
            y1={labelCentroid[1]}
            x2={pieCentroid[0]}
            y2={pieCentroid[1]}
            stroke={data.svg.fill}
          />
          <SVGText
            x={labelCentroid[0]}
            y={labelCentroid[1]}
            fill="#666"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={12}
          >
            {data.label}
          </SVGText>
        </G>
      );
    });
  };

  const renderChart = () => {
    const commonProps = {
      style: { height: height - 50 },
      data: chartData,
      svg: { fill: color, stroke: color },
      contentInset: { top: 20, bottom: 20, left: 20, right: 20 },
      animate: Platform.select({ ios: true, android: false }), // Disable animations on Android for better performance
    };

    switch (type) {
      case 'bar':
        return (
          <View style={[styles.chartContainer, { height }]}>
            <YAxis
              data={chartData}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fontSize: 12, fill: '#666' }}
              formatLabel={(value) => formatYLabel(value)}
              numberOfTicks={5}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <BarChart
                {...commonProps}
                svg={{ fill: color }}
                spacingInner={0.3}
                spacingOuter={0.3}
              >
                {showGrid && <Grid direction={Grid.Direction.HORIZONTAL} />}
              </BarChart>
              <XAxis
                data={xData}
                formatLabel={(_, index) => formatXLabel(xData[index])}
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 12, fill: '#666' }}
                numberOfTicks={Math.min(xData.length, 5)}
              />
            </View>
          </View>
        );
      case 'pie':
        const pieData = data.map((item, index) => ({
          value: item.y,
          key: index,
          svg: { fill: item.color || color },
          arc: { 
            outerRadius: '80%', 
            cornerRadius: Platform.select({ ios: 5, android: 0 }) 
          },
          label: item.label || formatYLabel(item.y),
        }));
        return (
          <View style={[styles.chartContainer, { height }]}>
            <PieChart
              style={{ height: height - 50 }}
              data={pieData}
              innerRadius={Platform.select({ ios: '20%', android: '10%' })}
              outerRadius="80%"
              labelRadius={Platform.select({ ios: 110, android: 90 })}
            >
              <Labels />
            </PieChart>
          </View>
        );
      default:
        return (
          <View style={[styles.chartContainer, { height }]}>
            <YAxis
              data={chartData}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fontSize: 12, fill: '#666' }}
              formatLabel={(value) => formatYLabel(value)}
              numberOfTicks={5}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                {...commonProps}
                svg={{ stroke: color, strokeWidth: 2 }}
              >
                {showGrid && <Grid direction={Grid.Direction.HORIZONTAL} />}
                <Decorator />
              </LineChart>
              <XAxis
                data={xData}
                formatLabel={(_, index) => formatXLabel(xData[index])}
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 12, fill: '#666' }}
                numberOfTicks={Math.min(xData.length, 5)}
              />
            </View>
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, style]}>
      {xLabel && (
        <Text style={styles.axisLabel}>{xLabel}</Text>
      )}
      {yLabel && (
        <Text style={[styles.axisLabel, styles.yAxisLabel]}>{yLabel}</Text>
      )}
      {renderChart()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  chartContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  axisLabel: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
  },
  yAxisLabel: {
    transform: [{ rotate: '-90deg' }],
    position: 'absolute',
    left: -30,
    top: '50%',
  },
});

export default Chart;
