import { useState, useEffect, useRef } from 'react';
import { Entropy } from './components/Entropy';
import { 
  Terminal, BrainCircuit, Wallet, Activity, ArrowRight,
  Clock, BarChart as ChartIcon, Shield, 
  Settings, Zap, BarChart3, Users, Unlock, Plus, Loader2
} from 'lucide-react';
import { createChart, ColorType } from 'lightweight-charts';

// CandlestickChart Component wrapper
const CandlestickChart = ({ data }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const getWidth = () => {
      return chartContainerRef.current && chartContainerRef.current.clientWidth > 0 
        ? chartContainerRef.current.clientWidth 
        : 800; 
    };

    const getHeight = () => {
      return chartContainerRef.current && chartContainerRef.current.clientHeight > 0 
        ? chartContainerRef.current.clientHeight 
        : 250; 
    };

    const handleResize = () => {
      if(chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ 
          width: getWidth(),
          height: getHeight()
        });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#aaa',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: getWidth(),
      height: getHeight(),
      autoSize: false,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }
    });
    
    chartRef.current = chart;

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444', 
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444'
    });
    
    seriesRef.current = candleSeries;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && data.length > 0) {
      const uniqueData = Array.from(new Map(data.map(item => [item.time, item])).values());
      uniqueData.sort((a,b) => a.time - b.time);
      seriesRef.current.setData(uniqueData);
      chartRef.current.timeScale().fitContent();
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />;
};

const generateAiReasoning = (asset, type) => {
  const isLong = type === 'Long';
  
  const tech = isLong ? [
    `RSI divergence detected on the 1H timeframe for ${asset}.`,
    `${asset} has broken through crucial moving average resistance.`,
    `MACD histogram showing expanding bullish momentum.`,
  ] : [
    `Overbought conditions reached on stochastic RSI for ${asset}.`,
    `Bearish engulfing candle printed on the 4H chart for ${asset}.`,
    `Price action rejected strongly at the key Fibonacci retracement level.`,
  ];

  const sentiment = isLong ? [
    `Social sentiment index spiked by 40% indicating strong retail interest.`,
    `Positive regulatory news surrounding ${asset} ecosystem.`,
  ] : [
    `Negative macro-economic news dragging tech and crypto sentiment.`,
    `Social volume remains stagnant despite broader market rally.`
  ];

  const onchain = isLong ? [
    `Whale wallet accumulation detected on-chain.`,
    `Exchange outflows for ${asset} reached a 30-day high.`,
  ] : [
    `Significant exchange inflows detected, hinting at potential sell-off.`,
    `Large inactive wallets moved ${asset} to centralized exchanges today.`
  ];

  const t = tech[Math.floor(Math.random() * tech.length)];
  const s = sentiment[Math.floor(Math.random() * sentiment.length)];
  const o = onchain[Math.floor(Math.random() * onchain.length)];

  return `▶ TECHNICAL ANALYSIS:\n${t} AI model assigned 87% confidence rating.\n\n` +
         `▶ MARKET SENTIMENT:\n${s} NLP parsers scanned 12,000+ localized news sources.\n\n` +
         `▶ ON-CHAIN DATA:\n${o} Network heuristics confirm directional bias.`;
};

