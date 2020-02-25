import invariant from 'invariant';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { hasOneOfTwo } from './util';

type Props = {
  /**
   * For a vertical bar, `x` represents the X data value on which the bar is centered.
   * For a horizontal bar, `x` represents the *starting* X value of the bar, ie. the minimum of the range it spans
   */
  x: number | string | Date;

  /**
   * For a horizontal bar, `y` represents the Y data value on which the bar is centered.
   * For a vertical bar, `y` represents the *starting* Y value of the bar, ie. the minimum of the range it spans
   */
  y: number | string | Date;

  /**
   * For a horizontal bar, `xEnd` represents the *ending* X data value of the bar, ie. the maximum of the range it spans.
   * This prop should not be defined if the bar is vertical.
   */
  xEnd: number | string | Date;

  /**
   * For a vertical bar, `yEnd` represents the *ending* Y data value of the bar, ie. the maximum of the range it spans.
   * This prop should not be defined if the bar is horizontal.
   */
  yEnd: number | string | Date;

  /**
   * The thickness of the bar, in pixels. (width of vertical bar, or height of horizontal bar).
   */
  thickness: number;

  /**
   * Class name(s) to be included on the bar's <rect> element.
   */
  className: string;

  /**
   * Inline style object to be included on the bar's <rect> element.
   */
  style: Object;

  /**
   * `mousemove` event handler callback, called when user's mouse moves within the bar.
   */
  onMouseMove: (event: React.MouseEvent) => void;

  /**
   * `mouseenter` event handler callback, called when user's mouse enters the bar.
   */
  onMouseEnter: (event: React.MouseEvent) => void;

  /**
   * `mouseleave` event handler callback, called when user's mouse leaves the bar.
   */
  onMouseLeave: (event: React.MouseEvent) => void;

  /**
   * D3 scale for X axis - provided by XYPlot.
   */
  xScale: Function;

  /**
   * D3 scale for Y axis - provided by XYPlot.
   */
  yScale: Function;

  /**
   * Conditional if column should display values above/beside bar.
   */
  showLabel: boolean;

  /**
   * Format to use for the values or accessor that returns the updated value.
   */
  labelFormat: (value: string | number | Date) => string;

  /**
   * The distance from the column the label appears in pixels.
   */
  labelDistance: number;

  /**
   * Class name(s) to be included on the bar's <text> element.
   */
  labelClassName: string;
};

/**
 * Bar is a low-level component to be used in XYPlot-type charts (namely BarChart).
 * It is specified in terms of a range (min & max) of values on one axis and a
 * single value on the other axis.
 * Passing props `x`, `xEnd` and `y` specifies a horizontal bar, centered on `y`
 * and spanning from `x` to `xEnd`.
 * Passing props `x`, `y`, and `yEnd' specifies a vertical bar, centered on `x`
 * and spanning from `y` to `yEnd`.
 */
const Bar = (props: Props) => {
  // x/y are values in the *data* domain, not pixel domain
  const {
    xScale,
    yScale,
    x,
    xEnd,
    y,
    yEnd,
    thickness,
    style,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    showLabel,
    className,
    labelFormat,
    labelDistance,
    labelClassName,
  } = props;

  invariant(
    hasOneOfTwo(xEnd, yEnd),
    `Bar expects an xEnd *or* yEnd prop, but not both.`,
  );

  const orientation = isUndefined(xEnd) ? 'vertical' : 'horizontal';
  const classNameForBar = `rct-chart-bar rct-chart-bar-${orientation} ${className}`;
  const labelClass = `rct-chart-bar-label ${labelClassName || ''}`;

  let rectX;
  let rectY;
  let width;
  let height;
  let xText;
  let yText;
  let textAnchor;
  let textValue;

  if (orientation === 'horizontal') {
    rectY = yScale(y) - thickness / 2;
    const x0 = xScale(x);
    const x1 = xScale(xEnd);
    rectX = Math.min(x0, x1);
    width = Math.abs(x1 - x0);
    height = thickness;

    // horizontal text formatting to right of bar
    xText = Math.max(x0, x1) + labelDistance;
    yText = rectY + thickness / 2 + 5;
    textAnchor = '';
    textValue = xEnd;
  } else {
    // vertical
    rectX = xScale(x) - thickness / 2;
    const y0 = yScale(y);
    const y1 = yScale(yEnd);
    rectY = Math.min(y0, y1);
    height = Math.abs(y1 - y0);
    width = thickness;

    // vertical text formatting
    xText = rectX + thickness / 2;
    yText = rectY - labelDistance;
    textAnchor = 'middle';
    textValue = yEnd;
  }

  const rect = (
    <rect
      {...{
        x: rectX,
        y: rectY,
        className: classNameForBar,
        width,
        height,
        style,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
      }}
    />
  );

  const text = (
    <text
      {...{
        textAnchor,
        x: xText,
        y: yText,
        className: labelClass,
      }}
    >
      {labelFormat ? labelFormat(textValue) : textValue}
    </text>
  );

  if (showLabel) {
    return (
      <g>
        {rect}
        {text}
      </g>
    );
  }

  return rect;
};

Bar.defaultProps = {
  x: 0,
  y: 0,
  thickness: 8,
  className: '',
  style: {},
  labelDistance: 24,
};

export default Bar;
