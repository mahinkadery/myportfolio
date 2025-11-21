/**
 * 3D Particle Starfield Background
 * Creates an animated particle system similar to antigravity.google
 * Uses Three.js for WebGL rendering
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Check if canvas exists
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) {
      console.warn('Background canvas not found');
      return;
    }

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
      console.error('Three.js is not loaded');
      return;
    }

    // Configuration
    const PARTICLE_COUNT = 1500; // Adjust based on performance
    const DEPTH = 2000; // Depth of the particle field
    const SPEED = 0.3; // Base speed multiplier
    const SIZE = 1.5; // Particle size

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup - Perspective camera for 3D effect
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      DEPTH * 2 // Far clipping plane
    );
    camera.position.z = DEPTH / 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, // Transparent background
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Particle geometry - distribute particles in 3D space
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    // Create particles in a cube/sphere distribution
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Position particles in a cube around the camera
      const radius = DEPTH * 0.8;
      positions[i3] = (Math.random() - 0.5) * radius * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * radius * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * DEPTH;

      // Assign velocities based on depth for parallax effect
      // Particles closer to camera move faster, creating depth illusion
      const depthFactor = (positions[i3 + 2] + DEPTH / 2) / DEPTH;
      const speedMultiplier = 0.5 + depthFactor * 1.5; // Closer particles are faster

      velocities[i3] = (Math.random() - 0.5) * SPEED * speedMultiplier;
      velocities[i3 + 1] = (Math.random() - 0.5) * SPEED * speedMultiplier;
      velocities[i3 + 2] = (Math.random() - 0.5) * SPEED * speedMultiplier * 0.5;

      // Color variation - subtle white/blue tint based on depth
      const brightness = 0.6 + depthFactor * 0.4; // Brighter when closer
      const colorHue = 0.55 + (Math.random() - 0.5) * 0.1; // Slight blue tint
      colors[i3] = brightness * colorHue; // R
      colors[i3 + 1] = brightness * (colorHue + 0.1); // G
      colors[i3 + 2] = brightness; // B

      // Size variation based on depth
      sizes[i] = SIZE * (0.5 + depthFactor * 0.8);
    }

    // Set geometry attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Shader material for soft, glowing particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          alpha *= 0.8; // Slight transparency
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending // Soft glowing effect
    });

    // Alternative: Use PointsMaterial if shader is too complex
    // const material = new THREE.PointsMaterial({
    //   size: SIZE,
    //   color: 0xffffff,
    //   transparent: true,
    //   opacity: 0.8,
    //   vertexColors: true,
    //   sizeAttenuation: true
    // });

    // Create particle system
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation loop
    let animationId = null;
    let lastTime = performance.now();

    function animate(currentTime) {
      animationId = requestAnimationFrame(animate);

      const deltaTime = (currentTime - lastTime) * 0.001; // Convert to seconds
      lastTime = currentTime;

      // Update particle positions
      const positions = geometry.attributes.position.array;
      const velocitiesArray = velocities;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // Update position
        positions[i3] += velocitiesArray[i3] * deltaTime * 60; // Normalize to 60fps
        positions[i3 + 1] += velocitiesArray[i3 + 1] * deltaTime * 60;
        positions[i3 + 2] += velocitiesArray[i3 + 2] * deltaTime * 60;

        // Wrap particles when they go out of bounds (seamless loop)
        const halfDepth = DEPTH / 2;
        const halfWidth = window.innerWidth * 0.6;
        const halfHeight = window.innerHeight * 0.6;

        if (Math.abs(positions[i3]) > halfWidth) {
          positions[i3] = -Math.sign(positions[i3]) * halfWidth;
        }
        if (Math.abs(positions[i3 + 1]) > halfHeight) {
          positions[i3 + 1] = -Math.sign(positions[i3 + 1]) * halfHeight;
        }
        if (positions[i3 + 2] > halfDepth) {
          positions[i3 + 2] = -halfDepth;
        } else if (positions[i3 + 2] < -halfDepth) {
          positions[i3 + 2] = halfDepth;
        }
      }

      // Mark position attribute as needing update
      geometry.attributes.position.needsUpdate = true;

      // Update shader time uniform if using shader material
      if (material.uniforms && material.uniforms.time) {
        material.uniforms.time.value = currentTime * 0.001;
      }

      // Render scene
      renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    window.addEventListener('resize', handleResize);

    // Start animation
    animate(performance.now());

    // Cleanup function (optional, for if you need to stop animation)
    window.removeParticleBackground = function() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }
})();

