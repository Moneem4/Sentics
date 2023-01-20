import { Scatter } from '@ant-design/plots';
import { useEffect, useState } from 'react';



type Props = {
    date_from:Date;
    date_to:Date;
    y_axis:string
  };

 export const Component_1 = (props:Props) => {

  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`http://localhost:5000/dictionnary/getNumberOfHumansByTime?time1=${props.date_from}&time2=${props.date_to}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };



    const config = {
        data,
        xField: 'timestamp',
        yField: 'y',
        size: 5,
        pointStyle: {
          stroke: '#777777',
          lineWidth: 1,
          fill: '#5B8FF9',
        },
      };

      return <Scatter {...config} />;
}

