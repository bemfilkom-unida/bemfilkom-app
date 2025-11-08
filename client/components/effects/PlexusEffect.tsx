import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
  trail: Array<{ x: number; y: number; life: number }>; // FIXED: Fixed-size array for trail
  trailIndex: number; // NEW: Circular buffer index
  depth: number; // NEW: Simulate 3D depth
}

interface PlexusEffectProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  animationSpeed?: number;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  debug?: boolean;
  enableTrails?: boolean; // NEW: Toggle trails
  enableDepth?: boolean; // NEW: Toggle 3D simulation
}

// NEW: Simple QuadTree class for optimized connection queries
class QuadTree {
  box: { left: number; top: number; width: number; height: number };
  root: { children: any[]; values: any[] };
  getBox: (value: any) => { left: number; top: number; width: number; height: number };
  equal: (a: any, b: any) => boolean;
  Threshold: number;
  MaxDepth: number;

  constructor(
    box: { left: number; top: number; width: number; height: number },
    getBox = (value: any) => ({ left: value.x, top: value.y, width: 0, height: 0 }),
    equal = (a: any, b: any) => a === b
  ) {
    this.box = box;
    this.root = { children: [null, null, null, null], values: [] };
    this.getBox = getBox;
    this.equal = equal;
    this.Threshold = 16;
    this.MaxDepth = 8;
  }

  isLeaf(node: any) {
    return !node.children[0];
  }

  computeBox(box: any, i: number) {
    const origin = { x: box.left, y: box.top };
    const childSize = { x: box.width / 2, y: box.height / 2 };
    switch (i) {
      case 0: // NW
        return { left: origin.x, top: origin.y, width: childSize.x, height: childSize.y };
      case 1: // NE
        return { left: origin.x + childSize.x, top: origin.y, width: childSize.x, height: childSize.y };
      case 2: // SW
        return { left: origin.x, top: origin.y + childSize.y, width: childSize.x, height: childSize.y };
      case 3: // SE
        return { left: origin.x + childSize.x, top: origin.y + childSize.y, width: childSize.x, height: childSize.y };
      default:
        throw new Error("Invalid child index");
    }
  }

  getQuadrant(nodeBox: any, valueBox: any) {
    const center = { x: nodeBox.left + nodeBox.width / 2, y: nodeBox.top + nodeBox.height / 2 };
    if (valueBox.left + valueBox.width < center.x) { // West
      if (valueBox.top + valueBox.height < center.y) return 0; // NW
      else if (valueBox.top >= center.y) return 2; // SW
      else return -1;
    } else if (valueBox.left >= center.x) { // East
      if (valueBox.top + valueBox.height < center.y) return 1; // NE
      else if (valueBox.top >= center.y) return 3; // SE
      else return -1;
    } else {
      return -1;
    }
  }

  split(node: any, box: any) {
    if (!this.isLeaf(node)) throw new Error("Only leaves can be split");
    for (let i = 0; i < 4; i++) {
      node.children[i] = { children: [null, null, null, null], values: [] };
    }
    const newValues: any[] = [];
    for (const value of node.values) {
      const i = this.getQuadrant(box, this.getBox(value));
      if (i !== -1) {
        node.children[i].values.push(value);
      } else {
        newValues.push(value);
      }
    }
    node.values = newValues;
  }

  insert(value: any) {
    this.add(this.root, 0, this.box, value);
  }

  add(node: any, depth: number, box: any, value: any) {
    const valueBox = this.getBox(value);
    if (!this.contains(box, valueBox)) throw new Error("Value box not contained in node box");

    if (this.isLeaf(node)) {
      if (depth >= this.MaxDepth || node.values.length < this.Threshold) {
        node.values.push(value);
      } else {
        this.split(node, box);
        this.add(node, depth, box, value); // Retry after split
      }
    } else {
      const i = this.getQuadrant(box, valueBox);
      if (i !== -1) {
        this.add(node.children[i], depth + 1, this.computeBox(box, i), value);
      } else {
        node.values.push(value);
      }
    }
  }

  getRight(box: any) { return box.left + box.width; }
  getBottom(box: any) { return box.top + box.height; }
  intersects(box1: any, box2: any) {
    return !(box1.left >= this.getRight(box2) || this.getRight(box1) <= box2.left ||
             box1.top >= this.getBottom(box2) || this.getBottom(box1) <= box2.top);
  }
  contains(box: any, other: any) {
    return box.left <= other.left && this.getRight(other) <= this.getRight(box) &&
           box.top <= other.top && this.getBottom(other) <= this.getBottom(box);
  }

  query(box: any) {
    const values: any[] = [];
    this.queryNode(this.root, this.box, box, values);
    return values;
  }

  queryNode(node: any, nodeBox: any, queryBox: any, values: any[]) {
    if (!this.intersects(queryBox, nodeBox)) return;

    for (const value of node.values) {
      if (this.intersects(queryBox, this.getBox(value))) {
        values.push(value);
      }
    }

    if (!this.isLeaf(node)) {
      for (let i = 0; i < 4; i++) {
        const childBox = this.computeBox(nodeBox, i);
        if (this.intersects(queryBox, childBox)) {
          this.queryNode(node.children[i], childBox, queryBox, values);
        }
      }
    }
  }

