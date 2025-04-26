
interface NifResponse {
  nome: string;
  numero_contacto?: string;
  endereco?: string;
}

export const useNifValidation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validateNif = async (nif: string): Promise<NifResponse | null> => {
    if (!nif || nif.length < 8) return null;
    
    setIsLoading(true);
    try {
      const response = await fetch(`https://consulta.edgarsingui.ao/consultar-por-nif/${nif}`);
      const result = await response.json();
      
      if (result?.data?.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching NIF data:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, validateNif };
};
