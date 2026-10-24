import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import Universe2DFallback from './Universe2DFallback';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Node data definition
const UNIVERSE_NODES = [
  {
    id: 'learn',
    name: 'LEARN',
    sub: '5-Stage Mastery Journey',
    pos: [3.2, 1.2, 0.4],
    color: '#A855F7',
    target: '#learn'
  },
  {
    id: 'hackathons',
    name: 'HACKATHONS',
    sub: '4 Live Missions • $150k Pools',
    pos: [-3.0, 1.4, 0.8],
    color: '#FACC15',
    target: '#hackathons'
  },
  {
    id: 'projects',
    name: 'PROJECTS',
    sub: 'Production Open Source Builds',
    pos: [2.6, -1.8, 1.2],
    color: '#34D399',
    target: '#projects'
  },
  {
    id: 'colleges',
    name: 'COLLEGES',
    sub: 'Campus Constellation Hubs',
    pos: [-2.8, -1.7, -0.6],
    color: '#FB7185',
    target: '#colleges'
  },
  {
    id: 'tracks',
    name: 'CAREERS',
    sub: '6 Trajectory Specializations',
    pos: [0.6, 2.8, -1.0],
    color: '#38BDF8',
    target: '#tracks'
  },
  {
    id: 'pathfinder',
    name: 'PATHFINDER',
    sub: 'Intelligent Opportunity Engine',
    pos: [-0.6, -2.6, 1.4],
    color: '#FDE047',
    target: '#pathfinder'
  }
];

// Central DKoder Core Node
function DkoderCore() {
  const meshRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#A855F7"
          wireframe
          emissive="#7E3AF2"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Inner Glowing Energy Core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.75, 24, 24]} />
        <meshStandardMaterial
          color="#FFE600"
          emissive="#FACC15"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>

      {/* Orbital Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.9, 0.02, 16, 100]} />
        <meshBasicMaterial color="#FACC15" opacity={0.6} transparent />
      </mesh>

      {/* Central Brand Badge */}
      <Html center position={[0, 0, 0]} distanceFactor={8} pointerEvents="none">
        <div className="flex flex-col items-center select-none pointer-events-none">
          <span className="font-display font-black text-xs text-dkoder-darker bg-dkoder-yellow px-1.5 py-0.5 rounded shadow-glow-yellow">
            DKODER
          </span>
        </div>
      </Html>
    </group>
  );
}

// Interactive Orbital Node
function InteractiveNode({ node, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(node.target);
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={node.pos}>
        {/* Node Mesh */}
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
          scale={hovered ? 1.35 : 1}
        >
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered ? 1.4 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Ambient Halo */}
        <mesh scale={hovered ? 1.6 : 1.1}>
          <sphereGeometry args={[0.48, 16, 16]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={hovered ? 0.35 : 0.12}
            wireframe
          />
        </mesh>

        {/* Floating Tooltip/Badge */}
        <Html
          position={[0, 0.7, 0]}
          center
          distanceFactor={7}
          style={{ transition: 'all 0.2s', pointerEvents: hovered ? 'auto' : 'none' }}
        >
          <div
            onClick={handleClick}
            className={`cursor-pointer px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300 text-center select-none whitespace-nowrap shadow-xl ${
              hovered
                ? 'bg-dkoder-darker/95 border-dkoder-yellow scale-110 shadow-glow-yellow'
                : 'bg-dkoder-darker/70 border-white/10 opacity-80'
            }`}
          >
            <div className="flex items-center gap-1.5 justify-center">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                {node.name}
              </span>
            </div>
            {hovered && (
              <p className="text-[10px] text-slate-300 font-sans mt-0.5">
                {node.sub}
              </p>
            )}
          </div>
        </Html>
      </group>
    </Float>
  );
}

// Background Starfield Particles
function UniverseParticles({ count = 200 }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 22;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 22;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return coords;
  }, [count]);

  const pointsRef = useRef();
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#DDD6FE"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Scene Camera & Mouse Parallax
function SceneController({ onSelectNode }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    // Smooth camera tilt based on mouse pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.25, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <DkoderCore />

      {/* Outer Orbit Nodes & Connections */}
      {UNIVERSE_NODES.map((node) => (
        <group key={node.id}>
          <Line
            points={[[0, 0, 0], node.pos]}
            color={node.color}
            lineWidth={0.8}
            transparent
            opacity={0.25}
            dashed
            dashScale={2}
          />
          <InteractiveNode node={node} onSelect={onSelectNode} />
        </group>
      ))}

      {/* Particles */}
      <UniverseParticles count={250} />
    </group>
  );
}

export default function OpportunityUniverse({ onNodeSelect }) {
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSelect = (target) => {
    if (onNodeSelect) {
      onNodeSelect(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If WebGL fails or reduced motion requested, fallback smoothly
  if (hasError || prefersReducedMotion) {
    return <Universe2DFallback onNodeSelect={handleSelect} />;
  }

  return (
    <div className="relative w-full h-[450px] sm:h-[540px] lg:h-[620px] select-none" data-node-3d>
      <Suspense fallback={<Universe2DFallback onNodeSelect={handleSelect} />}>
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 48 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onError={() => setHasError(true)}
          className="w-full h-full"
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#FDE047" />
          <pointLight position={[-5, -5, -3]} intensity={1.0} color="#A855F7" />
          <SceneController onSelectNode={handleSelect} />
        </Canvas>
      </Suspense>
    </div>
  );
}
