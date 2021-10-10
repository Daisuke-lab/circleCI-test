import ReactDOM from 'react-dom'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, Vector3, Euler } from '@react-three/fiber'
import Ball from './Ball'



interface rotationProps {
    x: number,
    y: number,
    z:number
}

export default function Test() {
  return (
    <Suspense fallback={<span>loading...</span>}>
    <Canvas>
      <Ball/>
  </Canvas>
  </Suspense>
  )
}
