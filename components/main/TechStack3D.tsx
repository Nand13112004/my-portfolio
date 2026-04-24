"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  OrbitControls,
  useTexture,
  Float,
  Html,
  useGLTF,
  ContactShadows,
  Text3D,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

// ─── Skill Data ────────────────────────────────────────────────────────────────
const ORBIT_SKILLS = [
  { name: "React", image: "/skills/react_logo/scene.gltf", isModel: true },
  { name: "Node.js", image: "/skills/node.js_logo__3d_model/scene.gltf", isModel: true },
  { name: "TypeScript", image: "/skills/typescript_logo__3d_model/scene.gltf", isModel: true },
  { name: "MongoDB", image: "/skills/mongodb_logo__3d_model/scene.gltf", isModel: true },
  { name: "Tailwind", image: "/skills/tailwind_css_logo__3d_model/scene.gltf", isModel: true },
  { name: "Java", image: "/skills/java/scene.gltf", isModel: true },
  { name: "Python", image: "/skills/python_logo/scene.gltf", isModel: true },
  { name: "Git", image: "/skills/git_logo/scene.gltf", isModel: true },
];

// Pre-load all assets at module level (safe, not in component body)
ORBIT_SKILLS.forEach((s) => {
  if (s.isModel) useGLTF.preload(s.image);
  else useTexture.preload(s.image);
});

// ─── Shared animation hook ────────────────────────────────────────────────────
function useOrbitAnimation(
  groupRef: React.RefObject<THREE.Group>,
  index: number,
  total: number,
  radius: number,
  isSelected: boolean,
  isAnythingSelected: boolean,
  hovered: boolean,
) {
  const baseAngle = (index / total) * Math.PI * 2;
  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const angle = baseAngle + t * 0.15;

    if (isSelected) {
      targetPosition.set(0, 0, 0);
      targetScale.set(2.2, 2.2, 2.2);
      groupRef.current.rotation.y += 0.008;
    } else {
      targetPosition.x = Math.cos(angle) * radius;
      targetPosition.z = Math.sin(angle) * radius;
      targetPosition.y = Math.sin(t * 0.8 + index) * 0.4;
      groupRef.current.rotation.y = t * 0.6; // Rotate on its own axis
      groupRef.current.rotation.x = -0.05;

      const base = isAnythingSelected ? 0.55 : 1.0;
      const hover = hovered && !isAnythingSelected ? 1.25 : base;
      targetScale.set(hover, hover, hover);
    }

    groupRef.current.position.lerp(targetPosition, 0.06);
    groupRef.current.scale.lerp(targetScale, 0.08);
  });
}

// ─── PNG Logo Component ───────────────────────────────────────────────────────
const PngLogo = ({
  index, total, skill, radius, isSelected, onSelect, isAnythingSelected,
}: {
  index: number; total: number;
  skill: { name: string; image: string };
  radius: number; isSelected: boolean;
  onSelect: (i: number | null) => void;
  isAnythingSelected: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const texture = useTexture(skill.image);
  const [hovered, setHovered] = useState(false);

  useOrbitAnimation(groupRef, index, total, radius, isSelected, isAnythingSelected, hovered);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : index); }}
    >
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh>
          <planeGeometry args={[1.6, 1.6]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
        {(hovered || isSelected) && (
          <Text position={[0, -1.0, 0]} fontSize={0.22} color="white" anchorX="center" anchorY="middle">
            {skill.name}
          </Text>
        )}
      </Float>
    </group>
  );
};

// ─── GLTF Model Component ─────────────────────────────────────────────────────
const ModelLogo = ({
  index, total, skill, radius, isSelected, onSelect, isAnythingSelected,
}: {
  index: number; total: number;
  skill: { name: string; image: string };
  radius: number; isSelected: boolean;
  onSelect: (i: number | null) => void;
  isAnythingSelected: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(skill.image);
  const [hovered, setHovered] = useState(false);

  // Clone and auto-normalize scale so every model fits in a ~2-unit cube
  const { clonedScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 2.0 / maxDim : 1;
    // Center the model at origin BEFORE the external scale is applied
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center); // ← fix: do not multiply center by scale

    // ─── MODEL LIGHTING & BRIGHTNESS CONFIGURATION ─────────────────────────────
    // You can adjust these values to make individual models brighter or darker.
    // 0 = normal lighting, higher values = brighter glow (emissive)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Enable shadows for realistic 3D depth
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          // Clone material so we don't accidentally modify other models
          mesh.material = (mesh.material as THREE.Material).clone();
          const mat = mesh.material as any;

          let brightnessIntensity = 0;

          // ▼▼▼ EDIT SPECIFIC MODEL BRIGHTNESS HERE ▼▼▼
          switch (skill.name) {
            case "Python":
              brightnessIntensity = 1.0; // Python naturally dark, boost it
              break;
            case "TypeScript":
              brightnessIntensity = 1.0; // TypeScript naturally dark, boost it
              break;
            case "Node.js":
              brightnessIntensity = 1.0; // Node.js naturally dark, boost it
              break;
            case "React":
              brightnessIntensity = 0; // React is already bright enough
              break;
            case "Tailwind":
              brightnessIntensity = 0; // Tailwind is already bright enough
              break;
            case "MongoDB":
              brightnessIntensity = 0; // MongoDB is already bright enough
              break;
            case "Java":
              brightnessIntensity = 0; // Java is already bright enough
              break;
            case "Git":
              brightnessIntensity = 0; // Git is already bright enough
              break;
            default:
              brightnessIntensity = 0; // Default fallback
              break;
          }

          // Apply the artificial brightness if configured
          if (brightnessIntensity > 0) {
            if (mat.map) {
              // If the model uses an image texture
              mat.emissiveMap = mat.map;
              mat.emissive = new THREE.Color(0xffffff);
              mat.emissiveIntensity = brightnessIntensity;
            } else if (mat.color) {
              // If the model uses solid colors
              mat.emissive = mat.color.clone();
              mat.emissiveIntensity = brightnessIntensity * 0.5; // Scale down for solid colors
            }
          }
        }
      }
    });

    return { clonedScene: clone, normalizedScale: scale };
  }, [scene, skill.name]);

  useOrbitAnimation(groupRef, index, total, radius, isSelected, isAnythingSelected, hovered);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : index); }}
    >
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
        <primitive object={clonedScene} scale={normalizedScale} />
        {(hovered || isSelected) && (
          <Text position={[0, -1.2, 0]} fontSize={0.22} color="white" anchorX="center" anchorY="middle">
            {skill.name}
          </Text>
        )}
      </Float>
    </group>
  );
};

