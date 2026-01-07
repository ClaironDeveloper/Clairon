import { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error) { return { hasError: true }; }
  componentDidCatch(error: Error) { console.log('Canvas error:', error.message); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}
import {
  ArrowRight,
  Zap,
  Globe,
  ArrowRightLeft,
  TrendingUp,
  Target,
  Cpu,
  Layers,
  Radio,
  ChevronRight,
  ExternalLink,
  Wallet,
  Activity,
  Circle,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'wouter';

interface YieldOpportunity {
  id: string;
  sourceChain: string;
  targetMarket: string;
  bet: string;
  buyPrice: number;
  sellPrice: number;
  spread: number;
  volume: string;
  timeLeft: string;
  confidence: number;
  risk: 'low' | 'medium' | 'high';
}

interface BridgeFlow {
  id: string;
  from: string;
  to: string;
  amount: string;
  status: 'active' | 'pending' | 'completed';
  latency: number;
}

const chains = [
  { name: 'Ethereum', color: '#ff9955', abbr: 'ETH' },
  { name: 'Polygon', color: '#b3502c', abbr: 'MATIC' },
  { name: 'Arbitrum', color: '#ffb45e', abbr: 'ARB' },
  { name: 'Optimism', color: '#ff6b35', abbr: 'OP' },
  { name: 'Base', color: '#c9a47a', abbr: 'BASE' },
  { name: 'Avalanche', color: '#8b4513', abbr: 'AVAX' },
];

function generateOpportunities(): YieldOpportunity[] {
  const bets = [
    'BTC > $120k Q2 2025',
    'ETH staking yields > 8%',
    'SOL flips BNB mcap',
    'Fed rate cut March',
    'SpaceX Mars mission',
    'AI regulation passed',
    'Gold hits $3200',
    'DeFi TVL > $300B',
  ];
  
  return Array.from({ length: 12 }, (_, i) => {
    const buyPrice = Math.random() * 0.4 + 0.3;
    const sellPrice = buyPrice + Math.random() * 0.15 + 0.05;
    return {
      id: `opp-${i}`,
      sourceChain: chains[i % chains.length].name,
      targetMarket: 'CLAIRON',
      bet: bets[i % bets.length],
      buyPrice,
      sellPrice,
      spread: ((sellPrice - buyPrice) / buyPrice) * 100,
      volume: `$${(Math.random() * 500 + 50).toFixed(0)}K`,
      timeLeft: `${Math.floor(Math.random() * 48 + 1)}h`,
      confidence: Math.random() * 30 + 70,
      risk: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
    };
  }).sort((a, b) => b.spread - a.spread);
}

function generateBridgeFlows(): BridgeFlow[] {
  return chains.map((chain, i) => ({
    id: `flow-${i}`,
    from: chain.name,
    to: 'CLAIRON',
    amount: `$${(Math.random() * 10 + 1).toFixed(1)}M`,
    status: (['active', 'pending', 'completed'] as const)[i % 3],
    latency: Math.floor(Math.random() * 300 + 50),
  }));
}

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.003;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#ff9955"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        <Sphere ref={glowRef} args={[1.3, 32, 32]}>
          <meshBasicMaterial color="#ff6b35" transparent opacity={0.1} />
        </Sphere>
      </Float>
      <OrbitParticles />
    </group>
  );
}

function OrbitParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 2 + Math.random() * 1.5;
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    
    const color = new THREE.Color(Math.random() > 0.5 ? '#ff9955' : '#ff6b35');
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  );
}

