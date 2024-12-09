import InfoProdutoCriar from "../components/CriarProduto/InfoProdutoCriar";

export default function CriarProduto(){

    return(<>

        <div className="overflow-hidden w-full flex items-center mb-6 gap-3">
        <img src="/images/prod.png" alt="" className="size-8" />
        <h1 className="w-auto text-2xl font-semibold text-secondaryBlue whitespace-nowrap">
          Criar Produto
        </h1>
        <div className="w-full h-full border-b-4 border-dotted border-secondaryBlue text-transparent"></div>
      </div>
        
        <InfoProdutoCriar></InfoProdutoCriar>

    </>)
}