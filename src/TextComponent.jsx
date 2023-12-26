import { useRef } from 'react'
import { Text, useEnvironment } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import { DoubleSide, TextureLoader, MeshStandardMaterial } from 'three'

function TextComponent() {

const normalM = useLoader(TextureLoader, "./Textures/waternormals.jpeg")

const envMap = useEnvironment({files : "./Environments/envmap.hdr"})

const textRef = useRef()

  const customUniforms = {
    uTime: { value: 0 }
}

useFrame((state, delta) => {
  customUniforms.uTime.value += 0.01
  // textRef.current.rotation.x = textRef.current.rotation.y += delta / 12
})

  const onBeforeCompile = (shader) => 
  {
  shader.uniforms.uTime = customUniforms.uTime

  shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
          #include <common>

          uniform float uTime;

          mat2 get2dRotateMatrix(float _angle)
          {
              return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
          }
      `
      )

  shader.vertexShader = shader.vertexShader.replace(
          '#include <beginnormal_vertex>',
          `
              #include <beginnormal_vertex>
  
              // float angle = sin(position.y + uTime) * 0.6;
              float waveAmplitude = 0.1;
              float waveX = uv.x * PI * 10.0 - mod(uTime / 0.3, PI2);
              float waveZ = sin(waveX) * waveAmplitude;

              mat2 rotateMatrix = get2dRotateMatrix(waveZ);
  
              objectNormal.xz = rotateMatrix * objectNormal.xz;
          `
      )

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
          #include <begin_vertex>

          transformed.xz = rotateMatrix * transformed.xz;
      `
   )
  }



  const material = new MeshStandardMaterial({
    roughness: 0.1,
    metalness: 1,
    side: DoubleSide,
    onBeforeCompile: onBeforeCompile,
    normalMap: normalM,
    envMap: envMap, 
    
  })

  return (
      <Text
        ref={textRef}
        position= {[0, 1, 0 ]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        material = { material }
      >
        Hello, World!
      </Text>
  );
}

export default TextComponent;

