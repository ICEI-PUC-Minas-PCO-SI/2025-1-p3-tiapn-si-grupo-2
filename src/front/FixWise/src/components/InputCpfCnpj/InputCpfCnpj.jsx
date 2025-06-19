import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Toast from '../Toast/Toast';

const InputCpfCnpj = ({ value, onChange, onCnpjData }) => {
  const [toastConfig, setToastConfig] = useState({ show: false, message: '', type: 'error' });
  
  const { refetch, isLoading } = useQuery({
    queryKey: ['cnpjData', value],
    queryFn: async () => {
      const cnpj = value.replace(/\D/g, '');
      
      if (cnpj.length !== 14) {
        setToastConfig({ 
          show: true, 
          message: 'CNPJ deve ter 14 dígitos', 
          type: 'warning' 
        });
        throw new Error('CNPJ inválido');
      }

      try {
        const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
        if (!response.ok) {
          if (response.status === 404) {
            setToastConfig({ 
              show: true, 
              message: `O CNPJ ${cnpj} não foi encontrado`, 
              type: 'error' 
            });
          } else if (response.status === 429) {
            setToastConfig({ 
              show: true, 
              message: 'Muitas requisições. Tente novamente em alguns segundos', 
              type: 'warning' 
            });
          } else {
            setToastConfig({ 
              show: true, 
              message: 'Erro ao buscar dados do CNPJ', 
              type: 'error' 
            });
          }
          throw new Error('Erro na busca do CNPJ');
        }
        const data = await response.json();
        onCnpjData(data);
        return data;
      } catch (error) {
        if (!error.message.includes('Erro na busca do CNPJ')) {
          setToastConfig({ 
            show: true, 
            message: 'Erro de conexão. Verifique sua internet', 
            type: 'error' 
          });
        }
        throw error;
      }
    },
    enabled: false,
    retry: false,
  });

  const handleSearch = () => {
    setToastConfig({ show: false });
    refetch();
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    
    // Remove todos os caracteres não numéricos
    inputValue = inputValue.replace(/\D/g, '');
    
    // Se tiver 11 dígitos ou menos, aplica máscara de CPF
    if (inputValue.length <= 11) {
      inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
        (_, p1, p2, p3, p4) => {
          if (p4) return `${p1}.${p2}.${p3}-${p4}`;
          if (p3) return `${p1}.${p2}.${p3}`;
          if (p2) return `${p1}.${p2}`;
          return p1;
        }
      );
    } 
    // Se tiver mais de 11 dígitos, aplica máscara de CNPJ
    else {
      inputValue = inputValue.slice(0, 14); // Limita a 14 dígitos
      inputValue = inputValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        (_, p1, p2, p3, p4, p5) => {
          if (p5) return `${p1}.${p2}.${p3}/${p4}-${p5}`;
          if (p4) return `${p1}.${p2}.${p3}/${p4}`;
          if (p3) return `${p1}.${p2}.${p3}`;
          if (p2) return `${p1}.${p2}`;
          return p1;
        }
      );
    }

    // Limpa o toast quando o usuário começa a digitar
    if (toastConfig.show) {
      setToastConfig({ show: false });
    }

    onChange(inputValue);
  };

  return (
    <>
      {toastConfig.show && (
        <Toast
          message={toastConfig.message}
          type={toastConfig.type}
          onClose={() => setToastConfig({ show: false })}
        />
      )}
      <div className="flex flex-col w-auto gap-2">
        <label htmlFor="" className="text-lg">CPF/CNPJ</label>
        <div className="relative">
          <input 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text" 
            placeholder="CPF/CNPJ"
            value={value}
            onChange={handleChange}
          />
          <button 
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-[25%] top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300"
          >
            <FaSearch />
          </button>
          
          {isLoading && (
            <div className="absolute right-[30%] top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default InputCpfCnpj;