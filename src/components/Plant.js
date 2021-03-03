import './Plant.css';

function Plant(props){

    const maxCount = 2000; // max count of the cirlces
    let w = 300,
    h = 300;

    function getDistanceFromTwoPoints(x1, y1, x2, y2){
      return  Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    }

    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    let circleToRender = [
      {
        x: w/2,
        y: h/2,
        r: 2
      }
    ];

    while (circleToRender.length + 1 <= maxCount) {

      let closestDist = Number.MAX_VALUE;
      let closestIndex = 0;

      const R = 1,
      newX = getRandom(R, w - R),
      newY = getRandom(R, h - R);

      for (let i = 0; i < circleToRender.length; i++) {
          const distanceFromNewCoords = getDistanceFromTwoPoints(newX, newY, circleToRender[i].x, circleToRender[i].y);
          if (distanceFromNewCoords < closestDist) {
            closestDist = distanceFromNewCoords;
            closestIndex = i;
          }
      }
      
      function getAngle(type){
        if (type === 'algae')
          return Math.atan2(newY - circleToRender[closestIndex].y, newX - circleToRender[closestIndex].x);
        
        if (type === 'grass')
          return getRandom(Math.PI + 0.33, Math.PI * 2 - 0.33)
        
        return null;
      }

      
      const x = circleToRender[closestIndex].x + Math.cos(getAngle(props.species)) * (circleToRender[closestIndex].r + R),
      y = circleToRender[closestIndex].y + Math.sin(getAngle(props.species)) * (circleToRender[closestIndex].r + R),
      r = R;

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