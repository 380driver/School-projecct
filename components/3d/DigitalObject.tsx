import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { Html } from '@react-three/drei';

export const DigitalObject = () => {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;

            if (active) {
                meshRef.current.rotation.z += delta * 2;
            }
        }
    });

    return (
        <mesh
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial
                color={hovered ? "#06b6d4" : "#0f172a"}
                wireframe={!active}
                transparent
                opacity={0.8}
                emissive={active ? "#06b6d4" : "#000000"}
                emissiveIntensity={active ? 2 : 0}
            />
            <Html distanceFactor={15}>
                <div className={`pointer-events-none select-none transition-opacity duration-300 ${hovered || active ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                        {active ? "DIGITAL STATE" : "PHYSICAL STATE"}
                    </div>
                </div>
            </Html>
        </mesh>
    );
};
