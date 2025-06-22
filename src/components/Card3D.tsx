import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three"

export default function Card3D(){
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1}/>
            {/* Front light */}
            <directionalLight position ={[0, 0, 5]}/>
            {/* Back light */}
            <directionalLight position ={[0, 0, -5]}/>

            <mesh>
                <boxGeometry args={[4, 2.5, 0.01]} />
                <meshStandardMaterial color="pink" side={DoubleSide} />
            </mesh>
        <OrbitControls />
        </Canvas>
    )
}