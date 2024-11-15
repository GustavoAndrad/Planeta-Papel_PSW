function InfoPlano({nome, custo, duracao, beneficios}){
    return(
        <div class="bg-white shadow-md rounded-[20px] border-2 p-4 mb-6" >
        <form>
          <input
            value={nome}
            type="text"
            class="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          />
          <input
            type="text"
            value={"R$" + custo}
            class="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          />
          <input
            type="text"
            value={duracao}
            class="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          />
          
          {beneficios.map((item, index) => {
            return(
            <div class="flex justify-between items-center mb-4">
                <input
                type="text"
                value={item}
                class="border border-[#1D437A] p-2 rounded-[20px] w-fit pl-4"
                />
                <button
                type="button"
                class="px-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-full"
                >
                Excluir
                </button>
            </div>
            )
          })}


          <input
            type="text"
            placeholder="Benefício"
            class="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          />
          <button
            type="button"
            class="py-0.5 px-3 block text-lg text-white bg-[#2A56ED] hover:bg-blue-700 rounded-full"
          >
            +
          </button>
          <button
            class="bg-[#2A56ED] text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
          >
            Salvar alterações
          </button>
          <button
            class="bg-red-600 text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
          >
            Excluir plano
          </button>
        </form>
      </div>
    )
}

export default InfoPlano;