'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 📝 1. 準備歷史資料庫 (這裡把我們之前考證的精華先放進來)
const historyStories = [
  {
    id: 1,
    period: "明末清初永曆年間",
    title: "渡海與扎根：八斗子的第一批漢人",
    summary: "第一代存心公橫渡黑水溝，在基隆八斗子落戶，以咾咕厝建立起杜家的百年基業...",
    fullText: "根據文獻記載，杜家的先祖是隨鄭延平王來台，從福建省泉州府同安縣渡海遷徙來台灣的。杜家渡海後，最一開始是在基隆落戶，具體地點就在基隆的八斗子一帶。早期的杜家人主要是從事農漁業，在八斗子沿岸以舢舨捕魚維生，就地取材建立了典型的「咾咕厝」，後來更成為了基隆當地的大世族。",
    image: "/images/img001.jpg"
  },
  {
    id: 2,
    period: "日治時期",
    title: "煤礦帝國的發跡與商戰",
    summary: "第四代潭中公精準看見煤礦商機，一封寄往大甲的機密信件，揭開了當時商場上的運籌帷幄...",
    fullText: "杜父潭中太公墓誌銘：杜潭中先生，煤礦業先進，原籍福建省泉州府同安縣安仁里十六都馬銮社。祖先為抗清扶明，隨鄭延平王來台，落籍台灣台北州基隆市基隆義重町。五傳至萬肯公，配王氏，子遜清光緒癸已年 [1893] 三月初二日戊時獨生。先生廿二歲，擇配台北縣新店望族高德養老先生四媛高氏昌。生平歷辦大竿林、石碇等煤礦，處事仁慈重義，有子四、女三。卒於丙戌年 [1946] 二月廿三日子時，享壽五十有四，原葬於基隆市南榮公墓，民國戊申年 [1968] 五月初五日午時遷葬于此。長郎伯英配陳氏，育子五，曰宗賢、煌、鎮、鈞、錫，女一；次郎仲雄配陳氏，育子一，曰宗肇，女五；三郎叔豪配吳氏育子二，曰宗鰹、垚，女一；四郎季傑配鄭氏育子一，曰宗尚，女三。其女三，長適謝、次適鄭、三適余。諸郎均能繼父志，加倍奮發，竭力擴充礦業，已擁有調和、順和、英和、勝和、正福諸煤礦，員工逾五千。爰于竣工日誌銘，以規其哲嗣。緬懷先生積陰功、種福田，而有今日之盛，多為積善之家，必有餘慶，以厲世代焉。",
    image: "/images/img002.jpg" 
  },
  {
    id: 3,
    period: "民國時期",
    title: "雄霸桃園的順和煤礦",
    summary: "第五代伯英公將事業版圖擴展至桃園與新北，建立起鼎盛時期擁有四百多名員工的礦業帝國...",
    fullText: "國民政府來台後，杜伯英家族接手了位於桃園大溪的歷史礦坑「順和煤礦」。在杜家經營的鼎盛時期，擁有高達四百多名員工，是當時的桃園第一大礦場！伯英公的事業版圖非常廣大，後續更接手了樹林山佳的勝和煤礦，並成為石碇三民煤礦的最初負責人，將家族榮耀推向巔峰。",
    image: "/images/img003.png" 
  },
  {
    id: 4,
    period: "溫潤傳承",
    title: "政大校園裡的杜母",
    summary: "財富化作教育的種子，杜家在政大設立「杜母高昌太夫人獎學金」。",
    fullText: "民國 71 年，原位於政大渡賢橋旁、佔地三百餘坪的高昌太夫人墓園安遷至樹林。杜家後代將校方給予的 517,500 元搬遷補償費全數捐出，成立『杜母高昌太夫人紀念獎學金』，將家族榮耀化為教育傳承的校園佳話。",
    image: "/images/img004.jpg" 
  }
];

export default function HistorySection() {
  // 🪄 魔法狀態：用來記住現在點開了哪一個故事，null 代表全部關閉
  const [selectedStory, setSelectedStory] = useState<typeof historyStories[0] | null>(null);

  return (
    <section className="relative w-full py-20 px-4">
     
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col gap-12">
        {/* 🗺️ 2. 畫出歷史卡片列表 */}
        {historyStories.map((story) => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#E8DAB2]/90 border border-[#B7791F]/30 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all"
            onClick={() => setSelectedStory(story)} // 點擊時，把這個故事裝進膠囊裡打開！
          >
            <p className="text-amber-800 font-bold text-sm mb-1">{story.period}</p>
            <h3 className="text-2xl font-bold text-stone-800 mb-2">{story.title}</h3>
            <p className="text-stone-600">{story.summary}</p>
            <div className="mt-4 flex items-center text-[#B7791F] font-bold text-sm">
              <span>點擊閱讀更多</span>
              <span className="ml-2">→</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎭 3. 遮罩與彈出視窗 (Modal) */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 黑色半透明背景遮罩 (點擊背景也可以關閉) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedStory(null)}
            />

            {/* 彈出視窗本體 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#f4ebd0] w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl border-2 border-[#B7791F]/50 p-8 z-10"
            >
              {/* 右上角關閉按鈕 */}
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 font-bold text-xl"
              >
                ✕
              </button>

              <p className="text-[#B7791F] font-bold mb-2">{selectedStory.period}</p>
              <h2 className="text-3xl font-bold text-stone-800 mb-6">{selectedStory.title}</h2>
              
             {/* 📸 圖片展示區 */}
             {/* 我們把高度稍微加高到 h-64，並加上一點內陰影讓照片看起來更有質感 */}
            <div className="w-full h-128 rounded-md mb-6 overflow-hidden border border-[#B7791F]/30 shadow-inner relative bg-[#E8DAB2]/30">
            {/* 如果該故事有設定圖片路徑，就顯示圖片 */}
            {selectedStory.image ? (
            <img 
              src={selectedStory.image} 
              alt={selectedStory.title}
              // object-cover 是一個超級魔法：它會讓照片完美填滿相框，就算比例不對也會自動漂亮裁切，不會把爺爺的臉拉扁！
              className="w-full h-full object-cover"
            />
            ) : (
            // 如果忘記放圖片，就顯示這個備用的復古文字
          <div className="w-full h-full flex items-center justify-center">
          <p className="text-amber-800/50 tracking-widest">暫無影像紀錄</p>
          </div>
           )}
</div>

              <p className="text-stone-700 leading-loose text-lg whitespace-pre-wrap">
                {selectedStory.fullText}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}