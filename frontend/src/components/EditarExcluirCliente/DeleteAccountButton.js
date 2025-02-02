import React from 'react';
import BotaoVermelho from '../BotaoVermelho';

export default function DeleteAccountButton({ onDeleteClick, isRoot }) {
  if(!isRoot){
    return (
      <div className="text-center mt-4">
        <BotaoVermelho text="Excluir Conta" onClick={onDeleteClick} type="button" />
      </div>
    );
  }
}

