import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Box3, Vector3 } from "three";

const models = [
  "/nike/the_10_nike_air_presto_x_off-white.glb",
  "/nike/air_jordan_1_chicago_black_toe.glb",
  "/nike/air_jordan_1_mid_particle_beige.glb",
  "/nike/air_jordan_1.glb",
  "/nike/air_jordan_6_polycam_scan.glb",
  "/nike/air_jordan_36_bred.glb",
  "/nike/day_203_jordan_3.glb",
  "/nike/jade_jordan_fixed_low_poly.glb",
  "/nike/jordan_4_retro_sb_pine_green.glb",
  "/nike/jordan_4_retro_travis_scott_purple.glb",
  "/nike/jordan_36_winterized_concept.glb",
  "/nike/lebron_9_p.s._elite_south_beach.glb",
  "/nike/nike_air_jordans_retopo.glb",
  "/nike/nike_air_max_90.glb",
  "/nike/nike_air_max_95_animal.glb",
  "/nike/nike_air_presto_x_off-white_black.glb",
  "/nike/nike_air.glb",
  "/nike/nike_defy_all_day_walking_sneakers_shoes.glb",
  "/nike/nike_dunk_hawaii_-_6k_triangles.glb",
  "/nike/nike_dunks_game_ready__2k_pbr.glb",
  "/nike/nike_flex_runner.glb",
  "/nike/nike_hyperdunk_2015_camo.glb",
  "/nike/nike_running_shoe.glb",
  "/nike/nike_sb_charge_cnvs.glb",
  "/nike/nike_shoe.glb",
  "/nike/nike_tc_7900_sail.glb",
  "/nike/nike.glb",
  "/nike/pegasus_trail.glb",
  "/nike/shoe_model_air_jordan_5.glb",
  "/nike/sneaker_painted.glb",
];

const Model = ({
  src,
  isScaled,
  setHovered,
}: {
  src: string;
  isScaled: React.MutableRefObject<boolean>;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { scene } = useGLTF(src);
  const mesh = useRef<THREE.Mesh>(null!);
  const [isRotating, setIsRotating] = useState(false); // To track rotation state

  useFrame(() => {
    if (mesh.current && !isScaled.current) {
      const box = new Box3().setFromObject(mesh.current);
      const size = new Vector3();
      box.getSize(size);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5.0 / maxDim;

      mesh.current.scale.set(scale, scale, scale);
      isScaled.current = true; // Mark the model as scaled
    }

    if (isRotating) {
      mesh.current.rotation.y -= 0.01; // Rotate in the opposite direction
    }
  });

  return (
    <primitive
      ref={mesh}
      object={scene}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setIsRotating(true); // Start rotating
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        setIsRotating(false); // Stop rotating
      }}
    />
  );
};

const LazyModel = ({ src }: { src: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isScaled = useRef(false); // Moved here to reset when LazyModel unmounts

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {});

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      isScaled.current = false; // Reset the isScaled ref
    };
  }, []);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  }, [isHovered]);
  return (
    <div ref={ref}>
      {isVisible && (
        <Canvas>
          <perspectiveCamera position={[0, 0, 7]} />
          <ambientLight intensity={5} />
          <CameraControls />
          <Model src={src} isScaled={isScaled} setHovered={setHovered} />
        </Canvas>
      )}
    </div>
  );
};

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return <OrbitControls args={[camera, domElement]} enableZoom={false} />;
};

const ModelFeed = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {models.map((model, index) => (
        <div key={index} className="h-60 w-full">
          <LazyModel src={model} />
        </div>
      ))}
    </div>
  );
};

export default ModelFeed;
