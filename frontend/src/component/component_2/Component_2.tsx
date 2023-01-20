import { Heatmap } from "@ant-design/charts";
import { useEffect, useState } from "react";

type Props = {
    date_from:Date;
    date_to:Date;
    y_axis:string
  };

export const Component_2 =(props:Props)=>
{
const [data, setData] = useState([]);

useEffect(() => {
    asyncFetch();
  }, []);


  
  const asyncFetch = () => {
    fetch(`http://localhost:5000/dictionnary/getPositionsByTime?time1=${props.date_from}&time2=${props.date_to}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    width: 650,
    height: 500,
    autoFit: false,
    data,
    xField: 'x_position',
    yField: 'y_position',
    colorField: 'y_axis',
    color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
    meta: {
      'Month of Year': {
        type: 'cat',
      },
    },
  };

  return <Heatmap {...config} />;
}