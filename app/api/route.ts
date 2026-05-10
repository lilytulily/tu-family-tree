// app/api/route.ts
import { NextResponse } from 'next/server';
import driver from '../../src/lib/neo4j'; // 確保路徑正確

export async function GET() {
  const session = driver.session();
  try {
    // 🪄 升級版咒語：抓取所有人，並順便抓出他們的所有關係與目標 ID
    const result = await session.run(`
      MATCH (p:Person)
      OPTIONAL MATCH (p)-[rel]->(target:Person)
      RETURN p, type(rel) as relType, target.id as targetId
    `);

    // 整理資料：將 Neo4j 的 Record 轉換成前端好讀的扁平化 JSON
    const data = result.records.map(record => ({
      person: record.get('p').properties,
      relType: record.get('relType'),   // 會拿到 "PARENT_OF" 或 "MARRIED_TO"
      targetId: record.get('targetId') // 關係連向誰
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Neo4j API Error:", error);
    return NextResponse.json({ error: "無法連線資料庫" }, { status: 500 });
  } finally {
    await session.close();
  }
}