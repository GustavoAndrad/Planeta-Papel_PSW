import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BotaoAzul from "../BotaoAzul";
import BotaoVermelho from "../BotaoVermelho";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduto, fetchProdutos, produtoSelectors, updateProduto } from "../../redux/produtoSlice";
import Loader from "../Loader";
import produtoValidationSchema from "../../YupSchema/produtoValidationSchema";
import { toast } from "react-toastify";
import BotaoRetorno from "../BotaoRetorno";

function InfoProdutoEditarExcluir() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const produto = useSelector((state) => produtoSelectors.selectById(state, id));
  const produtos = useSelector(produtoSelectors.selectAll);
  const prodStatus = useSelector((state) => state.produtos.status);

  const [imagesCarregadas, setImagesCarregadas] = useState([]);
  
  useEffect(() => {
    if (prodStatus === "idle") {
      dispatch(fetchProdutos());
    }
  }, [dispatch, prodStatus]);

   useEffect(() => {
      const loadImagesAsync = async () => {
        const loadedImages = await Promise.all(
          produto.imagem.map(async (img) => {
            return await loadImage(img);
          })
        );
        setImagesCarregadas(loadedImages);
      };
  
      if (produto?.imagem) {
        loadImagesAsync();
      }
    }, [produto]);

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

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [qnt, setQnt] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState(imagesCarregadas);
  const [categoria, setCategoria] = useState("");


  useEffect(() => {
    if (produto) {
      setNome(produto.nome || "");
      setPreco(produto.preco?.toString() || "");
      setQnt(produto.qntDisponivel?.toString() || "");
      setDescricao(produto.descricao || "");
      setCategoria(produto.categoria || "");
      setImagens(produto.imagem || []); // Carrega imagens existentes do produto

      
    }
  }, [produto]);

  const getCategorias = useCallback(() => {
    const categorias = new Set();
    produtos.forEach((produto) => {
      if (produto.categoria) {
        categorias.add(produto.categoria);
      }
    });
    return Array.from(categorias);
  }, [produtos]);

  function handleImageChange(e, index) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImagens = [...imagens];
        updatedImagens[index] = file.name;
        setImagens(updatedImagens);

        const updatedImagensCarregadas = [...imagesCarregadas];
        updatedImagensCarregadas[index] = URL.createObjectURL(file);
        setImagesCarregadas(updatedImagensCarregadas)
      };
      reader.readAsDataURL(file);
    }
  }

  function addImage() {
    if (imagens.length < 4) {
      // Adiciona um espaço vazio para a nova imagem
      setImagens([...imagens, { file: null, preview: null }]);
      // Atualiza o estado de imagens carregadas para manter consistência
      setImagesCarregadas([...imagesCarregadas, null]);
    }
  }

  function removeImage(index) {
    const updatedImagens = imagens.filter((_, i) => i !== index);
    const updatedImagensCarregadas = imagesCarregadas.filter((_, i) => i !== index);
    setImagens(updatedImagens);
    setImagesCarregadas(updatedImagensCarregadas)
  }
  
  function handlePrecoChange(e) {
    if (!isNaN(e)) {
      setPreco(e);
    }
  }

  function handleQntChange(e) {
    if (!isNaN(e)) {
      setQnt(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Alterar permanentemente?")) {
      const produtoData = {
        id,
        nome,
        preco: parseFloat(preco),
        descricao,
        qntDisponivel: parseInt(qnt),
        categoria,
      };
  
      let filesImages = [];
      
      // Usando Promise.all para garantir que todas as imagens sejam carregadas antes de prosseguir
      const imagesPromises = imagesCarregadas.map(async (blobUrl, index) => {
        try {
          const response = await fetch(blobUrl);
          const blob = await response.blob();
          // Cria um objeto File a partir do Blob
          const file = new File([blob], imagens[index], { type: blob.type });
          filesImages.push(file);
        } catch (error) {
          console.error('Erro ao obter o Blob:', error);
        }
      });
  
      await Promise.all(imagesPromises);
  
      try {
        await produtoValidationSchema.validate(produtoData, { abortEarly: false });
      } catch (e) {
        e.inner.forEach((err) => toast.error(err.message));
        return;
      }
  
      try {
        const prod = await dispatch(updateProduto({ produtoData, imagens: filesImages }));
        if (prod.payload.status) {
          navigate(`/produto/${id}`);
          window.location.reload()
        } else {
          throw new Error(prod.payload.message);
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

  const handleDeleteProduto = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Excluir permanentemente?")) {
      dispatch(deleteProduto(id));
      navigate("/");
      window.location.reload()
    }
  };

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

  return (
    <div className="bg-white shadow-md rounded-[20px] border-2 p-4 mb-6">

      <Link to={`/produto/${id}`}>
        <BotaoRetorno/> 
      </Link> 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do Produto"
          className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
          required
        />
        <input
          type="text"
          value={`${preco !== "" ? "R$ " + preco : ""}`}
          onChange={(e) => handlePrecoChange(e.target.value.replace("R$", "").trim())}
          placeholder="Preço Unitário"
          className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
          required
        />
        <input
          type="text"
          value={qnt}
          onChange={(e) => handleQntChange(e.target.value)}
          placeholder="Quantidade Disponível"
          className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
          required
        />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4 h-28"
          required
        />
        <select
          className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4 text-gray-700"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="" disabled className="text-gray-400">
            Selecione uma opção
          </option>
          {getCategorias().map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>

        <span className="text-red-600 font-bold my-4 text-[0.7em] ml-3">
          ⚡ Imagens apagadas não podem ser recuperadas!
        </span>

        {/* Inputs para imagens */}
        <div className="mb-12 mt-2 gap-5 grid lg:grid-cols-4 sm:grid-cols-2 items-center">
          {imagesCarregadas.map((img, index) => (
            <div key={index} className="relative">

            {img && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute size-6 text-sm left-[94%] top-[-10px] z-10 hover:bg-red-600 py-1 px-2 flex justify-center items-center text-white bg-slate-400 rounded-full"
              >
                ❌
              </button>
            )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="border border-accentBlue bg-white text-black p-2 rounded-[20px] w-full flex gap-8 justify-center items-center text-ellipsis overflow-hidden"
              >

                {img && (<>
                  <img
                    className="size-20 border-blue-500 border-4 rounded-md"
                    src={img}
                    alt="Preview"
                  />
                  </>
                )}
                {img ? imagens[index] : "📁 Selecionar imagem substituta"}
              </button>

            </div>
          ))}

            {imagens.length<4 &&<button
                type="button"
                onClick={addImage}
                className="py-0.5 px-3 size-10 block text-lg text-white bg-primaryBlue hover:bg-secondaryBlue rounded-full"
            >
                +
            </button>}
        </div>

        <BotaoAzul type={"submit"} text={"Salvar Alterações"} />
      </form>
        <BotaoVermelho onClick={handleDeleteProduto} type={"butotn"} text={"Excluir Produto"} /> 
    </div>

  );
}

export default InfoProdutoEditarExcluir;
