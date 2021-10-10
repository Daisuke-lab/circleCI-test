import ReactDOM from 'react-dom'
import { Scene, Matrix4 } from 'three'
import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, Vector3, Euler, useThree, createPortal, Intersection, Camera, useLoader } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { OrbitControls, OrthographicCamera, useCamera, useGLTF } from '@react-three/drei'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  scene: any
}
function Ball() {
  const Model = (props:any) => {
    console.log(props)
    console.log(useGLTF(props.url))
    const {scene} = useLoader(GLTFLoader, props.url) as GLTFResult
    return <primitive object={scene} {...props} />
  }
  
  const Rotate = (props:any) => {
    const ref = useRef<any>(null!)
    useFrame((state) => (ref.current.rotation.y = state.clock.elapsedTime))
    return <group ref={ref} {...props} />
  }
  
      return (
        <>
        <directionalLight position={[10, 10, 0]} intensity={1.5} />
        <directionalLight position={[-10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 20, 0]} intensity={1.5} />
        <directionalLight position={[0, -10, 0]} intensity={0.25} />
        <Rotate position-y={-0.5} scale={3}>
            <Model url="/daibo_v1.glb" />
        </Rotate>
        </>
      )
}

export default Ball
