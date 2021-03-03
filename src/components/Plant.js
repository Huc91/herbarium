function Plant(){

    const maxCount = 300; // max count of the cirlces
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
      
      const angle = Math.atan2(newY - circleToRender[closestIndex].y, newX - circleToRender[closestIndex].x),
      x = circleToRender[closestIndex].x + Math.cos(angle) * (circleToRender[closestIndex].r + R),
      y = circleToRender[closestIndex].y + Math.sin(angle) * (circleToRender[closestIndex].r + R),
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
        <div>
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