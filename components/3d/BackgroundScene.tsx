import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} ref={meshRef} scale={2.2}>
        <MeshDistortMaterial
          color="#004879"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

const DataParticles = () => {
    const count = 100;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = new THREE.Object3D();
    
    useFrame((state) => {
      if(!mesh.current) return;
      const t = state.clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const x = Math.sin(i * 0.3 + t * 0.5) * 6;
        const y = Math.cos(i * 0.5 + t * 0.3) * 4;
        const z = Math.sin(i * 0.5 + t * 0.2) * 5;
        
        dummy.position.set(x, y, z - 5);
        dummy.scale.setScalar(0.05);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    });
  
    return (
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#D03027" emissive="#D03027" emissiveIntensity={2} />
      </instancedMesh>
    );
  }

export const BackgroundScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D03027" />
          
          <AnimatedSphere />
          <DataParticles />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};