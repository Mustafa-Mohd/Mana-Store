import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';

// 3D Sun / Moon Sphere Component
const ThemeSphere = ({ isDark, toggleTheme }) => {
  const meshRef = useRef();

  // Animation spring for the sphere
  const { color, scale, rotation } = useSpring({
    color: isDark ? '#a0aec0' : '#ecc94b', // Moon grey vs Sun gold
    scale: isDark ? [1.2, 1.2, 1.2] : [1.4, 1.4, 1.4],
    rotation: isDark ? [0, Math.PI, 0] : [0, 0, 0],
    config: { mass: 2, tension: 170, friction: 20 }
  });

  // Slow constant rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <a.mesh
      ref={meshRef}
      onClick={toggleTheme}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
      scale={scale}
      rotation={rotation}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <a.meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={isDark ? 0.2 : 0.6}
        roughness={0.4}
        metalness={0.1}
      />
    </a.mesh>
  );
};

const ThreeDarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial local storage or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    const themeStr = newDark ? 'dark' : 'light';
    localStorage.setItem('theme', themeStr);
    
    // Apply data attribute to body
    if (newDark) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      width: '80px',
      height: '80px',
      zIndex: 10000,
      filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.3))'
    }}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ThemeSphere isDark={isDark} toggleTheme={toggleTheme} />
      </Canvas>
    </div>
  );
};

export default ThreeDarkModeToggle;
