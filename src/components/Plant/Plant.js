import React, { useState, useEffect } from 'react';
import './Plant.css';

function Plant(props){

    //const circleToRender = [];
    const [count, setCount] = useState(0);

    const maxCount = 1000; // max count of the cirlces
    let w = 300,
    h = 300;

    function getDistanceFromTwoPoints(x1, y1, x2, y2){
      return  Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    }

    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function getAngle(type, x1, y1, x2, y2){
      if (type === 'ramificate')
        return Math.atan2(y1 - y2, x1 - x2);
      //return getRandom(Math.PI + 0.33, Math.PI * 2 - 0.33)

      return null;
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

    // circleToRender.push(
    //   {
    //     x: w/2,
    //     y: speciesOptions[props.species].yGenStartPoint,
    //     r: 2
    //   }
    // )

    const [circles, setState] = useState([
      {
        x: w/2,
        y: speciesOptions[props.species].yGenStartPoint,
        r: 2
      }
    ]);

    function addCircle(element){
      setState(
        [
          ...circles,
          element
        ]
      )
    }

      console.log('hello');
      function generateCircle(circleToRender) {

        const radius = getRandom(1, 2),
        temporaryX = getRandom(radius, w - radius),
        temporaryY = getRandom(radius, speciesOptions[props.species].yLimit - radius);

        let closestDist = Number.MAX_VALUE;
        let closestIndex = 0;
        const approximativeCloseness = 10;

        for (let i = 0; i < circleToRender.length; i++) {
            const distanceFromNewCoords = getDistanceFromTwoPoints(temporaryX, temporaryY, circleToRender[i].x, circleToRender[i].y);
            // why? becaus it's more performative. O(n) in worst case scenario.
            if(closestDist < approximativeCloseness) {
              closestIndex = i;
              break;
            }
            if (distanceFromNewCoords < closestDist) {
              closestDist = distanceFromNewCoords;
              closestIndex = i;
            }
        }

        const angle = getAngle('ramificate', temporaryX, temporaryY, circleToRender[closestIndex].x, circleToRender[closestIndex].y)

        const x = circleToRender[closestIndex].x + Math.cos(angle) * (circleToRender[closestIndex].r + radius),
        y = circleToRender[closestIndex].y + Math.sin(angle) * (circleToRender[closestIndex].r + radius),
        r = radius;

        return { x, y, r };

      }

      useEffect(() => {
        if(count <= maxCount)
        addCircle(
          generateCircle(circles)
        )
        setCount(count + 1);
        console.log(count);
      });



    return (
        <div className="plant-container">
            <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
            {circles.map((crc, index) => (
              <circle key={index} cx={crc.x} cy={crc.y} r={crc.r}>
              </circle>
            ))}
            </svg>
        </div>
    );
}

export default Plant
