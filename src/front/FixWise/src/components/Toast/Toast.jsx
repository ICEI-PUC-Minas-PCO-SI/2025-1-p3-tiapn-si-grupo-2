import React, { useEffect } from 'react';
import { FaCheck, FaTimes, FaExclamationCircle } from 'react-icons/fa';

const Toast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck className="w-5 h-5" />;
      case 'error':
        return <FaTimes className="w-5 h-5" />;
      case 'warning':
        return <FaExclamationCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-400';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-400';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg border ${getColors()}`} role="alert">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-2">
        {getIcon()}
      </div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        onClick={onClose}
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${getColors()} hover:bg-opacity-75`}
      >
        <span className="sr-only">Fechar</span>
        <FaTimes className="w-3 h-3" />
      </button>
    </div>
  );
};

export default Toast;
