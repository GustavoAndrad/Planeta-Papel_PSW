import React, { useEffect, useState } from 'react';
import Loader from "../Loader";


function ProdutoCard(props) {
  const [image, setImage] = useState(null);  // Armazena a imagem no estado local
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos/images/${props.prodStandardImage}`);
        
        if (!response.ok) {
          throw new Error('Erro ao buscar a imagem');
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        setImage(imageUrl); // Armazena a URL no estado
        setLoading(false); // Atualiza o estado de carregamento
      } catch (error) {
        console.log(error.message);
        setImage("/images/prod.png")
        setLoading(false);  // Finaliza o carregamento
      }
    };

    fetchImage();
  }, [props.prodStandardImage]); // Reexecuta a requisição se o ID do produto mudar

  return (
    <div onClick={props.onClick} title={`${props.prodName}`} className="min-w-[200px] min-h-[200px] bg-white rounded-lg shadow-md flex-shrink-0 cursor-pointer">
      <div className="flex flex-col items-center p-4">
        <div className="mb-4">

          {loading? 
            <Loader></Loader>
            :
            <img 
              src={image}  // Exibe a imagem carregada ou uma padrão
              alt={props.prodName}
              className="w-32 h-32 object-cover"
            />
          }

        </div>
        <div className="text-center">
          <span className="text-gray-800 font-semibold block max-w-[150px] truncate">{props.prodName}</span>
          <span className="text-gray-500 font-bold">R$ {props.prodPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default ProdutoCard;

