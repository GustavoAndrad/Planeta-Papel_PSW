import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCarrinho, updateCarrinho } from '../redux/carrinhoSlice';

export default function CarrinhoCard({ ParamQtd, prodId, produto, dispatch }){
    const [qtd, setQtd] = useState(ParamQtd);
    const total = qtd * produto.preco; 

    const handleBlur = () => {
        if(qtd===0){
            setQtd(1);
            dispatch(updateCarrinho({prodId, qtd: 1}));
        }
    };

    function handleQtdClick(n){
        let value = qtd+n;
        if(value > 999){
            value = 999;
        }
        if(value>=1){
            setQtd(value);
            dispatch(updateCarrinho({prodId, qtd: value}))

        }
    }
    function handleQtdChange(value){
        if(value===''){
            value=0;
        }else if(isNaN(value)){
            value=qtd;
        }
        value = parseInt(value);
        if(value < 0)
            value=0; 
        if(value>999){
            value=999;
        }
        
        setQtd(value);
        if(value !== qtd){
            dispatch(updateCarrinho({prodId, qtd: value}));
        }
    }
    function handleCardRemove(){
        console.log("Excluindo produto com ID:", prodId);
        dispatch(deleteCarrinho(prodId));
    }

    return (
        <>
          <div className="mt-5 group flex flex-col relative items-start rounded-lg p-4 text-sm/6 bg-white shadow-md">
            <div className="flex items-center space-x-3">
              <div className="flex-none h-12 w-12 rounded-lg">
                <img className="size-max cursor-pointer" src={produto.imagem[0]} alt="" />
              </div>
      
              <div className="flex-auto">
                <Link to={`/produto/${produto.id}`} className="text-xl font-bold text-primaryBlue">
                  {produto.nome}
                </Link>
                <p className="mt-0.5 text-lg font-semibold text-secondaryBlue">Uni. R$ {produto.preco.toFixed(2)}</p>
                <p className="mt-0.5 text-lg font-semibold text-secondaryBlue">Total R$ {total.toFixed(2)}</p>
              </div>
            </div>
      
            <div className="mt-3 w-full flex justify-around items-center">
              <div className="flex items-center gap-x-3">
                <button
                  type="button"
                  onClick={() => handleQtdClick(-1)}
                  className="size-8 inline-flex justify-center items-center gap-x-2 text-md rounded-md border-1 border-accentBlue bg-primaryBlue text-white shadow-sm hover:bg-secondaryBlue focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  aria-label="Decrease"
                >
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
      
                <input
                  className="p-0 w-8 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"
                  type="text"
                  aria-roledescription="Number field"
                  onBlur={handleBlur}
                  value={qtd}
                  onChange={(e) => handleQtdChange(e.target.value)}
                  data-hs-input-number-input=""
                />
      
                <button
                  type="button"
                  onClick={() => handleQtdClick(1)}
                  className="size-8 inline-flex justify-center items-center gap-x-2 text-md rounded-md border-1 border-accentBlue bg-primaryBlue text-white shadow-sm hover:bg-secondaryBlue focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  aria-label="Increase"
                >
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
      
              <button
                type="button"
                onClick={handleCardRemove}
                className="w-1/3 h-full font-semibold text-lg bg-cancelRed hover:bg-red-600 text-white rounded-lg p-1"
              >
                Remover
              </button>
            </div>
          </div>
        </>
      );
}
