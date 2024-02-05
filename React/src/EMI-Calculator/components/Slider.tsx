import Form from "react-bootstrap/Form";
import "./Slider.scss";
export interface RangeCalc {
  label: string;
  value: number;
  min: number;
  max: number;
  prefix?: string;
  suffix?: string;
  step?: number;
  onChangeHandler?(e: any): any;
}

const RangeSlider = ({
  label,
  value,
  min,
  max,
  prefix = "",
  suffix = "",
  onChangeHandler,
  step = 1,
}: RangeCalc) => {
  return (
    <>
      <div className="slider-body">
        <Form>
          <Form.Label>{label}</Form.Label>
          <div className="min-max-container">
            <div>{min}</div>
            <div>
              {prefix} {value} {suffix}
            </div>
            <div>{max}</div>
          </div>
          <Form.Range
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChangeHandler}
          />
        </Form>
      </div>
    </>
  );
};

export default RangeSlider;
