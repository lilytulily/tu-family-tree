import neo4j from 'neo4j-driver';

const uri = process.env.NEO4J_URI as string;
const user = process.env.NEO4J_USERNAME as string;
const password = process.env.NEO4J_PASSWORD as string;

// 這是連線，它會一直待命
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export default driver;