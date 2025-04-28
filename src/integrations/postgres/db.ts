
import { Pool, PoolClient } from 'pg';
import { pgConfig } from './client';

let pool: Pool;
let isConnecting = false;
let connectionRetries = 0;
const MAX_RETRIES = 5;
const RETRY_INTERVAL = 3000; // 3 segundos

/**
 * Inicializa a conexão com o PostgreSQL
 */
export const initDatabase = () => {
  try {
    if (!pool) {
      pool = new Pool(pgConfig);
      
      // Monitorar eventos de conexão
      pool.on('error', (err) => {
        console.error('Erro inesperado no pool de conexões:', err);
        
        // Tentativa de reconexão se o erro for de conexão
        if (err.message.includes('connection') && !isConnecting) {
          reconnectDatabase();
        }
      });
      
      console.log('Conexão com o banco de dados PostgreSQL inicializada');
    }
    return pool;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

/**
 * Tenta reconectar ao banco de dados em caso de falha
 */
const reconnectDatabase = async () => {
  if (isConnecting || connectionRetries >= MAX_RETRIES) return;
  
  isConnecting = true;
  connectionRetries++;
  
  console.log(`Tentando reconectar ao banco de dados (tentativa ${connectionRetries}/${MAX_RETRIES})...`);
  
  try {
    // Fechar o pool existente
    if (pool) {
      await pool.end();
    }
    
    // Aguardar intervalo antes de tentar novamente
    await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
    
    // Criar novo pool
    pool = new Pool(pgConfig);
    console.log('Reconexão com o banco de dados PostgreSQL bem-sucedida');
    isConnecting = false;
  } catch (error) {
    console.error('Erro na tentativa de reconexão:', error);
    isConnecting = false;
    
    // Tentar novamente se não excedeu o limite
    if (connectionRetries < MAX_RETRIES) {
      reconnectDatabase();
    } else {
      console.error(`Máximo de ${MAX_RETRIES} tentativas de reconexão atingido`);
    }
  }
};

/**
 * Verifica o status da conexão com o banco de dados
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT 1');
    client.release();
    return result.rowCount === 1;
  } catch (error) {
    console.error('Erro ao verificar conexão com o banco de dados:', error);
    return false;
  }
};

/**
 * Obtém uma conexão do pool
 */
export const getClient = async (): Promise<PoolClient> => {
  if (!pool) {
    initDatabase();
  }
  
  try {
    return await pool.connect();
  } catch (error) {
    console.error('Erro ao obter conexão do pool:', error);
    
    // Verificar se é um erro de conexão e tentar reconectar
    if (error instanceof Error && error.message.includes('connection')) {
      await reconnectDatabase();
      return await pool.connect();
    }
    
    throw error;
  }
};

/**
 * Executa uma query no banco de dados
 * @param text Query SQL
 * @param params Parâmetros da query
 * @returns Resultado da query
 */
export const query = async (text: string, params: any[] = []) => {
  const client = await getClient();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Erro ao executar query:', error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Executa uma transação no banco de dados
 * @param callback Função que recebe uma conexão e executa operações em uma transação
 */
export const transaction = async <T>(callback: (client: PoolClient) => Promise<T>): Promise<T> => {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default {
  query,
  getClient,
  transaction,
  initDatabase,
  checkDatabaseConnection
};
