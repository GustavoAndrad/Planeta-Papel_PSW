import { useRef, useState, useEffect } from "react";
import ProdutoCard from "./ProdutoCard";
import VerMaisCard from "./VerMaisCard";
import { useNavigate } from 'react-router-dom';

function SectionProd(props) {
  const navigate = useNavigate();
  
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [visibleCount, setVisibleCount] = useState(6); // Quantidade inicial de produtos visiveis na seção

  const handleVerMais = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0); // Mostra seta esquerda se pode rolar para trás
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // Mostra seta direita se pode rolar para frente
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 245 * direction, behavior: "smooth" });
    }
  };


  useEffect(() => {
    checkScroll(); // Verifica se é possível rolar na inicialização

    const handleResize = () => {
      checkScroll();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Esse useEffect vai monitorar o resize

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const handleScrollEvent = () => {
        checkScroll();
      };

      scrollElement.addEventListener("scroll", handleScrollEvent);
      return () => {
        if (scrollElement) {
          scrollElement.removeEventListener("scroll", handleScrollEvent);
        }
      };
    }
  }, []); // Esse useEffect vai monitorar o scroll



  return (
    <div className="md:p-4 mb-6 w-full overflow-hidden">
      <div className="overflow-hidden w-full flex items-center mb-6 gap-3">
        <img src="images/arquivo.png" alt="" className="size-8" />
        <h1 className="w-auto text-2xl font-semibold text-secondaryBlue whitespace-nowrap">
          {props.sectionName}
        </h1>
        <div className="w-full h-full border-b-4 border-dotted border-secondaryBlue text-transparent"></div>
      </div>

      <div className="flex justify-center items-center">
        {/* Seta para a esquerda */}
        {canScrollLeft && (
          <div
            className="sticky cursor-pointer sm:ml-[-23px]"
            onClick={() => handleScroll(-1)}
          >
            <img
              className="size-8"
              alt="Seta para esquerda"
              src="images/seta_esquerda.png"
            />
          </div>
        )}

        {/* Lista de produtos rolável */}
        <div
          ref={scrollRef}
          className="scroll-produtos w-full overflow-x-auto flex justify-start items-center gap-6 p-4"
        >
        {props.productList.slice(0, visibleCount).map((produto, index) => (
          <ProdutoCard
            onClick={() => {
              navigate(`/produto/${produto.id}`);
            }}
            prodStandardImage={produto.imagem[0]}
            key={index}
            prodName={produto.nome}
            prodPrice={parseFloat(produto.preco)}
          />
        ))}
        {visibleCount < props.productList.length && ( // Só exibe o "Ver Mais" se ainda houver mais itens
          <VerMaisCard sectionName={props.sectionName} onClick={handleVerMais}/>
        )}
        </div>

        {/* Seta para a direita */}
        {canScrollRight && (
          <div
            className="animate-moveRight sticky cursor-pointer sm:mr-[-13px]"
            onClick={() => handleScroll(1)}
          >
            <img
              className="size-8"
              alt="Seta para direita"
              src="images/seta_direita.png"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionProd;
