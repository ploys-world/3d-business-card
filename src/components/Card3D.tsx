import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { DoubleSide } from "three"
import * as THREE from 'three'
import { useState, useRef } from "react";

export default function Card3D(){
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1}/>
            {/* Front light */}
            <directionalLight position ={[0, 0, 5]}/>
            {/* Back light */}
            <directionalLight position ={[0, 0, -5]}/>
            <FloatingCard />
        <OrbitControls />
        </Canvas>
    )
}

function FloatingCard(){
    const ref = useRef<THREE.Mesh | null>(null);
    const [flipped, setFlipped] = useState(false);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!ref.current) return
        
        const target = flipped ? Math.PI : 0;
        ref.current.rotation.y += (target - ref.current.rotation.y) * 0.1

        const t = state.clock.getElapsedTime()
        ref.current.position.y = Math.sin(t) * 0.1
    })

    return (
        <mesh 
            ref={ref} 
            onClick={() => setFlipped(!flipped)} 
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[4, 2.5, 0.01]} />
            <meshStandardMaterial color="pink" side={DoubleSide} />

            {/* Front */}
            <Html position={[0, 0, 0.006]} transform>
                <div style={{ 
                    width: '100px', 
                    height: '100x', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontFamily: 'sans-serif',
                    color: 'white',
                    textAlign: 'center',
                    gap: '20px'
                }}
            >
                    <img
                        src="src/assets/memoji.png"
                        alt="profile"
                        style={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover'
                        }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <h2 style={{ fontSize: '1rem', margin: 0, lineHeight: 1.3 }}>Ploy Unchit</h2>
                        <p style={{ fontSize: '.5rem', margin: 0 }}>Software Engineer</p>
                        <p style={{ fontSize: '.3rem', marginTop: '6px', opacity: 0.8}}>React · TypeScript · Three.js · Tailwind · Vite</p>
                    </div>
                </div>
            </Html>
        </mesh>
    )
}