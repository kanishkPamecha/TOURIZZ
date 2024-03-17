import React from 'react';
import image from '../images/train.jpg';

const imagetemplate= () => {
  return (
    <div className="app">
      <ImageCard
        imageSrc={image}
        name="John Doe"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    </div>
  );
};

export default imagetemplate;
