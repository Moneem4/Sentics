import { useState } from 'react'
import { Col, DatePicker, Radio, Row } from 'antd'
import moment from 'moment';
import "./App.css"
import { Component_1 } from './component/component_1/Component_1';
import { Component_2 } from './component/component_2/Component_2';
type TimeRange = {
  from: any;
  to: any;
};
const { RangePicker } = DatePicker;
function App() {
  
  const [timeRangeFilter, setTimeRangeFilter] = useState<TimeRange>({
    from: moment().toISOString() as any,
    to: moment().endOf("day").toISOString() as any,
  });


  const handleTimeRangeChange = (dates: any[] | null) => {
    if (dates) {
      let filter = {
        from: dates[0].toISOString(),
        to: dates[1].toISOString(),
      };
      setTimeRangeFilter(filter);
      
    }
  };

  return (
    <>
    <Row gutter={18}>
          <Col span={24} >
          <Radio.Group buttonStyle="solid">
      <Radio.Button value="1">1. Number of humans at that time</Radio.Button>
      <Radio.Button value="2">2. X position of human</Radio.Button>
    </Radio.Group>
          <RangePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    ranges={{
                      Today: [moment().startOf("day"), moment().endOf("day")],
                      "This month": [
                        moment().startOf("month"),
                        moment().endOf("month"),
                      ],
                    }}
                    size={"large"}
                    defaultValue={[
                      moment(timeRangeFilter.from),
                      timeRangeFilter.to !== "-1"
                        ? moment(timeRangeFilter.to)
                        : moment().endOf("day"),
                    ]}
                   allowClear
                    onChange={handleTimeRangeChange}
                  />
          </Col>
          </Row>
          <Row>
          <Col span={24}>
                      <Component_1 date_from={timeRangeFilter.from} date_to={timeRangeFilter.to} y_axis={"1"}/>
          </Col>
          </Row>
          <Row>
          <Col span={24}>
          <Component_2 date_from={timeRangeFilter.from} date_to={timeRangeFilter.to} y_axis={"1"}/>
          </Col>
        </Row>
      
    </>
  )
}

export default App
