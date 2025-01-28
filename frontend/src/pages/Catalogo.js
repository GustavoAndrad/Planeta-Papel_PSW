import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProdutos, produtoSelectors } from "../redux/produtoSlice";
import { fetchPlanos, planoSelectors } from "../redux/planoSlice";

import SectionProd from "../components/Catalogo/SectionProd";
import SearchBar from "../components/Catalogo/SearchBar";
import StrokeLine from "../components/Catalogo/StrokeLine";
import Propaganda from "../components/Catalogo/Propaganda";
import Loader from "../components/Loader";

function Catalogo() {
  const dispatch = useDispatch();

  // Informações consumidas
  const produtos = useSelector(produtoSelectors.selectAll);

  const prodStatus = useSelector((state) => state.produtos.status);
  const planos = useSelector(planoSelectors.selectAll);
  const planoStatus = useSelector((state) => state.planos.status);

  // Informações tratadas
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  // Parâmetros de busca
  const [searchParams] = useSearchParams();
  const categoriaFiltro = searchParams.get("categoria");
  const produtoFiltro = searchParams.get("produto");

  // Controlador de recorrência das propagandas
  let qntPropagandasMostradas = -1;
  
  
  const getCategorias = useCallback((produtos, categoriaExtra) => {
    const categorias = new Set(); // Usando Set para evitar duplicatas
  
    if (categoriaExtra) {
      categorias.add(categoriaExtra);
    }
  
    produtos.forEach(produto => {
      if (produto.categoria) {
        categorias.add(produto.categoria);
      }
    });
  
    return Array.from(categorias); // Converte Set para Array novamente
  }, []);
  

  const aplicaFiltroProdutos = useCallback((produtos_agrupados) => {
    return produtos_agrupados
      .filter((section) =>
        categoriaFiltro 
          ? section.categoria === categoriaFiltro // Aplica o filtro de categoria, se houver
          : true // Se não tive filtro, mantém todas as categorias
      )
      .map((categoria) => ({
        categoria: categoria.categoria,
        lista: categoria.lista.filter((produto) =>
          produtoFiltro
            ? produto.nome.toLowerCase().includes(produtoFiltro.toLowerCase()) // Aplica o filtro de produto, se houver
            : true // Caso contrário, mantém todos os produtos
        ),
      }))
      .filter((categoria) => categoria.lista.length > 0 || !produtoFiltro); // Remove categorias vazias apenas se houver filtro de produto
  }, [categoriaFiltro, produtoFiltro]);

  const getProdutosFiltrados = useCallback((produtos) => {
    const categorias = getCategorias(produtos);
    const produtos_agrupados = [];
  
    categorias.forEach((categoria) => {
      produtos_agrupados.push({
        categoria: categoria,
        lista: []
      });
    });
  
    // Itera sobre os produtos e agrupa-os por categoria
    produtos.forEach((produto) => {
      const categoriaIndex = produtos_agrupados.findIndex((item) => item.categoria === produto.categoria);
  
      // Verifica se a categoria existe
      if (categoriaIndex !== -1) {
        produtos_agrupados[categoriaIndex].lista.push({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          descricao: produto.descricao,
          imagem: produto.imagem,
          qnt_disponivel: produto.qnt_disponivel
        });
      }
    });
  
    return aplicaFiltroProdutos(produtos_agrupados);
  }, [aplicaFiltroProdutos, getCategorias]); // Passa as versões memoizadas como dependências
  
  // Atualizando os produtos filtrados quando os produtos chegam
  useEffect(() => {
    if (produtos.length > 0) {
      setProdutosFiltrados(getProdutosFiltrados(produtos));
    }
  }, [produtos, getProdutosFiltrados]);
  
  // Consumindo informações
  useEffect(() => {
    if (planoStatus === "idle") {
      dispatch(fetchPlanos());
    }
    if (prodStatus === "idle") {
      dispatch(fetchProdutos());
    }
  }, [dispatch, prodStatus, planoStatus]);

  
  // Lidar com estados de carregamento ou erro
  if (prodStatus === "pending" || planoStatus === "pending") {
    return (
      <>
      <div className="pt-24 w-full h-full flex items-center justify-center">
        <Loader></Loader>
      </div>
      </>
    )
  }
  
  if (prodStatus === "rejected" || planoStatus === "rejected") {
    return (
      <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10 text-center text-red-600 font-bold">
        Erro ao carregar informações do catálogo.<br></br> Experimente recarregar a página.
      </div>
    )
  }

  return (
    <>
      <SearchBar categorias={getCategorias(produtos, "Todos as Categorias")} />

      <StrokeLine />

      {produtosFiltrados.map((section, index) => {
        const renderPropaganda = index > 1 && index % 2 === 0;
        if (renderPropaganda) {
          qntPropagandasMostradas++;
        }
        return (
          <div key={`section-${index}`}>
            {renderPropaganda ? (
              <Propaganda
                planoName={planos[qntPropagandasMostradas]?.nome}
                desconto={planos[qntPropagandasMostradas]?.desconto}
              />
            ) : null}

            <SectionProd sectionName={section.categoria} productList={section.lista} />
          </div>
        );
      })}
    </>
  );
}

export default Catalogo;
