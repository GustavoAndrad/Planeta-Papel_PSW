import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProdutos, produtoSelectors } from "../redux/produtoSlice";
import { addToCarrinho } from "../redux/carrinhoSlice";
import Loader from "../components/Loader";
import { toast } from 'react-toastify';

function Produto() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();  // Pegando o ID do produto da URL

  const produto = useSelector(state => produtoSelectors.selectById(state, id));
  const prodStatus = useSelector((state) => state.produtos);

  const [images, setImages] = useState([]);

  const isGerente = localStorage.getItem('gerente');
  const isLogged = localStorage.getItem('id');

  const produtoNoCarrinho = useSelector((state) =>
    Object.values(state.carrinho.entities).find((item) => item.prodId === id)
  );

  // Carregar os produtos ao montar o componente, se necessário
  useEffect(() => {
    if (prodStatus === "idle" || !produto) {
      dispatch(fetchProdutos()); // Disparando a action para buscar os produtos
    }
  }, [prodStatus, dispatch, produto]);

  useEffect(() => {
    const loadImagesAsync = async () => {
      const loadedImages = await Promise.all(
        produto.imagem.map(async (img) => {
          return await loadImage(img);
        })
      );
      setImages(loadedImages);
    };

    if (produto?.imagem) {
      loadImagesAsync();
    }
  }, [produto]);

  // Lidar com estados de carregamento ou erro
  if (prodStatus === "pending") {
    return (
      <div className="pt-24 w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (prodStatus === "failed" || !produto) {
    return (
      <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10 text-center text-red-600 font-bold">
        Erro ao carregar informações do produto<br /> Código buscado: {id}
      </div>
    );
  }

  const { nome, preco, descricao, imagem } = produto;

  async function loadImage(imageName) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos/images/${imageName}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar a imagem');
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.log(error.message);
      return "/images/prod.png";
    }
  }
  const handleImageChange = (event, index) => {
    const newImages = [...images];
    const clickedImage = newImages[index];
    newImages[index] = images[0]; // Coloca a imagem principal na posição da miniatura
    newImages[0] = clickedImage; // Coloca a imagem clicada como principal
  
    setImages(newImages);  // Atualiza o estado com as imagens trocadas
  };
  
  return (
    <section className="py-8 lg:h-[600px] bg-white md:py-16 dark:bg-gray-900 antialiased rounded-xl">
      <div className="max-w-screen-xl w-full px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">

          {/* Seção de Imagens */}
          <div className="h-full w-full justify-center">
            <div className="w-full max-w-[700px] border-accentBlue border-2 rounded-xl shrink-0 flex justify-center items-center lg:max-w-lg mx-auto">
              <img
                className="md:size-72 lg:size-96 block"
                src={ images[0] || "/images/prod.png"}
                alt={`Imagem do produto ${nome}`}
              />
            </div>

            {images.length > 1 && (
              <div className="hidden w-full h-32 vs:visible vs:flex justify-center items-center pt-4">
                <div className="grid grid-cols-3 h-full w-ful gap-6">
                  {images.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="size-24 flex justify-center items-center border-accentBlue border-2 rounded-md cursor-pointer hover:border-primaryBlue hover:border-4"
                    >
                      <img
                        onClick={(e) => handleImageChange(e, index + 1)}
                        className="size-20 block"
                        src={img || "/images/prod.png"}
                        alt={`Imagem ${index + 1} do produto`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="visible vs:hidden mt-8 w-full h-6 flex justify-center items-center">
              <div
                onClick={() => {
                  imagem.slice(1).forEach((img) => {
                    window.open(img, '_blank', 'noopener,noreferrer'); // O BLOQUEADOR DO NAVEGADOR NÃO PERMITE ABRIR TANTOS. CONSIDERAR UMA ABA EXCLUSÍVA
                  });
                }}

                title="Ver mais detalhes"
                className="text-center min-w-[130px] w-1/2 items-center justify-center py-2.5 px-5 text-sm font-medium text-white bg-primaryBlue hover:bg-accentBlue rounded-lg"
              >
                👁‍🗨 Ver mais...
              </div>
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="mt-6 sm:mt-16 lg:mt-0">
            <h1 className="text-xl font-semibold text-accentBlue sm:text-2xl dark:text-white">
              {nome}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                R$ {preco.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-5">

              {isGerente === 'true' ? (
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    type="button"
                    title="Adicionar ao Carrinho"
                    onClick={() => { navigate(`/gerente/alterar-produto/${id}`) }}
                    className="flex items-center justify-center py-2.5 px-5 text-sm text-white bg-secondaryBlue font-bold rounded-lg hover:bg-primaryBlue"
                  >
                    🖋 Atualizar Dados
                  </button>
                </div>
              ) : (
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  {produtoNoCarrinho ? (
                    <button
                      type="button"
                      title="Ir para o Carrinho"
                      onClick={()=>navigate("/carrinho")}
                      className="flex items-center justify-center py-2.5 px-5 text-sm text-white bg-green-600 font-bold rounded-lg hover:bg-green-700"
                    >
                      🛒 Ir para o Carrinho
                    </button>
                  ) : (
                  <button
                    type="button"
                    title="Adicionar ao Carrinho"
                    onClick={() => {
                      if (isLogged){
                        if(produto.qntDisponivel>0){
                          dispatch(addToCarrinho({ prodId: id, qtd: 1 }))                     
                          
                          toast.info("Adicionado ao Carrinho")
                        } else{
                          toast.error("Falha ao adicionar ao carrinho. Estoque insuficiente")
                        }
                      } else {
                        navigate("/login");
                      }
                    }}
                    className="flex items-center justify-center py-2.5 px-5 text-sm text-white bg-primaryBlue font-bold rounded-lg hover:bg-secondaryBlue"
                  >
                    🛒 Adicionar ao Carrinho
                  </button>
                  )}
                </div>
              )}
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <h1 className="text-xl font-semibold text-accentBlue sm:text-2xl dark:text-white">
              Descrição
            </h1>
            <p className="mb-6 text-gray-500 dark:text-gray-400">{descricao}</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Produto;
