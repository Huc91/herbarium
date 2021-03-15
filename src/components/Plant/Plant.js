import React, { useEffect } from 'react';
import './Plant.css';

function Plant(props){

    //const [circleToRender, setCircle] = useState([]);
    const circleToRender = [];

    const maxCount = 1000; // max count of the cirlces
    let w = 300,
    h = 300;

    function getDistanceFromTwoPoints(x1, y1, x2, y2){
      return  Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    }

    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    const speciesOptions = {
      algae: {
        yGenStartPoint: h/2,
        yLimit: h,
      },
      grass: {
        yGenStartPoint: h/2,
        yLimit: h/2,
      },
      tree: {
        yGenStartPoint: h - 16,
        yLimit: h/2,
      }
    }

    circleToRender.push(
      {
        x: w/2,
        y: speciesOptions[props.species].yGenStartPoint,
        r: 2
      }
    )

    let c = 0;

    while (circleToRender.length + 1 <= maxCount) {
      c++;
      let closestDist = Number.MAX_VALUE;
      let closestIndex = 0;

      const radius = getRandom(1, 2),
      temporaryX = getRandom(radius, w - radius),
      temporaryY = getRandom(radius, speciesOptions[props.species].yLimit - radius);

      for (let i = 0; i < circleToRender.length; i++) {
          const distanceFromNewCoords = getDistanceFromTwoPoints(temporaryX, temporaryY, circleToRender[i].x, circleToRender[i].y);
          if (distanceFromNewCoords < closestDist) {
            closestDist = distanceFromNewCoords;
            closestIndex = i;
          }
      }

      function getAngle(type){
        if (type === 'ramificate')
          return Math.atan2(temporaryY - circleToRender[closestIndex].y, temporaryX - circleToRender[closestIndex].x);
        //return getRandom(Math.PI + 0.33, Math.PI * 2 - 0.33)

        return null;
      }


      const x = circleToRender[closestIndex].x + Math.cos(getAngle('ramificate')) * (circleToRender[closestIndex].r + radius),
      y = circleToRender[closestIndex].y + Math.sin(getAngle('ramificate')) * (circleToRender[closestIndex].r + radius),
      r = radius;

      circleToRender.push(
        {
          x,
          y,
          r
        }
      )

    }


    return (
        <div className="plant-container">
            <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
            {circleToRender.map((crc, index) => (
              <circle key={index} cx={crc.x} cy={crc.y} r={crc.r}>
              </circle>
            ))}
            </svg>
        </div>
    );
}

export default Plant
