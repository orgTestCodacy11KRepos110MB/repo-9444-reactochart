import React from 'react';
import _ from 'lodash';
import measureText from 'measure-text';

export default class YAxisTitle extends React.Component {
  static propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    distance: React.PropTypes.number,
    position: React.PropTypes.oneOf(['left', 'right']),
    alignment: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
    placement: React.PropTypes.oneOf(['before', 'after']),
    rotate: React.PropTypes.bool,
    titleStyle: React.PropTypes.object
  };
  static defaultProps = {
    height: 250,
    width: 400,
    distance: 5,
    position: 'left',
    alignment: 'middle',
    placement: undefined,
    rotate: true,
    titleStyle: {
      fontFamily: "Helvetica, sans-serif",
      fontSize: '24px',
      fontWeight: 'bold',
      lineHeight: 1
    }
  };

  render() {
    const {height, width, distance, position, alignment, titleStyle} = this.props;
    const title = this.props.title || this.props.children;
    const placement = this.props.placement || ((position === 'left') ? 'before' : 'after');

    const rotate = this.props.rotate ? -90 : 0;
    const posX = (position === 'right') ? width : 0;
    const translateX = posX +
      ((placement === 'before') ? -distance : distance);
    const translateY =
      (alignment === 'middle') ? (height / 2) :
      (alignment === 'bottom') ? (height) :
      0;
    const textAnchor =
      (rotate && alignment === 'top') ? 'end' :
      (rotate && alignment === 'middle') ? 'middle' :
      (rotate && alignment === 'bottom') ? 'start' :
      (placement === 'before') ? 'end' :
      'start';
    const dy =
      (rotate && placement == 'before') ? '-0.2em' :
      (rotate) ? '0.8em' :
      (alignment === 'top') ? '0.8em' :
      (alignment === 'middle') ? '0.3em' :
      null;

    return <g transform={`translate(${translateX},${translateY})`}>
      <text style={{...titleStyle, textAnchor}} transform={`rotate(${rotate})`} dy={dy}>
        {title}
      </text>
    </g>;
  }
}
