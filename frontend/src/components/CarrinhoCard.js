import { useState } from 'react';
//import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCarrinho, updateCarrinho } from '../redux/carrinhoSlice';

export default function CarrinhoCard({ ParamQtd, id, produto, dispatch }){
    //const dispatch = useDispatch();
    const [qtd, setQtd] = useState(ParamQtd);
    const total = qtd * produto.preco; 

    const handleBlur = () => {
        if(qtd===0){
            setQtd(1);
            dispatch(updateCarrinho({id, qtd: 1}));
        }
    };

    function handleQtdClick(n){
        let value = qtd+n;
        if(value > 999){
            value = 999;
        }
        if(value>=1){
            setQtd(value);
            dispatch(updateCarrinho({id, qtd: value}))

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
            dispatch(updateCarrinho({id, qtd: value}));
        }
    }
    function handleCardRemove(){
        console.log("Excluindo produto com ID:", id);
        dispatch(deleteCarrinho(id));
    }

    //
    //alterar link quado detalhes_prod for feito
    //


    return( 
        <div className="mt-5 group flex relative items-center rounded-lg p-4 text-sm/6 bg-white shadow-md">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg">
              <img className="size-max cursor-pointer" src="images/prod.png" alt=""/>
              <Link to="/detalhes_prod" className="absolute w-13 h-13"></Link>
            </div>
            <div className="flex-auto border-x-4 border-dark px-3 mx-3">
              <Link to="/detalhes_prod" className=" text-xl font-bold text-primaryBlue">
                {produto.nome}
              </Link>
              <p className="mt-0.5 text-lg font-semibold text-secondaryBlue">Uni. R$ {produto.preco.toFixed(2)}</p>
              <p className="mt-0.5 text-lg font-semibold text-secondaryBlue">Total R$ {total.toFixed(2)}</p>
            </div>
            <div>
                <button type="button" onClick={() => handleQtdClick(-1)}
                    className="size-8 inline-flex justify-center items-center gap-x-2 text-md  rounded-md border-1 border-accentBlue bg-primaryBlue text-white shadow-sm hover:bg-secondaryBlue focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" aria-label="Decrease">
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                     </svg>
                </button>

                <input className="p-0 w-8 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" type="text" aria-roledescription="Number field" 
                    onBlur={handleBlur}
                    value={qtd} onChange={(e)=>handleQtdChange(e.target.value)} data-hs-input-number-input=""/>
                
                <button type="button" onClick={() => handleQtdClick(1)}
                    className="size-8 inline-flex justify-center items-center gap-x-2 text-md  rounded-md border-1 border-accentBlue bg-primaryBlue text-white shadow-sm hover:bg-secondaryBlue focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" aria-label="Increase">
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                    </svg>
                </button>

                <br/>
                <button type="button" onClick={handleCardRemove}
                    className="mt-1 w-full h-full font-semibold bg-cancelRed hover:bg-red-600 text-white rounded-lg p-1 ">Remove</button>
            </div>
        </div>
    );
}
