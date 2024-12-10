import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BotaoAzul from "../BotaoAzul";
import BotaoVermelho from "../BotaoVermelho"
import { useDispatch, useSelector } from "react-redux";
import {deleteProduto, fetchProdutos, produtoSelectors, updateProduto } from "../../redux/produtoSlice";
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

  useEffect(() => {
    if (prodStatus === "idle") {
      dispatch(fetchProdutos());
    }
  }, [dispatch, prodStatus]);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [qnt, setQnt] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([{ file: null, preview: null }]);
  const [categoria, setCategoria] = useState("");

  // Atualizar os campos com o produto selecionado
  useEffect(() => {
    if (produto) {
      setNome(produto.nome || "");
      setPreco(produto.preco?.toString() || "");
      setQnt(produto.qnt_disponivel?.toString() || "");
      setDescricao(produto.descricao || "");
      setCategoria(produto.categoria || "");
    }
  }, [produto]);


  const getCategorias = useCallback(() => {
    const categorias = new Set(); // Usando Set para evitar duplicatas
    produtos.forEach((produto) => {
      if (produto.categoria) {
        categorias.add(produto.categoria);
      }
    });
    return Array.from(categorias); // Converte Set para Array novamente
  }, [produtos]);

  function handleImageChange(e, index) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImagens = [...imagens];
        updatedImagens[index] = { file, preview: reader.result }; // Atualiza com o arquivo e o preview
        setImagens(updatedImagens);
      };
      reader.readAsDataURL(file); // Gera o preview
    }
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

  function addImage() {
    if(imagens.length<4 && imagens[imagens.length-1].file){
      setImagens([...imagens, { file: null, preview: null }]); // Adiciona um novo campo vazio
    }
  }

  function removeImage(index) {
    if(imagens.length>1){
      const updatedImagens = imagens.filter((_, i) => i !== index);
      setImagens(updatedImagens);
    } else if(imagens.length===1){
      setImagens([{ file: null, preview: null }]); // Adiciona um novo campo vazio
    }
  }

  async function processImage(){
    const formData = new FormData();
  
    imagens.forEach(({ file }) => {
      if (file) {
        formData.append("images", file); // Adiciona o arquivo ao FormData
      }
    });
  
    try {

      if (formData.getAll("images").length === 0) {
        console.error("Nenhuma imagem foi adicionada!");
        throw new Error("Imagem sem adição. Imagem padrão será adicionada");
      }
    
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error("Erro do servidor:", error.message || "Erro desconhecido");
        throw new Error("Erro ao adicionar imagens selecionadas. Imagem padrão será adicionada");
      }
  
      const data = await response.json();

      return data.paths.map((img) => img.url);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      toast.warning(error.message);

      return ["/images/prod.png"];
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if(confirm("Alterar Permanentemente?")){
      
      let paths
      if(imagens[0].file){
        paths = await processImage(); //retornar a imagem padrão quando falha em processar
      } else{
        paths = produto.imagem
      }
      
      const produtoData = {
        id,
        nome,
        preco: parseFloat(preco),
        descricao,
        imagem: paths,
        qnt_disponivel: parseInt(qnt),
        categoria,
      };

      try{
        await produtoValidationSchema.validate(produtoData, { abortEarly: false });
      } catch(e){
        e.inner.forEach((err) => {
          toast.error(`${err.message}`);
        });
        return
      }
      
      const prod = await dispatch(updateProduto(produtoData));
  
      // Limpar formulário após envio
      setNome("");
      setPreco("");
      setDescricao("");
      setCategoria("");
      setImagens([]);
      setQnt("");
  
      navigate(`/produto/${prod.payload.id}`);
    }

  };

  const handleDeleteProduto = async ()=>{
    // eslint-disable-next-line no-restricted-globals
    if(confirm("Excluir PERMANENTEMENTE?")){

      dispatch(deleteProduto(id));
      navigate("/");
    } else{
      return
    }
  }

  // Lidar com estados de carregamento ou erro
  if (prodStatus === "pending") {
    return (
      <>
      <div className="pt-24 w-full h-full flex items-center justify-center">
        <Loader></Loader>
      </div>
      </>
    )
  }
  
  if (prodStatus === "failed" || !produto) {
    return (
      <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10 text-center text-red-600 font-bold">
        Erro ao carregar informações do produto<br></br> Código buscado: {id}
      </div>
    )
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
          ⚡ Por segurança, as imagens não podem ser alteradas. Caso queira modificá-las, inicialize todas novamente
        </span>

        {/* Inputs para imagens */}
        <div className="mb-12 mt-2 gap-5 grid lg:grid-cols-4 sm:grid-cols-2 items-center">
          {imagens.map((imagem, index) => (
            <div key={index} className="relative">

            {imagem.preview && (
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

                {imagem.preview && (<>
                  <img
                    className="size-20 border-blue-500 border-4 rounded-md"
                    src={imagem.preview}
                    alt="Preview"
                  />
                  </>
                )}
                {imagem.file ? imagem.file.name : "📁 Selecionar imagem substituta"}
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
