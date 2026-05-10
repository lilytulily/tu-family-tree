'use client';

import { useEffect, useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function FamilyTreeSection() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoading, setIsLoading] = useState(false); // 預設先不載入

  // 🔒 密碼鎖專用狀態
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 🔑 在這裡設定妳的專屬密碼 (可以改成妳想要的數字或文字)
  const CORRECT_PASSWORD = '0805'; 

  // 處理解鎖邏輯
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault(); // 防止表單重新整理頁面
    if (passwordInput === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('密碼錯誤，請重新確認！');
      setPasswordInput(''); // 清空輸入框
    }
  };

  useEffect(() => {
    // 🛡️ 只有在「已解鎖」的狀態下，才允許去跟資料庫要資料！
    if (!isUnlocked) return;

    setIsLoading(true);

    fetch('/api')
      .then((res) => res.json())
      .then((responseData) => {
        const dataArray = Array.isArray(responseData) ? responseData : (responseData.data || []);
        
        const newNodes: any[] = [];
        const newEdges: any[] = [];
        const generationCounts: Record<number, number> = {};
        const addedNodeIds = new Set();
        const addedEdgeIds = new Set();

        dataArray.forEach((item: any) => {
          const person = item.person || item;
          const personId = String(person.id || person.編號);
          if (!personId) return;

          // 1. 建立節點
          if (!addedNodeIds.has(personId)) {
            addedNodeIds.add(personId);

            let gen = person.gen || person.代數 || 1;
            if (typeof gen === 'object') gen = gen.low || 1;
            gen = Number(gen);

            if (!generationCounts[gen]) generationCounts[gen] = 0;
            const xPos = generationCounts[gen] * 300;
            const yPos = (gen - 1) * 220; 
            generationCounts[gen]++;

            newNodes.push({
              id: personId,
              position: { x: xPos, y: yPos },
              data: { 
                label: (
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-amber-800/60 font-bold tracking-tighter">GEN {gen}</span>
                    <span className="text-lg font-bold text-stone-800">{person.name || person.名字}</span>
                  </div>
                ) 
              },
              className: 'bg-[#f4ebd0] border-2 border-[#B7791F] shadow-lg rounded-md p-4 w-52 text-center hover:scale-105 transition-transform cursor-pointer',
            });
          }

          // 2. 建立關係線
          if (item.targetId) {
            const targetId = String(item.targetId);
            const relType = item.relType;
            const edgeId = `e-${personId}-${targetId}-${relType}`;

            if (!addedEdgeIds.has(edgeId)) {
              addedEdgeIds.add(edgeId);

              const isMarriage = relType === 'MARRIED_TO';

              newEdges.push({
                id: edgeId,
                source: personId,
                target: targetId,
                animated: !isMarriage,
                label: isMarriage ? '配偶' : '',
                labelStyle: { fill: '#B7791F', fontSize: 10, fontWeight: 'bold' },
                style: { 
                  stroke: '#B7791F', 
                  strokeWidth: isMarriage ? 2 : 3,
                  strokeDasharray: isMarriage ? '5 5' : '0',
                  opacity: isMarriage ? 0.6 : 1,
                },
                type: isMarriage ? 'step' : 'default', 
                markerEnd: !isMarriage ? {
                  type: MarkerType.ArrowClosed,
                  color: '#B7791F',
                } : undefined,
              });
            }
          }
        });

        newNodes.forEach((node) => {
          const matched = dataArray.find((i: any) => String((i.person || i).id || (i.person || i).編號) === node.id);
          const p = matched.person || matched;
          let g = p.gen || p.代數 || 1;
          if (typeof g === 'object') g = g.low || 1;
          node.position.x -= (generationCounts[Number(g)] * 300) / 2;
        });

        setNodes(newNodes);
        setEdges(newEdges);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("抓取失敗:", err);
        setIsLoading(false);
      });
  }, [isUnlocked, setNodes, setEdges]); // 增加 isUnlocked 作為依賴

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center">
      <div className="text-center mb-12 z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4 tracking-widest text-shadow-sm">杜氏家族脈絡圖</h2>
        <p className="text-stone-600 font-serif">實線代表血緣承襲，虛線代表姻親連理。</p>
      </div>

      <div className="w-full max-w-6xl h-[750px] bg-[#E8DAB2]/20 border-4 border-double border-[#B7791F]/40 rounded-2xl overflow-hidden shadow-2xl z-10">
        
        {/* 🔒 第一層：密碼鎖畫面 */}
        {!isUnlocked ? (
          <div className="flex h-full w-full items-center justify-center flex-col bg-[#fdfbf7] relative">
            {/* 裝飾用的背景圓圈 */}
            <div className="absolute w-64 h-64 border-2 border-dashed border-[#B7791F]/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
            
            <div className="z-10 flex flex-col items-center bg-[#f4ebd0] p-8 rounded-xl border-2 border-[#B7791F] shadow-xl">
              <span className="text-4xl mb-4">🗝️</span>
              <h3 className="text-2xl font-bold text-stone-800 mb-2 tracking-widest">杜氏伯英分支家族樹</h3>
              <p className="text-stone-600 mb-6 text-sm">為保護家族成員隱私，請輸入存取密碼</p>
              
              <form onSubmit={handleUnlock} className="flex flex-col items-center w-full">
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="請輸入密碼..."
                  className="w-full text-center px-4 py-2 border border-[#B7791F]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B7791F] bg-white/70 mb-4 tracking-widest"
                />
                {errorMsg && <p className="text-red-500 text-sm mb-4 animate-pulse">{errorMsg}</p>}
                
                <button 
                  type="submit"
                  className="w-full bg-[#B7791F] text-white font-bold py-2 px-4 rounded-md hover:bg-[#9c661a] transition-colors tracking-widest"
                >
                  解開家族樹
                </button>
              </form>
            </div>
          </div>

        // ⏳ 第二層：載入中畫面
        ) : isLoading ? (
          <div className="flex h-full w-full items-center justify-center flex-col bg-[#fdfbf7]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#B7791F] mb-4"></div>
            <p className="text-[#B7791F] font-bold animate-pulse">📜 正在翻閱杜家古籍...</p>
          </div>

        // 🌳 第三層：正式顯示家族樹
        ) : (
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView 
            fitViewOptions={{ padding: 0.4 }}
          >
            <Background variant={BackgroundVariant.Lines} gap={20} size={1} color="#B7791F22" />
            <Controls className="bg-[#f4ebd0] border-2 border-[#B7791F] rounded-md shadow-md" />
            <MiniMap nodeColor="#B7791F" maskColor="#E8DAB244" className="border-2 border-[#B7791F] rounded-md" />
          </ReactFlow>
        )}
      </div>
    </section>
  );
}