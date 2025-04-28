
import { Pool, PoolClient } from 'pg';
import { pgConfig } from './client';

let pool: Pool;

/**
 * Inicializa a conexão com o PostgreSQL
 */
export const initDatabase = () => {
  try {
    pool = new Pool(pgConfig);
    console.log('Conexão com o banco de dados PostgreSQL inicializada');
    return pool;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

/**
 * Obtém uma conexão do pool
 */
export const getClient = async (): Promise<PoolClient> => {
  if (!pool) {
    initDatabase();
  }
  return await pool.connect();
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
  initDatabase
};
