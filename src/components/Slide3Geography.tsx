import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Html, useTexture, Billboard } from "@react-three/drei";

const EARTH_TEXTURE_URL = "/textures/8k_earth_daymap.jpg"; // put your texture here (public/)

// City coordinates (lat, lon in degrees) and descriptions
const CITIES = {
  Chengdu: { 
    lat: 30.5728, 
    lon: -104.0668,
    description: "I was born in Chengdu and I visit during the summers because my grandparents live there."
  },
  Beijing: { 
    lat: 39.9042, 
    lon: -116.4074,
    description: "I spent most of my childhood in Beijing where I was homeschooled rather than going to kindergarten. This was also when I first developed my interest for science."
  },
  Toronto: { 
    lat: 43.6532, 
    lon: 79.3832,
    description: "I moved to Toronto when I was 6 and I've been living here ever since."
  },
  Albion: {
    lat: 42.2475,
    lon: 84.7532,
    description: "This is where I spent quite possibly the best 5 weeks of my life up until this point. Working from 6 AM to 10 PM, SSP was an unforgettable and life-changing experience"
  },
  Cuba: {
    lat: 23.1136,
    lon: 82.3666,
    description: "My favorite vacation spot. It was a blend of golden beaches and all-you-can-eat buffets as well as rich and complex history influenced by many different cultures."
  },
  Banff: {
    lat: 51.4968,
    lon: 115.9281,
    description: "My most recent vacation spot. Took lots of photos (I have yet to color-correct/edit a bunch of them so I won't be posting them yet). A photo gallery might be a new feature that I might want to add to the site."
  },
  Zhangjiajie: {
    lat: 29.1171,
    lon: -110.4792,
    description: "Two beautiful places in China that I have yet to have a chance to visit, but I would love to go there during the summer."
  },
  Jiuzhaigou: {
    lat: 33.2529,
    lon: -103.9180,
    description: "Two beautiful places in China that I have yet to have a chance to visit, but I would love to go there during the summer."
  },
} as const;

type CityKey = keyof typeof CITIES;

// Convert lat/lon to a 3D position on a sphere (y up, z forward)
function latLonToVector3(latDeg: number, lonDeg: number, radius: number) {
  const lat = THREE.MathUtils.degToRad(latDeg);
  const lon = THREE.MathUtils.degToRad(lonDeg);
  const x = radius * Math.cos(lat) * Math.cos(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lon);
  return new THREE.Vector3(x, y, z);
}

function useIdleTimer(timeoutMs: number) {
  const [lastActive, setLastActive] = useState<number>(() => performance.now());
  const markActive = () => setLastActive(performance.now());
  const idle = performance.now() - lastActive > timeoutMs;
  return { idle, markActive } as const;
}

function ParallaxStars({ strength = 0.25 }: { strength?: number }) {
  const group = useRef<THREE.Group>(null!);
  const { mouse, viewport, camera } = useThree();

  // Two layers of stars at different radii for subtle depth
  // Drei's <Stars /> is efficient and pretty out of the box.
  useFrame(() => {
    // Normalized mouse is already ~[-1,1]
    const targetX = -mouse.x * strength; // invert for pleasing parallax
    const targetY = mouse.y * strength;
    group.current.position.lerp(new THREE.Vector3(targetX, targetY, 0), 0.05);
  });

  return (
    <group ref={group}>
      <Stars radius={200} depth={60} count={8000} factor={4} fade speed={0} />
      <Stars radius={300} depth={120} count={6000} factor={6} fade speed={0} />
    </group>
  );
}

function Globe({ radius = 1 }: { radius?: number }) {
  // Load earth texture (equirectangular). If missing, fall back to a simple color.
  const texture = useTexture(EARTH_TEXTURE_URL, (t) => {
    if (Array.isArray(t)) return;
    t.anisotropy = 8;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
  });

  // Subtle night-side dimming via lambert + low ambient
  return (
    <mesh>
      <sphereGeometry args={[radius, 128, 128]} />
      {texture ? (
        <meshStandardMaterial map={texture as THREE.Texture} roughness={1} metalness={0} />
      ) : (
        <meshStandardMaterial color="#2b6cb0" roughness={1} metalness={0} />
      )}
    </mesh>
  );
}

