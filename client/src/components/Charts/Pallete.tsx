import React from 'react';
import PieChart, {
  Series,
  Label,
  Legend,
} from 'devextreme-react/pie-chart';
import { Sheet } from '@mui/joy';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function Charts() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const parseAmount = (amount: string) => {
    return parseFloat(amount.replace(/[^\d.-]/g, ''));
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.type]) {
      acc[transaction.type] = {};
    }
    if (!acc[transaction.type][transaction.category]) {
      acc[transaction.type][transaction.category] = 0;
    }
    acc[transaction.type][transaction.category] += parseAmount(transaction.amount);
    return acc;
  }, {} as Record<string, Record<string, number>>);

  const chartData = Object.keys(groupedTransactions).map(type => ({
    title: type,
    dataSource: Object.keys(groupedTransactions[type]).map(category => ({
      name: category,
      area: groupedTransactions[type][category],
    })),
  }));

  console.log(chartData);

  const pieCharts = chartData.map((options, i) => (
    <PieChart
      width={'50%'}
      key={i}
      title={options.title}
      palette="Dark Violet"
      sizeGroup="piesGroup"
      dataSource={options.dataSource}
    >
      <Series argumentField="name" valueField="area" >
        <Label visible={true} customizeText={(arg) => `${arg.argumentText}: ${arg.valueText}₽`} />
      </Series>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
        rowCount={2}
      />
    </PieChart>
  ));

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: 'flex',
        width: '100%',
        borderRadius: 'sm',
        overflow: 'auto',
        minHeight: 0,
        padding: 3
      }}
    >
      {pieCharts}
    </Sheet>
  );
}

export default Charts;