function FlowingOrbit({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <Trail width={0.5} length={8} color={color} attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

function AnimatedNumber({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(value);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplay((prev) => {
        const diff = value - prev;
        if (Math.abs(diff) < 0.01) return value;
        return prev + diff * 0.1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{display.toFixed(decimals)}</span>;
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function PulsingDot({ color, size = 'sm' }: { color: string; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';
  return (
    <span className="relative flex">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ backgroundColor: color }} />
      <span className={`relative inline-flex rounded-full ${sizeClass}`} style={{ backgroundColor: color }} />
    </span>
  );
}

function ConvergenceCard({ opp, index }: { opp: YieldOpportunity; index: number }) {
  const chain = chains.find(c => c.name === opp.sourceChain);
  const riskColors = {
    low: '#ff9955',
    medium: '#c9a47a',
    high: '#b3502c',
  };
  
  return (
    <div 
      className="group relative p-4 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 hover:bg-white/[0.03]"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'fadeSlideIn 0.6s ease-out forwards',
        opacity: 0,
      }}
      data-testid={`card-opportunity-${opp.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: chain?.color, color: '#000' }}
            >
              {chain?.abbr.slice(0, 2)}
            </div>
            <ArrowRight className="w-3 h-3 text-white/40" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ff9955] to-[#ff6b35] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">SHN</span>
            </div>
            <Badge variant="outline" className="ml-auto text-[10px] border-0 bg-white/[0.05]" style={{ color: riskColors[opp.risk] }}>
              {opp.risk}
            </Badge>
          </div>
          <p className="text-white/90 text-sm font-medium truncate mb-3" data-testid={`text-bet-${opp.id}`}>{opp.bet}</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-white/40 block">Buy</span>
              <span className="text-white font-mono" data-testid={`text-buy-price-${opp.id}`}>${opp.buyPrice.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-white/40 block">Sell</span>
              <span className="text-[#ff6b35] font-mono" data-testid={`text-sell-price-${opp.id}`}>${opp.sellPrice.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-white/40 block">Spread</span>
              <span className="text-[#ff9955] font-mono font-bold" data-testid={`text-spread-${opp.id}`}>+{opp.spread.toFixed(1)}%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-white/40 text-xs">{opp.timeLeft} left</span>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-[#ff9955] to-[#ff6b35] text-white border-0 text-xs px-3 opacity-0 group-hover:opacity-100 transition-opacity"
            data-testid={`button-execute-${opp.id}`}
          >
            Execute
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff9955] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function BridgeFlowItem({ flow, index }: { flow: BridgeFlow; index: number }) {
  const chain = chains.find(c => c.name === flow.from);
  const statusColors = {
    active: '#ff9955',
    pending: '#c9a47a',
    completed: '#b3502c',
  };
  
  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
      style={{ 
        animationDelay: `${index * 80}ms`,
        animation: 'fadeSlideIn 0.5s ease-out forwards',
        opacity: 0,
      }}
      data-testid={`flow-bridge-${flow.id}`}
    >
      <PulsingDot color={statusColors[flow.status]} />
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
        style={{ backgroundColor: `${chain?.color}20`, color: chain?.color }}
      >
        {chain?.abbr.slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-xs" data-testid={`text-bridge-from-${flow.id}`}>{flow.from}</span>
          <ArrowRight className="w-3 h-3 text-[#ff6b35]" />
          <span className="text-white text-xs font-medium">CLAIRON</span>
        </div>
        <span className="text-[#ff9955] text-sm font-bold" data-testid={`text-bridge-amount-${flow.id}`}>{flow.amount}</span>
      </div>
      <div className="text-right">
        <span className="text-white/40 text-[10px] block" data-testid={`text-bridge-latency-${flow.id}`}>{flow.latency}ms</span>
        <Badge variant="outline" className="text-[10px] border-0 bg-white/[0.05]" style={{ color: statusColors[flow.status] }} data-testid={`badge-bridge-status-${flow.id}`}>
          {flow.status}
        </Badge>
      </div>
    </div>
  );
}

function StatOrb({ value, label, color, icon: Icon, testId }: { value: string; label: string; color: string; icon: any; testId?: string }) {
  return (
    <div className="relative group" data-testid={testId}>
      <div 
        className="absolute inset-0 rounded-full opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />
      <div className="relative flex flex-col items-center justify-center w-28 h-28 rounded-full border border-white/[0.1] bg-black/40 backdrop-blur-sm">
        <Icon className="w-5 h-5 mb-1" style={{ color }} />
        <span className="text-white text-xl font-bold" data-testid={testId ? `${testId}-value` : undefined}>{value}</span>
        <span className="text-white/50 text-[10px] uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [opportunities] = useState(generateOpportunities);
  const [bridgeFlows] = useState(generateBridgeFlows);
  const [totalVolume, setTotalVolume] = useState(847.3);
  const [activeConvergences, setActiveConvergences] = useState(156);
  const [avgSpread, setAvgSpread] = useState(12.4);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalVolume(prev => prev + (Math.random() - 0.3) * 2);
      setActiveConvergences(prev => Math.max(100, prev + Math.floor(Math.random() * 5 - 2)));
      setAvgSpread(prev => Math.max(5, prev + (Math.random() - 0.5) * 0.5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 153, 85, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 107, 53, 0.4); }
        }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#ff9955]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ff6b35]/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#ff9955]/5 to-transparent rounded-full" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white/60" data-testid="button-back-home">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff9955] to-[#ff6b35] flex items-center justify-center pulse-glow">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight" data-testid="text-brand">CLAIRON</h1>
              <p className="text-white/40 text-xs font-mono">Cross-Ledger Yield Convergence</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <PulsingDot color="#ff6b35" />
            <span className="text-white/60 text-sm">CLAIRON Network</span>
            <span className="text-[#ff6b35] text-sm font-mono">412ms</span>
          </div>
          <Button variant="outline" className="gap-2 border-white/[0.1] bg-white/[0.02]" data-testid="button-connect-wallet">
            <Wallet className="w-4 h-4" />
            Connect
          </Button>
        </div>
      </header>

      <main className="relative z-10 flex h-[calc(100vh-73px)]">
        <div className="w-[280px] border-r border-white/[0.05] p-4 flex flex-col gap-4">
          <GlassCard className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-4 h-4 text-[#ff9955]" />
              <span className="text-white/80 text-sm font-medium" data-testid="heading-live-bridges">Live Bridges</span>
            </div>
            <ScrollArea className="h-[300px] pr-2">
              <div className="space-y-2">
                {bridgeFlows.map((flow, i) => (
                  <BridgeFlowItem key={flow.id} flow={flow} index={i} />
                ))}
              </div>
            </ScrollArea>
          </GlassCard>
          
          <GlassCard className="p-4 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-white/80 text-sm font-medium" data-testid="heading-network-stats">Network Stats</span>
            </div>
            <div className="space-y-4">
              {chains.slice(0, 5).map((chain, i) => (
                <div key={chain.name} className="flex items-center gap-3" data-testid={`row-network-${chain.abbr}`}>
                  <div 
                    className="w-2 h-8 rounded-full"
                    style={{ backgroundColor: chain.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60" data-testid={`text-chain-name-${chain.abbr}`}>{chain.name}</span>
                      <span className="text-white/80 font-mono" data-testid={`text-chain-percent-${chain.abbr}`}>{(Math.random() * 50 + 20).toFixed(1)}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${Math.random() * 50 + 30}%`,
                          backgroundColor: chain.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-[45%] relative border-b border-white/[0.05]">
            <CanvasErrorBoundary
              fallback={
                <div className="w-full h-full bg-gradient-to-br from-[#ff9955]/20 via-black to-[#ff6b35]/20 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ff9955] to-[#ff6b35] animate-pulse flex items-center justify-center">
                    <Layers className="w-12 h-12 text-white" />
                  </div>
                </div>
              }
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ff9955" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b35" />
                <CoreOrb />
                <FlowingOrbit radius={2.5} speed={0.8} color="#ff9955" />
                <FlowingOrbit radius={3} speed={-0.6} color="#ff6b35" />
                <FlowingOrbit radius={3.5} speed={0.4} color="#ffb45e" />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </CanvasErrorBoundary>
            
            <div className="absolute top-6 left-6">
              <h2 className="text-2xl font-bold mb-1" data-testid="heading-reactor">Convergence Reactor</h2>
              <p className="text-white/50 text-sm" data-testid="text-reactor-subtitle">Inter-chain synthetic yield extraction</p>
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8">
              <StatOrb value={`$${totalVolume.toFixed(0)}M`} label="Volume 24h" color="#ff9955" icon={TrendingUp} testId="stat-volume" />
              <StatOrb value={activeConvergences.toString()} label="Active Vectors" color="#ff6b35" icon={Target} testId="stat-active-vectors" />
              <StatOrb value={`${avgSpread.toFixed(1)}%`} label="Avg Spread" color="#c9a47a" icon={Zap} testId="stat-avg-spread" />
            </div>
          </div>

          <div className="flex-1 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#ff9955]" />
                <h3 className="text-lg font-semibold" data-testid="heading-opportunities">Live Opportunities</h3>
                <Badge variant="outline" className="bg-[#ff6b35]/10 border-[#ff6b35]/20 text-[#ff6b35] text-xs" data-testid="badge-opportunities-count">
                  {opportunities.length} found
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-white/60 gap-2" data-testid="button-view-all">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100%-50px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pr-4">
                {opportunities.slice(0, 8).map((opp, i) => (
                  <ConvergenceCard key={opp.id} opp={opp} index={i} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="w-[320px] border-l border-white/[0.05] p-4 flex flex-col gap-4">
          <GlassCard className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-[#c9a47a]" />
              <span className="text-white/80 text-sm font-medium" data-testid="heading-execution-queue">Execution Queue</span>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]" data-testid={`row-queue-${i}`}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff9955]/20 to-[#ff6b35]/20 flex items-center justify-center">
                    <ArrowRightLeft className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white/80 text-sm block truncate" data-testid={`text-queue-title-${i}`}>ETH → SHN Bridge</span>
                    <span className="text-white/40 text-xs" data-testid={`text-queue-status-${i}`}>Processing...</span>
                  </div>
                  <div className="w-12 h-1 rounded-full bg-white/[0.1] overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#ff9955] to-[#ff6b35]"
                      style={{ width: `${(i + 1) * 30}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-white/80 text-sm font-medium" data-testid="heading-top-performers">Top Performers</span>
            </div>
            <div className="space-y-3">
              {opportunities.slice(0, 5).map((opp, i) => (
                <div key={opp.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors" data-testid={`row-performer-${i}`}>
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ 
                      backgroundColor: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : 'transparent',
                      color: i < 3 ? '#000' : '#fff',
                      border: i >= 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white/80 text-sm block truncate" data-testid={`text-performer-bet-${i}`}>{opp.bet}</span>
                    <span className="text-white/40 text-xs" data-testid={`text-performer-chain-${i}`}>{opp.sourceChain}</span>
                  </div>
                  <span className="text-[#ff6b35] font-mono text-sm font-bold" data-testid={`text-performer-spread-${i}`}>
                    +{opp.spread.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/60 text-sm">Quick Actions</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                className="bg-gradient-to-r from-[#ff9955] to-[#ff6b35] text-white border-0 text-sm"
                data-testid="button-auto-execute"
              >
                <Zap className="w-4 h-4 mr-1" />
                Auto Execute
              </Button>
              <Button 
                variant="outline" 
                className="border-white/[0.1] text-white/80 text-sm"
                data-testid="button-scan-markets"
              >
                <Globe className="w-4 h-4 mr-1" />
                Scan Markets
              </Button>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