function LocationMarker({ position, label, description }: { position: THREE.Vector3; label: string; description: string }) {
  const [hovered, setHovered] = useState(false); // State to track hover status
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Debug: log hover state changes
  useEffect(() => {
    if (hovered) {
      console.log(`Hovered over: ${label}`);
    }
  }, [hovered, label]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(true);
    }, 50); // Small delay to prevent flickering
  };

  const handlePointerOut = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(false);
    }, 100); // Slightly longer delay to prevent flickering on exit
  };

  return (
    <group position={position.toArray()}>
      {/* Much larger invisible hitbox for easier hover detection */}
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.3, 16, 16]} /> {/* Even larger invisible sphere for easier hover */}
        <meshStandardMaterial transparent={true} opacity={0} /> {/* Invisible but interactive */}
      </mesh>
      
      {/* Visible marker */}
      <mesh>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial emissive={new THREE.Color('#ffdd55')} emissiveIntensity={1} color={'#ffd14d'} />
      </mesh>
      
        <BillboardText label={label} position={[0,0,0.3]} />
      {hovered && ( // Render tooltip if hovered
        <Html 
          position={[0, 0.05, 0.02]} 
          style={{ 
            background: 'rgba(0, 0, 0, 0.95)', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '8px',
            fontSize: '14px',
            width: '600px',
            maxHeight: '100px',
            overflowY: 'auto',
            zIndex: 1000,
            lineHeight: '1.5',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            wordWrap: 'break-word'
          }}
        >
          {description}
        </Html>
      )}
    </group>
  );
}

function BillboardText({ label, position = [0, 0.12, 0.02] }: { label: string; position?: [number, number, number] }) {
  return (
    <Billboard>
      <Text
        position={position}
        fontSize={0.05}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.004}
        outlineColor="#000"
        children={label}
      />
    </Billboard>
  );
}

function greatCircleArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  height: number,
  segments = 128
) {
  // Raise midpoint above the sphere for the "airline arc" look
  const startLift = start.clone().setLength(radius * 1.02);
  const endLift = end.clone().setLength(radius * 1.02);

  // Great-circle midpoint approximation via slerp
  const mid = start.clone().normalize().add(end.clone().normalize());
  if (mid.lengthSq() === 0) mid.set(0, 1, 0);
  mid.normalize();
  const midLift = mid.clone().multiplyScalar(radius * (1 + height));

  // Smooth Catmull-Rom through start → midLift → end
  const curve = new THREE.CatmullRomCurve3([startLift, midLift, endLift]);
  return curve.getPoints(segments);
}

function FlightArc({
  from,
  to,
  radius = 1,
  height = 0.25,
  color = "#ff6b6b",
  dash = false,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  radius?: number;
  height?: number;
  color?: string;
  dash?: boolean;
}) {
  const points = useMemo(() => greatCircleArcPoints(from, to, radius, height, 160), [from, to, radius, height]);
  const lineRef = useRef<THREE.Line>(null!);

  // Optional mild "flow" effect by animating dash offset when dashed
  useFrame(({ clock }) => {
    if (!dash || !lineRef.current) return;
    const mat = lineRef.current.material as THREE.LineDashedMaterial;
    // Use bracket notation to access dashOffset to avoid TypeScript errors
    (mat as any).dashOffset = -clock.getElapsedTime() * 0.25;
  });

  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <primitive object={new THREE.Line(geom)} ref={lineRef}>
      {dash ? (
        <lineDashedMaterial color={color} linewidth={1} dashSize={0.05} gapSize={0.025} />
      ) : (
        <lineBasicMaterial color={color} linewidth={1} />
      )}
    </primitive>
  );
}

