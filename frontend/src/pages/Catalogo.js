import SectionProd from "../components/Catalogo/SectionProd";
import SearchBar from "../components/Catalogo/SearchBar";
import StrokeLine from "../components/Catalogo/StrokeLine";
import Propaganda from "../components/Catalogo/Propaganda"

function Catalogo() {

  const sectionsName = ["Folhas", "Papéis", "Cartolinas", "Post-it"];
  const products = [
    [
      { prodName: "Produto A", prodPrice: 10.50 },
      { prodName: "Produto B", prodPrice: 10 },
      { prodName: "Produto C", prodPrice: 15.30 },
      { prodName: "Produto D", prodPrice: 12.99 },
      { prodName: "Produto E", prodPrice: 8.75 },
      { prodName: "Produto F", prodPrice: 22.40 },
      { prodName: "Produto G", prodPrice: 5.60 }
    ],
    [
      { prodName: "Produto H", prodPrice: 13.50 },
      { prodName: "Produto I", prodPrice: 20 },
      { prodName: "Produto J", prodPrice: 25.15 },
      { prodName: "Produto K", prodPrice: 9.99 },
      { prodName: "Produto L", prodPrice: 17.10 },
      { prodName: "Produto M", prodPrice: 14.25 },
      { prodName: "Produto N", prodPrice: 18.75 }
    ],
    [
      { prodName: "Produto O", prodPrice: 30.50 },
      { prodName: "Produto P", prodPrice: 27 },
      { prodName: "Produto Q", prodPrice: 11.20 },
      { prodName: "Produto R", prodPrice: 16.99 },
      { prodName: "Produto S", prodPrice: 19.30 },
      { prodName: "Produto T", prodPrice: 8.45 },
      { prodName: "Produto U", prodPrice: 13.85 }
    ],
    [
      { prodName: "Produto V", prodPrice: 10.70 },
      { prodName: "Produto W", prodPrice: 9.40 },
      { prodName: "Produto X", prodPrice: 14.60 },
      { prodName: "Produto Y", prodPrice: 18 },
      { prodName: "Produto Z", prodPrice: 7.30 },
      { prodName: "Produto AA", prodPrice: 23.90 },
      { prodName: "Produto AB", prodPrice: 21.40 }
    ]
  ];
  const possiveisPropagandas = [
    {plano: "A4", desconto: 15},
    {plano: "Cartolina", desconto: 20},
    {plano: "Post-it", desconto: 10},
  ]
  let propagandasMostradas = -1;

    
  return (
    <>
      <SearchBar />
      
      <StrokeLine />

      {
        sectionsName.map((section, index) => {
          const renderPropaganda = index > 1 && index % 2 === 0;

          if (renderPropaganda && propagandasMostradas < possiveisPropagandas.length) {
            propagandasMostradas++;
          }

          return (
            <>
              {renderPropaganda && propagandasMostradas < possiveisPropagandas.length && (
                <Propaganda
                  planoName={possiveisPropagandas[propagandasMostradas].plano}
                  desconto={possiveisPropagandas[propagandasMostradas].desconto}
                />
              )}

              {/* Sempre exibe a seção */}
              <SectionProd key={index} sectionName={section} productList={products[index]} />
            </>
          );
        })
      }



    </>
  );
}

export default Catalogo;