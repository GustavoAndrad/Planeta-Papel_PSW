import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser, userSelectors } from '../redux/usuarioSlice';
import ClientDataView from '../components/EditarExcluirCliente/ClientDataView';
import EditForm from '../components/EditarExcluirCliente/EditForm';
import DeleteAccountButton from '../components/EditarExcluirCliente/DeleteAccountButton';
import { useNavigate } from 'react-router-dom';
import userValidationSchema from '../YupSchema/userSchema';
import { toast } from "react-toastify";
import { mascaraCEP, mascaraTelefone } from '../Mascaras';


function DadosCliente() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //const {id} = useParams();
  //userId = id;
  const userId = localStorage.getItem("id");
  
  const clientData = useSelector((state) => userSelectors.selectById(state, userId));
  const clientStatus = useSelector((state) => state.users.status);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (clientStatus === "idle") {
        dispatch(fetchUsers());
    }
  }, [dispatch, clientStatus]);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    bairro: '',
    endereco: '',
    complemento: '',
    cep: ''
  });

  useEffect(() => {
    if (clientData) {
      setFormData(clientData);
    }
  }, [clientData]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (updatedData) => {
    
    try{
      await userValidationSchema.validate(updatedData, { abortEarly: false });
    } catch(e){
      e.inner.forEach((err) => {
        toast.error(`${err.message}`);
      });
      return
    }

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
    navigate("/");
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    switch(name){
      case "telefone":
        value = mascaraTelefone(value); 
        break; 
      case "cep":
        value = mascaraCEP(value);
        break;
    }

    const updatedData = {
      ...formData,
      [name]: value
    };

    setFormData(updatedData);
  };

  // Lidar com estados de carregamento ou erro
  if (clientStatus === "pending") {
    return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
  }

  if (clientStatus === "failed") {
    return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações do Usuário.</div>;
  }

  if (!clientData) {
    return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Usuário não encontrado.</div>;
  }

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
              {...formData}
              onEditClick={handleEditClick}
            />
          ) : (
            <EditForm
              {...formData}
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