function Scene() {
  const globeRadius = 1.2;
  const group = useRef<THREE.Group>(null!);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  // Default camera state
const defaultPos = useMemo(() => new THREE.Vector3(0, 0, 3.2), []);
  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  // Idle behavior control
  const { idle, markActive } = useIdleTimer(4000);
  const [isInteracting, setIsInteracting] = useState(false);

  // City positions
  const pChengdu = useMemo(() => latLonToVector3(CITIES.Chengdu.lat, CITIES.Chengdu.lon, globeRadius), []);
  const pBeijing = useMemo(() => latLonToVector3(CITIES.Beijing.lat, CITIES.Beijing.lon, globeRadius), []);
  const pToronto = useMemo(() => latLonToVector3(CITIES.Toronto.lat, CITIES.Toronto.lon, globeRadius), []);
  const pAlbion = useMemo(() => latLonToVector3(CITIES.Albion.lat, CITIES.Albion.lon, globeRadius), []);
  const pCuba = useMemo(() => latLonToVector3(CITIES.Cuba.lat, CITIES.Cuba.lon, globeRadius), []);
  const pBanff = useMemo(() => latLonToVector3(CITIES.Banff.lat, CITIES.Banff.lon, globeRadius), []);
  const pZhangjiajie = useMemo(() => latLonToVector3(CITIES.Zhangjiajie.lat, CITIES.Zhangjiajie.lon, globeRadius), []);
  const pJiuzhaigou = useMemo(() => latLonToVector3(CITIES.Jiuzhaigou.lat, CITIES.Jiuzhaigou.lon, globeRadius), []);

  // Ensure camera starts at default
  useEffect(() => {
    camera.position.copy(defaultPos);
    camera.lookAt(defaultTarget);
  }, [camera, defaultPos, defaultTarget]);

  // Hook OrbitControls events for interaction tracking
  useEffect(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const onStart = () => { setIsInteracting(true); markActive(); };
    const onChange = () => { markActive(); };
    const onEnd = () => { setIsInteracting(false); markActive(); };
    ctrl.addEventListener('start', onStart);
    ctrl.addEventListener('change', onChange);
    ctrl.addEventListener('end', onEnd);
    return () => {
      ctrl.removeEventListener('start', onStart);
      ctrl.removeEventListener('change', onChange);
      ctrl.removeEventListener('end', onEnd);
    };
  }, [markActive]);

  useFrame(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;

    // Auto behavior when idle: smoothly ease back to default + slow autorotate
    if (!isInteracting && idle) {
      // Ease camera back
      camera.position.lerp(defaultPos, 0.03);
      ctrl.target.lerp(defaultTarget, 0.05);
      ctrl.autoRotate = true;
      ctrl.autoRotateSpeed = 0.3; // gentle
    } else {
      ctrl.autoRotate = false;
    }
    ctrl.update();
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1} />

      {/* Stars with parallax */}
      <ParallaxStars strength={0.25} />

      <group ref={group}>
        <Globe radius={globeRadius} />

        {/* City markers */}
        <LocationMarker position={pChengdu} label="Chengdu" description={CITIES.Chengdu.description} />
        <LocationMarker position={pBeijing} label="Beijing" description={CITIES.Beijing.description} />
        <LocationMarker position={pToronto} label="Toronto" description={CITIES.Toronto.description} />
        <LocationMarker position={pAlbion} label="Albion" description={CITIES.Albion.description} />
        <LocationMarker position={pCuba} label="Cuba" description={CITIES.Cuba.description} />
        <LocationMarker position={pBanff} label="Banff National Park" description={CITIES.Banff.description} />
        <LocationMarker position={pZhangjiajie} label="Zhangjiajie" description={CITIES.Zhangjiajie.description} />
        <LocationMarker position={pJiuzhaigou} label="Jiuzhaigou" description={CITIES.Jiuzhaigou.description} />

        {/* Flight arcs: Chengdu → Beijing → Toronto */}
        <FlightArc from={pChengdu} to={pBeijing} radius={globeRadius} height={0.18} color="#ffc857" dash />
        <FlightArc from={pBeijing} to={pToronto} radius={globeRadius} height={0.32} color="#ff6b6b" dash />
      </group>

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.35}
        zoomSpeed={0.8}
        minDistance={2}
        maxDistance={6}
        enablePan={false}
      />
    </>
  );
}

export default function Slide3Geography() {
  return (
    <div className="w-full h-full" style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 3.2] }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        <Scene />
      </Canvas>
      {/* Minimal HUD hint (click-drag / scroll) */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          padding: "6px 10px",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          fontSize: 12,
          borderRadius: 8,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        Drag to rotate · Scroll to zoom · Idles to reset
      </div>
    </div>
  );
}