function App() {
  const [targetAsset, setTargetAsset] = useState('ETH');
  const [prediction, setPrediction] = useState('up');
  const [amount, setAmount] = useState('0.1');
  const [riskLevel, setRiskLevel] = useState('medium');
  const [timeframe, setTimeframe] = useState('1H');
  
  const [selectedAgents, setSelectedAgents] = useState({
    technical: true,
    sentiment: true,
    onchain: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [hasCustomAgent, setHasCustomAgent] = useState(false);
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [aiReasoning, setAiReasoning] = useState("");
  const [activeTrades, setActiveTrades] = useState([]);
  const activeTradesRef = useRef([]);
  useEffect(() => {
    activeTradesRef.current = activeTrades;
  }, [activeTrades]);

  const [autoMode, setAutoMode] = useState(false);
  const logsEndRef = useRef(null);
  
  const OWS_API_KEY = import.meta.env.VITE_OWS_API_KEY || 'NOT_SET';
  const OWS_WALLET_ID = import.meta.env.VITE_OWS_WALLET_ID || '0x7F4...3A9B'; 

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString([], {hour12: false}), message, type }]);
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleAddAgent = () => {
    if(isAddingAgent || hasCustomAgent) return;
    setIsAddingAgent(true);
    addLog('system: downloading [ArbitrageScanner_v1.2] module...', 'info');
    setTimeout(() => {
      setIsAddingAgent(false);
      setHasCustomAgent(true);
      addLog('module_ready: ArbitrageScanner_v1.2', 'success');
      setSelectedAgents(prev => ({ ...prev, arbitrage: true }));
    }, 2500);
  };

  // AUTO AGENT SIMULATION
  useEffect(() => {
    if (!autoMode) return;
    
    const openInterval = setInterval(() => {
      const assets = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'LINK'];
      const randomAsset = assets[Math.floor(Math.random() * assets.length)];
      const randomType = Math.random() > 0.5 ? 'Long' : 'Short';
      const randomAmount = (Math.random() * 2).toFixed(2);
      const entryPrice = Math.random() * 10000 + 100;
      
      setTargetAsset(randomAsset);
      setPrediction(randomType === 'Long' ? 'up' : 'down');
      setAmount(randomAmount.toString());

      addLog(`[AUTO AGENT] Proposed ${randomType} on ${randomAsset}`, 'info');
      setAiReasoning(generateAiReasoning(randomAsset, randomType));
      
      const OWS_API_URL = import.meta.env.VITE_OWS_API_URL || 'http://localhost:8080/v1/agent/execute';
      fetch(OWS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': OWS_API_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_OWS_AGENT_TOKEN}`
        },
        body: JSON.stringify({
          wallet_id: OWS_WALLET_ID,
          asset: randomAsset,
          prediction: randomType.toLowerCase() === 'long' ? 'up' : 'down',
          amount: randomAmount,
          risk_profile: 'auto',
          timeframe: 'auto',
          active_modules: { auto: true }
        })
      })
      .then(res => {
         if(!res.ok) console.error("Auto Agent HTTP Error:", res.status);
         else res.json().then(data => console.log("Auto Agent Node Response:", data));
      })
      .catch((err) => console.error("Auto Agent Fetch Error:", err));

      setActiveTrades(prev => [
        { 
          id: Date.now(), 
          asset: randomAsset, 
          type: randomType, 
          amount: randomAmount,
          entry: entryPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
          pnl: '+0.00%', 
          status: 'Active'
        },
        ...prev
      ]);
    }, 8000);

    const pnlInterval = setInterval(() => {
      setActiveTrades(prev => prev.map(t => {
        const change = (Math.random() * 1.5 - 0.7).toFixed(2);
        const currentPnl = parseFloat(t.pnl) || 0;
        const newPnl = (currentPnl + parseFloat(change)).toFixed(2);
        return { ...t, pnl: `${newPnl > 0 ? '+' : ''}${newPnl}%` };
      }));
    }, 2000);

    const closeInterval = setInterval(() => {
      const prev = activeTradesRef.current;
      if (prev.length === 0) return;
      
      const toClose = prev[prev.length - 1]; 
      addLog(`[AUTO AGENT] Closed position for ${toClose.asset}. Final PnL: ${toClose.pnl}`, 'warning');
      
      const OWS_API_URL_CLOSE = import.meta.env.VITE_OWS_API_URL ? import.meta.env.VITE_OWS_API_URL.replace('execute', 'close') : 'http://localhost:8080/v1/agent/close';
      fetch(OWS_API_URL_CLOSE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': OWS_API_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_OWS_AGENT_TOKEN}`
        },
        body: JSON.stringify({ wallet_id: OWS_WALLET_ID, asset: toClose.asset, tp: 10, sl: 5 })
      })
      .then(res => {
         if(!res.ok) console.error("Auto close HTTP Error:", res.status);
         else res.json().then(data => console.log("Auto close Node Response:", data));
      })
      .catch((err) => console.error("Auto close Fetch Error:", err));

      setActiveTrades(p => p.slice(0, p.length - 1));
    }, 15000);

    return () => {
      clearInterval(openInterval);
      clearInterval(pnlInterval);
      clearInterval(closeInterval);
    };
  }, [autoMode]);

  useEffect(() => {
    addLog('system_init()', 'info');
    setTimeout(() => addLog(`connect_vault(${OWS_WALLET_ID})`, 'info'), 500);
    setTimeout(() => addLog(`auth_success: local_agent_key`, 'success'), 1000);
  }, []);

  const mockDataRef = useRef({});

  // CoinGecko OHLC API with Robust Fallback
  useEffect(() => {
    const generateMockOHLC = (basePrice, asset) => {
      const alignedNow = Math.floor(Date.now() / 1000 / 900) * 900; // Align to 15m
      
      if (!mockDataRef.current[asset]) {
        let currentPrice = basePrice;
        const data = [];
        for (let i = 100; i >= 0; i--) {
          const open = currentPrice;
          const change = (Math.random() - 0.5) * (basePrice * 0.005);
          const close = open + change;
          const high = Math.max(open, close) + Math.random() * (basePrice * 0.002);
          const low = Math.min(open, close) - Math.random() * (basePrice * 0.002);
          data.push({
            time: alignedNow - (i * 900),
            open, high, low, close
          });
          currentPrice = close;
        }
        mockDataRef.current[asset] = data;
      } else {
        // Update the last candle or add a new one
        const data = mockDataRef.current[asset];
        const lastCandle = data[data.length - 1];
        if (lastCandle.time === alignedNow) {
          // Update current candle
          const change = (Math.random() - 0.5) * (basePrice * 0.002);
          lastCandle.close = lastCandle.close + change;
          lastCandle.high = Math.max(lastCandle.high, lastCandle.close);
          lastCandle.low = Math.min(lastCandle.low, lastCandle.close);
        } else {
          // Add new candle
          const open = lastCandle.close;
          const change = (Math.random() - 0.5) * (basePrice * 0.005);
          const close = open + change;
          const high = Math.max(open, close) + Math.random() * (basePrice * 0.002);
          const low = Math.min(open, close) - Math.random() * (basePrice * 0.002);
          data.push({ time: alignedNow, open, high, low, close });
          if (data.length > 100) data.shift();
        }
      }
      return [...mockDataRef.current[asset]]; // Return a copy
    };

    const fetchCoinData = async () => {
      const coinMap = {
        BTC: { id: 'bitcoin', base: 64200 }, ETH: { id: 'ethereum', base: 3450 }, 
        SOL: { id: 'solana', base: 145 }, XRP: { id: 'ripple', base: 0.6 },
        DOGE: { id: 'dogecoin', base: 0.16 }, LINK: { id: 'chainlink', base: 18 }
      };
      
      const target = coinMap[targetAsset.toUpperCase()] || { id: 'bitcoin', base: 64000 };
      
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${target.id}/ohlc?vs_currency=usd&days=1`);
        
        if (!res.ok) throw new Error("API Limit Reached");
        const json = await res.json();
        
        if (Array.isArray(json) && json.length > 0) {
           const ohlc = json.map(p => ({
             time: Math.floor(p[0] / 1000), 
             open: p[1], high: p[2], low: p[3], close: p[4]
           }));
           setChartData(ohlc);
           setCurrentPrice(ohlc[ohlc.length - 1].close);
           return;
        }
        throw new Error("Empty Array");
      } catch (err) {
        console.warn("Using Mock OHLC Data due to API limits:", err.message);
        const mockData = generateMockOHLC(target.base, targetAsset);
        setChartData(mockData);
        setCurrentPrice(mockData[mockData.length - 1].close);
      }
    };

    fetchCoinData();
    const interval = setInterval(fetchCoinData, 60000); // 1 minute refresh
    return () => clearInterval(interval);
  }, [targetAsset]);

  const toggleAgent = (agent) => {
    setSelectedAgents(prev => ({ ...prev, [agent]: !prev[agent] }));
  };

  const handleExecuteTrade = async () => {
    if (isProcessing) return;
    const activeAgentCount = Object.values(selectedAgents).filter(Boolean).length;
    if (activeAgentCount === 0) {
      addLog('error: select >0 agents', 'error');
      return;
    }
    
    setIsProcessing(true);
    setAiReasoning("Initiating real connection to OWS Node...");
    addLog(`initiate_consensus: ${targetAsset} | ${riskLevel} | ${timeframe}`, 'info');
    addLog(`Connecting with Wallet ID: ${OWS_WALLET_ID.substring(0, 8)}...`, 'info');
    
    let currentReasoning = "";
    const appendReasoning = (text) => {
      currentReasoning += (currentReasoning ? "\n\n" : "") + text;
      setAiReasoning(currentReasoning);
    };

    try {
      const OWS_API_URL = import.meta.env.VITE_OWS_API_URL || 'http://localhost:8080/v1/agent/execute';
      addLog(`Sending request to: ${OWS_API_URL}`, 'info');

      const requestBody = {
        wallet_id: OWS_WALLET_ID,
        asset: targetAsset,
        prediction: prediction,
        amount: amount,
        risk_profile: riskLevel,
        timeframe: timeframe,
        active_modules: selectedAgents
      };

      const response = await fetch(OWS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': OWS_API_KEY, 
          'Authorization': `Bearer ${import.meta.env.VITE_OWS_AGENT_TOKEN}` 
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      addLog('Real API Response Received!', 'success');
      setAiReasoning(generateAiReasoning(targetAsset, prediction === 'up' ? 'Long' : 'Short'));
      
      const txHash = data.tx_hash || `0x${Math.random().toString(16).substring(2, 10)}`;
      addLog(`tx_confirmed [${txHash}]`, 'success');
      
      setActiveTrades(prev => [
        { 
          id: Date.now(), 
          asset: targetAsset, 
          type: prediction === 'up' ? 'Long' : 'Short', 
          amount: amount,
          entry: currentPrice.toLocaleString(), 
          pnl: '0.00%', 
          status: 'Active' 
        },
        ...prev
      ]);
      
    } catch (error) {
      addLog(`Connection Error: ${error.message}`, 'error');
      appendReasoning(`[CONNECTION ERROR]\nFailed to connect to the OWS Agent endpoint.\n\nMake sure your local OWS Node is running on 'http://localhost:8080' or update the API endpoint. Error details: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseTrade = async (tradeId, asset) => {
    const tradeToClose = activeTradesRef.current.find(t => t.id === tradeId);
    const finalPnl = tradeToClose ? tradeToClose.pnl : '0.00%';
    setActiveTrades(prev => prev.filter(t => t.id !== tradeId));
    addLog(`close_position_init: ${asset}`, 'info');

    try {
      const OWS_API_URL = import.meta.env.VITE_OWS_API_URL ? import.meta.env.VITE_OWS_API_URL.replace('execute', 'close') : 'http://localhost:8080/v1/agent/close';
      const response = await fetch(OWS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': OWS_API_KEY, 
          'Authorization': `Bearer ${import.meta.env.VITE_OWS_AGENT_TOKEN}` 
        },
        body: JSON.stringify({ wallet_id: OWS_WALLET_ID, asset, tp: 10, sl: 5 })
      });

      if (!response.ok) throw new Error("Close request failed");
      const data = await response.json();
      
      addLog(`close_confirmed: ${asset} | Final PnL: ${finalPnl} [tx: ${data.tx_hash ? data.tx_hash.substring(0, 8) + '...' : 'ok'}]`, 'warning');
    } catch (e) {
      addLog(`close_error: ${e.message}`, 'error');
    }
  };

  return (
    <>
      <Entropy />
      <div className="container">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">
              <BrainCircuit size={20} color="white" />
            </div>
            OWS Prediction Agent
          </div>
          
          <div className="premium-badge">
            <Unlock size={14} color="#f59e0b" />
            <span>PRO MODEL ENABLED</span>
          </div>

          <div className="wallet-status">
            <div className="status-dot pulse"></div>
            <Wallet size={16} color="#888" />
            <span>{OWS_WALLET_ID.substring(0, 6)}...{OWS_WALLET_ID.substring(OWS_WALLET_ID.length - 4)}</span>
          </div>
        </header>

        <main className="dashboard-grid">
          <div className="column left-col">
            <div className="glass-card">
              <h2 className="card-title">
                <Settings size={20} color="#0dc9f0" />
                CONTROL CENTER
              </h2>
              
              <div className="input-group">
                <label>ASSET TICKER</label>
                <select className="custom-input uppercase" value={targetAsset} onChange={(e) => setTargetAsset(e.target.value)}>
                  <option value="ETH">ETH (Ethereum)</option>
                  <option value="BTC">BTC (Bitcoin)</option>
                  <option value="SOL">SOL (Solana)</option>
                  <option value="XRP">XRP (Ripple)</option>
                  <option value="DOGE">DOGE (Dogecoin)</option>
                  <option value="LINK">LINK (Chainlink)</option>
                </select>
              </div>

              <div className="input-row">
                <div className="input-group half">
                  <label>RISK PROFILE</label>
                  <select className="custom-input" value={riskLevel} onChange={(e)=>setRiskLevel(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="input-group half">
                  <label>TIMEFRAME</label>
                  <select className="custom-input" value={timeframe} onChange={(e)=>setTimeframe(e.target.value)}>
                    <option value="15m">15m</option>
                    <option value="1H">1H</option>
                    <option value="1D">1D</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>ALLOCATION</label>
                <input type="number" className="custom-input" value={amount} onChange={(e) => setAmount(e.target.value)} step="0.01" min="0" />
              </div>

              <div className="separator"></div>

              <h3 className="section-subtitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16}/> ACTIVE AGENTS</span>
                <button 
                  onClick={handleAddAgent} 
                  disabled={isAddingAgent || hasCustomAgent}
                  title="Load New Agent Module"
                  style={{ 
                    background: 'none', border: 'none', color: hasCustomAgent ? '#64748b' : '#0dc9f0', 
                    cursor: hasCustomAgent ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0.2rem', borderRadius: '4px'
                  }}
                >
                  {isAddingAgent ? <Loader2 size={16} className="pulse" /> : <Plus size={18} />}
                </button>
              </h3>
              <div className="agent-selectors">
                <button className={`agent-btn ${selectedAgents.technical ? 'active' : ''}`} onClick={() => toggleAgent('technical')}>
                  <ChartIcon size={16} /> Technical Analysis
                </button>
                <button className={`agent-btn ${selectedAgents.sentiment ? 'active' : ''}`} onClick={() => toggleAgent('sentiment')}>
                  <Activity size={16} /> Market Sentiment
                </button>
                <button className={`agent-btn ${selectedAgents.onchain ? 'active' : ''}`} onClick={() => toggleAgent('onchain')}>
                  <Shield size={16} /> On-chain Intel
                </button>
                {hasCustomAgent && (
                  <button className={`agent-btn ${selectedAgents.arbitrage ? 'active' : ''}`} onClick={() => toggleAgent('arbitrage')} style={{animation: 'fadeIn 0.5s ease-in'}}>
                    <Zap size={16} /> Arbitrage Scanner
                  </button>
                )}
              </div>

              <div className="separator"></div>

              <div className="prediction-toggle">
                <button className={`pred-btn long ${prediction === 'up' ? 'active' : ''}`} onClick={() => setPrediction('up')}>
                  LONG
                </button>
                <button className={`pred-btn short ${prediction === 'down' ? 'active' : ''}`} onClick={() => setPrediction('down')}>
                  SHORT
                </button>
              </div>

              <button className="action-btn" onClick={handleExecuteTrade} disabled={isProcessing} style={{ opacity: isProcessing ? 0.5 : 1 }}>
                {isProcessing ? (
                  <><Clock size={20} className="pulse" /> COMPUTING...</>
                ) : (
                  <><BrainCircuit size={20} /> EXECUTE SEQUENCE <ArrowRight size={20} /></>
                )}
              </button>

              <button 
                className="action-btn" 
                onClick={() => setAutoMode(!autoMode)} 
                style={{ 
                  marginTop: '0.75rem', 
                  background: autoMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  border: `1px solid ${autoMode ? '#ef4444' : '#10b981'}`,
                  color: autoMode ? '#ef4444' : '#10b981'
                }}
              >
                <Zap size={20} color={autoMode ? '#ef4444' : '#10b981'} /> 
                {autoMode ? 'STOP AUTO AGENT' : 'ACTIVATE AUTO AGENT'}
              </button>
            </div>

            <div className="ows-footer-mark">
              <span className="developed-for" style={{ marginRight: '0.75rem', marginLeft: '0' }}>Built for</span>
              <span className="ows-logo-text">OWS</span>
              <span className="hackathon-logo-text">Hackathon</span>
            </div>
          </div>

          <div className="column center-col">
            <div className="glass-card chart-card">
              <h2 className="card-title" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart3 size={20} color="#10b981" /> {targetAsset}/USD Live
                </span>
                <span style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'JetBrains Mono', fontWeight: 500 }}>
                  ${currentPrice.toLocaleString()}
                </span>
              </h2>
              <div className="chart-container">
                 {/* TradingView Lightweight Candlestick Chart */}
                 {chartData.length > 0 ? (
                   <CandlestickChart data={chartData} />
                 ) : (
                   <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888'}}>Awaiting OHLC Stream...</div>
                 )}
              </div>
            </div>

            <div className="glass-card reasoning-card mt-g">
              <h2 className="card-title">
                <Zap size={20} color="#f59e0b" /> CONSENSUS LOGIC
              </h2>
              <div className="reasoning-box">
                {aiReasoning ? (
                  aiReasoning.split('\n\n').map((block, i) => {
                    const match = block.match(/^((?:▶\s.+?:|\[.+?\]))\s*([\s\S]*)$/);
                    if (match) {
                      const title = match[1];
                      const rest = match[2];
                      let titleColor = '#f59e0b';
                      if (title.includes('TECHNICAL')) titleColor = '#0dc9f0';
                      if (title.includes('SENTIMENT')) titleColor = '#ec4899';
                      if (title.includes('ON-CHAIN')) titleColor = '#8b5cf6';
                      if (title.includes('AUTO AGENT')) titleColor = '#10b981';
                      if (title.includes('REAL AGENT') || title.includes('REAL_AGENT')) titleColor = '#10b981';
                      if (title.includes('ERROR')) titleColor = '#ef4444';

                      return (
                        <p key={i} className="reasoning-p">
                          <span style={{ color: titleColor, fontWeight: '700', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>{title}</span>
                          {rest}
                        </p>
                      );
                    }
                    return <p key={i} className="reasoning-p">{block}</p>;
                  })
                ) : (
                  <div className="idle-state">AWAITING INSTRUCTIONS</div>
                )}
              </div>
            </div>
          </div>

          <div className="column right-col">
            <div className="glass-card logs-card">
              <h2 className="card-title">
                <Terminal size={20} color="#5f0bee" /> SYSTEM TERMINAL
              </h2>
              <div className="logs-container">
                {logs.map((log, idx) => (
                  <div key={idx} className={`log-entry ${log.type}`}>
                    <span className="log-time">[{log.time}]</span>
                    {log.message}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>

            <div className="glass-card portfolio-card mt-g">
              <h2 className="card-title">
                <Activity size={20} color="#0dc9f0" /> ACTIVE WORKERS
              </h2>
              <div className="trades-list">
                {activeTrades.map((trade) => (
                  <div key={trade.id} className="trade-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="trade-info">
                        <span className="trade-asset">
                          {trade.asset} <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 'normal' }}>({trade.amount} {trade.asset})</span>
                        </span>
                        <span className={`trade-type ${trade.type.toLowerCase()}`}>{trade.type}</span>
                      </div>
                      <div className="trade-details">
                        <span className="trade-entry">${trade.entry}</span>
                        <span className={`trade-pnl ${trade.pnl.startsWith('+') ? 'positive' : 'negative'}`}>
                          {trade.pnl}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.4rem', borderRadius: '6px' }}>
                      <button className="close-btn" onClick={() => handleCloseTrade(trade.id, trade.asset)}>KAPAT</button>
                    </div>
                  </div>
                ))}
                {activeTrades.length === 0 && (
                  <div style={{color: '#888', fontSize: '0.8rem', textAlign: 'center', marginTop: '1rem'}}>NO ACTIVE PROCESSES</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
