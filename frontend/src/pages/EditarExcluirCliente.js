import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, deleteUser, selectUserById } from '../redux/usuarioSlice';
import ClientDataView from '../components/EditarExcluirCliente/ClientDataView';
import EditForm from '../components/EditarExcluirCliente/EditForm';
import DeleteAccountButton from '../components/EditarExcluirCliente/DeleteAccountButton';

function DadosCliente({ userId }) {
  const dispatch = useDispatch();
  const clientData = useSelector((state) => selectUserById(state, userId));
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (updatedData) => {
    dispatch(updateUser({ ...clientData, ...updatedData }))
      .unwrap()
      .then(() => {
        alert('Dados atualizados com sucesso!');
        setIsEditing(false);
      })
      .catch(() => alert('Erro ao atualizar os dados.'));
  };

  const handleDeleteClick = () => {
    dispatch(deleteUser(clientData.id))
      .unwrap()
      .then(() => {
        alert('Conta excluída com sucesso!');
      })
      .catch(() => alert('Erro ao excluir a conta.'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    clientData[name] = value; // Atualiza dados localmente
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <img
          src="../images/perfil.png"
          alt="Dados do Cliente"
          className="w-11 h-11 mr-2 transform scale-x-[-1]"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold" style={{ color: '#2A5EAD' }}>
            Dados do Cliente
          </h1>
          <h2 className="text-md" style={{ color: '#2A5EAD' }}>
            Visualize e edite suas informações
          </h2>
        </div>
      </div>

      <div
        id="view-tab"
        className="bg-white shadow-md rounded-[20px] border-2 p-4 mb-6"
        style={{ borderColor: '#1D437A' }}
      >
        <div className="mb-4">
          {!isEditing ? (
            <ClientDataView
              {...clientData}
              onEditClick={handleEditClick}
            />
          ) : (
            <EditForm
              {...clientData}
              onSaveClick={handleSaveClick}
              onChange={handleInputChange}
            />
          )}
        </div>
        <hr className="border-[#5a7597] my-4" />
        <DeleteAccountButton onDeleteClick={handleDeleteClick} />
      </div>

      <div className="text-center mt-4">
        <p className="text-[#828282]">Em caso de dúvida, ligue para +55 021 1234-5678</p>
      </div>
    </div>
  );
}

export default DadosCliente;

