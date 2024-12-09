import React from 'react';
import { useNavigate } from 'react-router-dom';
import BotaoVermelho from '../BotaoVermelho';

export default function DeleteAccountButton() {
  const navigate = useNavigate(); 

  const handleDeleteClick = () => {
    console.log('Conta excluída com sucesso.');

    navigate('/login');
  };

  return (
    <div className="text-center mt-4">
      <BotaoVermelho text="Excluir Conta" onClick={handleDeleteClick} type="button" />
    </div>
  );
}

