import '../src/tcss/style.css'; 
import HistorySection from '../src/components/HistorySection';
import FamilyTree from '../src/components/FamilyTree';


export default function Home() {
  return (
    // 🗺️ 1. 外層大底板：保留全域的泛黃藍圖背景和焦邊效果
    <main className="relative w-full bg-vintage-blueprint burnt-edges overflow-hidden">
      
      {/* 🎬 2. 第一區塊：霸氣滿版的 Hero Section */}
      {/* min-h-screen 強制這個區塊一定要佔滿一整個螢幕的高度！ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 z-10">
        
        {/* 文字內容區 */}
        {/* mt-[-10vh] 是一個視覺小技巧：把文字稍微往上提一點，視覺重心會更好看 */}
        <div className="text-center flex flex-col items-center gap-6 mt-[-10vh]">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider drop-shadow-md">
            <span className="text-[#3E2723]">杜氏柏英分支</span>
            <span className="text-[#B7791F]">家族數位典藏</span>
          </h1>
          
          <h2 className="text-lg sm:text-2xl text-[#5D4037] font-medium tracking-widest bg-[#E8DAB2]/70 px-4 py-2 rounded backdrop-blur-sm mt-4">
            水尾許，八斗仔杜，三貂吳，跨越兩世紀的煤礦傳奇。
          </h2>
        </div>

        {/* 👇 往下引導的跳動箭頭 */}
        {/* absolute bottom-12 把它死死地釘在螢幕正下方，不受上面文字多寡影響 */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 text-[#5D4037]">
          <span className="text-sm tracking-widest uppercase opacity-70">探索族史</span>
          <div className="w-6 h-6 border-b-2 border-r-2 border-[#5D4037] transform rotate-45 animate-bounce"></div>
        </div>
        
      </section>

      {/* 📜 3. 第二區塊：歷史時間軸與卡片 (History Section) */}
      {/* 因為上面的 section 已經把第一個螢幕填滿了，所以這裡自動會被推到「畫面外」，必須往下滑才看得到！ */}
      <div className="relative z-10 w-full pb-20">
        <HistorySection />
      </div>
      {/* 第三部分：家族樹 👈 加在這裡！ */}
      <div className="relative z-10 w-full pb-20">
        <FamilyTree />
      </div>
    </main>
  );
}