// ─── Center Text — animates DOWN and fades out when any logo is selected ──────
const CenterText = ({ isAnythingSelected }: { isAnythingSelected: boolean }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = isAnythingSelected ? -6 : 0;
    const targetS = isAnythingSelected ? 0.05 : 1.0;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y, targetY, 0.06,
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetS, 0.06),
    );
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      <Center position={[0, 0.5, 0]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={0.65}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          castShadow
        >
          TECH STACK
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.8} emissive="#7042f8" emissiveIntensity={0.2} />
        </Text3D>
      </Center>

      <Center position={[0, -0.4, 0]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.22}
          height={0.05}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
          castShadow
        >
          Technologies I work with
          <meshStandardMaterial color="#9090c0" roughness={0.4} metalness={0.5} />
        </Text3D>
      </Center>
    </group>
  );
};

// ─── Orbit Rings — always visible, independent of selection state ─────────────
const OrbitRings = () => (
  <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <ringGeometry args={[3.8, 4.0, 64]} />
      <meshBasicMaterial color="#7042f8" transparent opacity={0.35} side={THREE.DoubleSide} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
      <ringGeometry args={[5.2, 5.35, 64]} />
      <meshBasicMaterial color="#00d8ff" transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
      <circleGeometry args={[1.5, 32]} />
      <meshBasicMaterial color="#7042f8" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  </>
);

// ─── Scene ────────────────────────────────────────────────────────────────────
const Scene = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <ambientLight intensity={0.8} />
      {/* Configure directional light to cast high-quality shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[0, 2, 0]} intensity={2} color="#7042f8" distance={15} />
      <pointLight position={[0, -2, 4]} intensity={1} color="#00d8ff" distance={10} />

      {/* Rings are outside the animated group — they never move */}
      <OrbitRings />

      <group onPointerMissed={() => setSelectedIndex(null)}>
        {/* Only the text slides down when a logo is selected */}
        <CenterText isAnythingSelected={selectedIndex !== null} />

        {ORBIT_SKILLS.map((skill, index) =>
          skill.isModel ? (
            <Suspense key={skill.name} fallback={null}>
              <ModelLogo
                index={index} total={ORBIT_SKILLS.length} skill={skill}
                radius={6} isSelected={selectedIndex === index}
                onSelect={setSelectedIndex} isAnythingSelected={selectedIndex !== null}
              />
            </Suspense>
          ) : (
            <Suspense key={skill.name} fallback={null}>
              <PngLogo
                index={index} total={ORBIT_SKILLS.length} skill={skill}
                radius={6} isSelected={selectedIndex === index}
                onSelect={setSelectedIndex} isAnythingSelected={selectedIndex !== null}
              />
            </Suspense>
          )
        )}
      </group>

      {/* Realistic contact shadows on the floor */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={5}
        color="#000000"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.1}  /* never go below horizon */
        minPolarAngle={Math.PI / 4}          /* can't go fully overhead */
      />
    </>
  );
};

// ─── Export ───────────────────────────────────────────────────────────────────
export const TechStack3D = () => (
  <section
    id="tech-stack-3d"
    className="relative flex flex-col items-center justify-center w-full z-[20] bg-transparent"
    style={{ height: "clamp(420px, 65vh, 700px)" }}
  >
    {/* Page heading — HTML overlay at the top */}
    <div className="absolute top-6 flex flex-col items-center text-center z-10 w-full px-5 pointer-events-none">
      <p className="text-sm font-semibold tracking-widest text-purple-400 uppercase mb-1">Tech Stack</p>
      <h2 className="text-2xl sm:text-4xl font-bold text-white">
        Technologies I{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
          work with
        </span>
      </h2>
      <p className="text-gray-400 text-xs sm:text-sm mt-2 px-4 text-center">Tools and technologies that power my development journey</p>
    </div>

    {/* 3D Canvas */}
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [-3, 4, 11], fov: 55 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <React.Suspense fallback={<Html center><span className="text-white text-sm">Loading…</span></Html>}>
          <Scene />
        </React.Suspense>
      </Canvas>
    </div>

    {/* Hint pill */}
    <div className="absolute bottom-4 flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-3 sm:px-5 py-2.5 rounded-full z-10 pointer-events-none max-w-[90vw]">
      <span className="text-gray-400 text-[10px] sm:text-xs text-center">🖱️ Move your mouse to interact • Click a logo to focus</span>
    </div>
  </section>
);