  queryRadius(center: { x: number; y: number }, radius: number) {
    const diameter = radius * 2;
    const queryBox = {
      left: center.x - radius,
      top: center.y - radius,
      width: diameter,
      height: diameter
    };
    return this.query(queryBox);
  }
}

const PlexusEffect: React.FC<PlexusEffectProps> = ({
  className = '',
  nodeCount = 80,
  connectionDistance = 120,
  animationSpeed = 0.5,
  colors = {
    primary: 'rgba(107, 200, 226, 0.8)',
    secondary: 'rgba(75, 180, 210, 0.6)',
    accent: 'rgba(230, 148, 78, 0.7)',
  },
  debug = false,
  enableTrails = true,
  enableDepth = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastFrameTime = useRef<number>(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const mouseTimeoutRef = useRef<NodeJS.Timeout>();
  const TRAIL_LENGTH = 10; // NEW: Fixed trail length for perf
  const [isMobile, setIsMobile] = useState(false);

  // Initialize nodes with responsive count & FIXED trail as fixed array
  const initializeNodes = useCallback(() => {
    // OPTIMIZED: More aggressive node reduction for mobile
    const baseNodeCount = isMobile ? Math.min(nodeCount * 0.4, 30) : nodeCount;
    const responsiveNodeCount = Math.min(baseNodeCount, Math.floor((dimensions.width * dimensions.height) / (isMobile ? 25000 : 15000)));
    const newNodes: Node[] = [];
    for (let i = 0; i < responsiveNodeCount; i++) {
      const trail = new Array(TRAIL_LENGTH).fill(null).map(() => ({ x: 0, y: 0, life: 0 }));
      newNodes.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        trail,
        trailIndex: 0,
        depth: Math.random(),
      });
    }
    nodesRef.current = newNodes;
  }, [nodeCount, dimensions.width, dimensions.height, animationSpeed, isMobile]);

  // Update dimensions dengan debounce & threshold
  const updateDimensions = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      if (Math.abs(newWidth - dimensions.width) > 2 || Math.abs(newHeight - dimensions.height) > 2) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [dimensions.width, dimensions.height]);

  // Sync canvas attr width/height dengan dimensions via useLayoutEffect
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;
    // OPTIMIZED: Lower DPR for mobile devices
    const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : (window.devicePixelRatio || 1);
    const physicalWidth = Math.floor(dimensions.width * dpr);
    const physicalHeight = Math.floor(dimensions.height * dpr);
    canvas.width = physicalWidth;
    canvas.height = physicalHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    initializeNodes();
    if (debug) {
      console.log(`Canvas resized: logical ${dimensions.width}x${dimensions.height}, physical ${physicalWidth}x${physicalHeight}`);
    }
  }, [dimensions, debug, initializeNodes, isMobile]);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (canvasRef.current && mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }
    mouseTimeoutRef.current = setTimeout(() => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }, 16);
  }, []);

  // FIXED: Optimized animation loop with QuadTree for connections & circular trail buffer
  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    // OPTIMIZED: Lower frame rate for mobile (30fps vs 60fps)
    const minFrameTime = isMobile ? 33 : 16;
    if (currentTime - lastFrameTime.current < minFrameTime) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTime.current = currentTime;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // OPTIMIZED: Reduced connection distance for mobile
    const effectiveConnectionDistance = isMobile ? connectionDistance * 0.7 : connectionDistance;
    // OPTIMIZED: Disable trails and depth on mobile
    const useTrails = enableTrails && !isMobile;
    const useDepth = enableDepth && !isMobile;

    // Update nodes
    nodesRef.current.forEach(node => {
      let newX = node.x + node.vx;
      let newY = node.y + node.vy;
      if (newX <= 0 || newX >= dimensions.width) {
        node.vx *= -0.8;
        newX = Math.max(0, Math.min(dimensions.width, newX));
      }
      if (newY <= 0 || newY >= dimensions.height) {
        node.vy *= -0.8;
        newY = Math.max(0, Math.min(dimensions.height, newY));
      }
      const dx = mouse.x - newX;
      const dy = mouse.y - newY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150 && distance > 0) {
        const force = (150 - distance) / 150;
        const edgeDampen = newY < 50 ? 0.5 : 1;
        node.vx += (dx / distance) * force * 0.01 * edgeDampen;
        node.vy += (dy / distance) * force * 0.01 * edgeDampen;
      }
      const maxVelocity = 2;
      const velocity = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (velocity > maxVelocity) {
        node.vx = (node.vx / velocity) * maxVelocity;
        node.vy = (node.vy / velocity) * maxVelocity;
      }
      node.x = newX;
      node.y = newY;
      node.pulse += node.pulseSpeed;

      // FIXED: Circular buffer for trails - no push/shift/filter
      if (useTrails) {
        node.trail[node.trailIndex] = { x: newX, y: newY, life: 1 };
        node.trailIndex = (node.trailIndex + 1) % TRAIL_LENGTH;
        // Decrement all lives
        for (let j = 0; j < TRAIL_LENGTH; j++) {
          if (node.trail[j].life > 0) {
            node.trail[j].life = Math.max(0, node.trail[j].life - 0.1);
          }
        }
      }

      if (debug && node.id === 0) {
        console.log(`Node 0: y=${node.y.toFixed(2)}, vy=${node.vy.toFixed(2)}`);
      }
    });

    // Draw trails (batched)
    if (useTrails) {
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      nodesRef.current.forEach(node => {
        let startIdx = node.trailIndex;
        let activeCount = 0;
        for (let j = 0; j < TRAIL_LENGTH; j++) {
          if (node.trail[(startIdx + j) % TRAIL_LENGTH]?.life > 0) activeCount++;
          else break;
        }
        if (activeCount > 1) {
          const gradient = ctx.createLinearGradient(
            node.trail[startIdx % TRAIL_LENGTH].x, node.trail[startIdx % TRAIL_LENGTH].y,
            node.trail[(startIdx + activeCount - 1) % TRAIL_LENGTH].x, node.trail[(startIdx + activeCount - 1) % TRAIL_LENGTH].y
          );
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(1, colors.primary);
          ctx.strokeStyle = gradient;
          ctx.beginPath();
          let first = true;
          for (let j = 0; j < activeCount; j++) {
            const idx = (startIdx + j) % TRAIL_LENGTH;
            const point = node.trail[idx];
            ctx.globalAlpha = point.life * 0.5;
            if (first) {
              ctx.moveTo(point.x, point.y);
              first = false;
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
          ctx.stroke();
        }
      });
    }

    // NEW: Optimized connections with QuadTree
    const quadTree = new QuadTree(
      { left: 0, top: 0, width: dimensions.width, height: dimensions.height },
      (pt: { x: number; y: number; id: number }) => ({ left: pt.x, top: pt.y, width: 0, height: 0 })
    );
    nodesRef.current.forEach(node => {
      quadTree.insert({ x: node.x, y: node.y, id: node.id });
    });

    ctx.globalAlpha = 0.6;
    nodesRef.current.forEach((node, i) => {
      const candidates = quadTree.queryRadius({ x: node.x, y: node.y }, effectiveConnectionDistance);
      candidates.forEach((candidate: { x: number; y: number; id: number }) => {
        if (candidate.id <= node.id) return; // Avoid duplicates
        const dx = node.x - candidate.x;
        const dy = node.y - candidate.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < effectiveConnectionDistance && dist > 0) {
          const opacity = 1 - (dist / effectiveConnectionDistance);
          ctx.globalAlpha = opacity * 0.6;
          const gradient = ctx.createLinearGradient(node.x, node.y, candidate.x, candidate.y);
          gradient.addColorStop(0, colors.primary);
          gradient.addColorStop(0.5, colors.accent);
          gradient.addColorStop(1, colors.secondary);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = opacity * 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(candidate.x, candidate.y);
          ctx.stroke();
        }
      });
    });

    // Draw nodes (batched)
    nodesRef.current.forEach(node => {
      const pulseSize = (3 + Math.sin(node.pulse) * 2) * (useDepth ? (0.5 + node.depth * 0.5) : 1);
      const pulseOpacity = 0.7 + Math.sin(node.pulse) * 0.3;
      // Glow
      ctx.globalAlpha = pulseOpacity * 0.3;
      const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 3);
      glowGradient.addColorStop(0, colors.primary);
      glowGradient.addColorStop(0.5, colors.secondary);
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2);
      ctx.fill();
      // Main
      ctx.globalAlpha = pulseOpacity;
      ctx.fillStyle = colors.primary;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
      ctx.fill();
      // Highlight
      ctx.globalAlpha = pulseOpacity * 0.8;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      const highlightOffset = useDepth ? node.depth * 2 : 1;
      ctx.beginPath();
      ctx.arc(
        node.x - pulseSize * highlightOffset * 0.3,
        node.y - pulseSize * highlightOffset * 0.3,
        pulseSize * 0.4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, mouse, connectionDistance, colors, isVisible, isReducedMotion, debug, enableTrails, enableDepth, initializeNodes, isMobile]);

  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Setup dengan ResizeObserver & cleanup
  useEffect(() => {
    // OPTIMIZED: Mobile detection
    const detectMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      return isTouchDevice || isSmallScreen || isLowEndDevice;
    };
    setIsMobile(detectMobile());

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);
    updateDimensions();
    initializeNodes();
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(updateDimensions, 100);
    });
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (canvasRef.current) resizeObserver.unobserve(canvasRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateDimensions, initializeNodes, handleMouseMove]);

  // Start animation
  useEffect(() => {
    if (isVisible && nodesRef.current.length > 0 && !isReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animate, isReducedMotion]);

  if (isReducedMotion) {
    return (
      <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-cyan-900/5" />
      </div>
    );
  }

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/5" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-cyan-900/5" />
    </motion.div>
  );
};

export default PlexusEffect;