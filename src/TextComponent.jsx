import { Text } from '@react-three/drei';
// import { MeshPhysicalMaterial } from '@react-three/fiber'
import { MeshPhysicalMaterial, DoubleSide } from 'three'

function TextComponent() {

  const material = new MeshPhysicalMaterial({
    roughness: 0.2,
    metalness: 1,
    side: DoubleSide
  })

  return (
      <Text
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

// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Text } from '@react-three/drei';

// function TextComponent (){
//   const textRef = useRef();

//   // Rotate the text in the render loop
//   useFrame(() => {
//     if (textRef.current) {
//       textRef.current.rotation.y += 0.01;
//     }
//   });

//   const shaderMaterial = {
//     uniforms: {
//       elapsed: { value: 0.0 },
//     },
//     vertexShader: `
//       uniform float elapsed;
//       varying vec2 vUv;
//       void main() {
//         vec3 pos = position;
//         float waveAmplitude = 0.1;
//         float waveX = vUv.x * 3.1415 * 4.0 - mod(elapsed / 300.0, 6.283);
//         float waveZ = sin(waveX) * waveAmplitude;
//         pos.z += waveZ;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//         vUv = uv;
//       }
//     `,
//     fragmentShader: `
//       varying vec2 vUv;
//       void main() {
//         gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
//       }
//     `,
//   };

//   return (
//     <Text
//       ref={textRef}
//       color="white"
//       fontSize={1}
//       position={[0, 0, 0]}
//       anchorX="center"
//       anchorY="middle"
//       material={shaderMaterial}
//       material-toneMapped={false} // Disable tone mapping for custom shader materials
//       onUpdate={(self) => {
//         self.material.uniforms.elapsed.value += 0.1; // Update the 'elapsed' uniform in the shader
//       }}
//     >
//       Hello, 3D World!
//     </Text>
//   );
// };

// export default TextComponent;
