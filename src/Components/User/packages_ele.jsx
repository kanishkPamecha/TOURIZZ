import React from 'react';
import PropTypes from 'prop-types';

const PackagesEle = (props) => {
  return (
    <div>
      <h4>{props.name}</h4>
      <div>
        <span>This Package includes</span>
        <div>{props.description}</div>
        <div>{props.image}</div>
        <div>{props.review}</div>
      </div>
    </div>
  );
};

PackagesEle.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  review: PropTypes.string,
};

PackagesEle.defaultProps = {
  name: 'ERROR 404',
  description: 'Error',
  review: 'As always good',
};

export default PackagesEle;
