import React, { useEffect, useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col } from "react-bootstrap";

export default function RangeSliderComp(props) {
  const [value, setValue] = useState(0);

  if (props.movieList === null) {
    return <div>loading</div>;
  }

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm="4" className="text-light">
          Ratings
        </Form.Label>
        <Col sm="8">
          <RangeSlider
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </Col>
      </Form.Group>
    </Form>
  );
}
