import BotaoAzul from '../BotaoAzul';

export default function ClientDataView({
  name,
  email,
  phone,
  neighborhood,
  address,
  complement,
  cep,
  onEditClick,
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-[#2A5EAD] mb-6">Informações pessoais</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center">
          <label className="text-lg font-bold text-[#2A5EAD] mr-2">Nome:</label>
          <span className="text-lg font-semibold text-gray-800">{name}</span>
        </div>

        <div className="flex items-center">
          <label className="text-lg font-bold text-[#2A5EAD] mr-2">E-mail:</label>
          <span className="text-lg font-semibold text-gray-800">{email}</span>
        </div>

        <div className="flex items-center">
          <label className="text-lg font-bold text-[#2A5EAD] mr-2">Telefone:</label>
          <span className="text-lg font-semibold text-gray-800">{phone}</span>
        </div>

        <div className="flex items-center">
          <label className="text-lg font-bold text-[#2A5EAD] mr-2">Bairro:</label>
          <span className="text-lg font-semibold text-gray-800">{neighborhood}</span>
        </div>

        <div className="flex items-center">
          <label className="text-lg font-bold text-[#2A5EAD] mr-2">Endereço:</label>
          <span className="text-lg font-semibold text-gray-800">{address}</span>
        </div>

        <div className="flex items-center">
          <label className="text-lg font-bold text-[#2A5EAD] mr-2">Complemento:</label>
          <span className="text-lg font-semibold text-gray-800">{complement}</span>
        </div>

        <div className="flex items-center sm:col-span-2">
          <label className="text-lg font-bold text-[#2A5EAD] mr-2">CEP:</label>
          <span className="text-lg font-semibold text-gray-800">{cep}</span>
        </div>
      </div>

      <BotaoAzul
        text="Editar"
        onClick={onEditClick}
        type="button"
      />
    </div>
  );
}
