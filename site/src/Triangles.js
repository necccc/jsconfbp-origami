import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Origami from './lib/'
import pick from './lib/pick'

import './Triangles.scss';

export default ({ fromText }) => {
  const [triangles, setTriangles] = useState([])
  const [colors, setColors] = useState([])


  useEffect(() => {

    setColors(pick([
      [
        '#DB69FF',
        '#A25FE8',
        '#9375FF',
        '#5F67E8',
        '#6998FF',
      ],
      [ '#3B1D59',
        '#994CE6',
        '#663299',
        '#6E37A6',
        '#552A80',
      ],
      [
        '#0D8BFF',
        '#0CB8E8',
        '#01FFF4',
        '#0CE89F',
        '#0DFF6A',
      ],
    ]))


  }, [false])

  useEffect(() => {
    const canvas = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    if (fromText.length > 0) {
      Origami({
        debug: true,
        colors,
        canvas,
        fromText,
        start: 'center center'
      }).then(result => {
        document.documentElement.style.setProperty('--display-color', result[0].color);
        setTriangles(result)
      })
      .catch((e) => {
        console.error(e);
      })
    } else {
      setTriangles([])
    }
  }, [fromText])


  return (
    <div className="triangles">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          { triangles.map(triangle => (
            <Line
              points={ triangle.points.reduce((arr, points) => arr.concat(points.x, points.y), []) }
              fill={ triangle.color }
              stroke={ triangle.color }
              strokeWidth={ 1 }
              closed={ true }
            />))
          }
        </Layer>
      </Stage>
    </div>
  );
}


