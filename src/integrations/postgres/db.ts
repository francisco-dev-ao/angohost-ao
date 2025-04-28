
// Este arquivo foi mantido apenas para referência.
// O projeto agora usa Supabase como banco de dados.
// Para usar o Supabase, conecte seu projeto Lovable ao Supabase clicando no botão verde no canto superior direito.

console.warn('O PostgreSQL direto não está mais em uso. Este projeto foi migrado para usar Supabase.');

// Mock functions para evitar erros de compilação durante a transição
export const initDatabase = () => {
  console.warn('Método initDatabase() não disponível. Use Supabase.');
  return null;
};

export const getClient = async () => {
  console.warn('Método getClient() não disponível. Use Supabase.');
  throw new Error('PostgreSQL não configurado. Use Supabase.');
};

export const query = async () => {
  console.warn('Método query() não disponível. Use Supabase.');
  throw new Error('PostgreSQL não configurado. Use Supabase.');
};

export const transaction = async () => {
  console.warn('Método transaction() não disponível. Use Supabase.');
  throw new Error('PostgreSQL não configurado. Use Supabase.');
};

export const checkDatabaseConnection = async (): Promise<boolean> => {
  console.warn('Método checkDatabaseConnection() não disponível. Use Supabase.');
  return false;
};

export default {
  query,
  getClient,
  transaction,
  initDatabase,
  checkDatabaseConnection
};
