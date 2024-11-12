import ProdutoCard from "./ProdutoCard"
import VerMaisCard from "./VerMaisCard";

function formatSectionName(name){
  return name.padEnd(34, '.')
}

function SectionProd({ sectionName, productList }) {
    return (
      <>
        {/*<!-- SECÃO -->*/}
        <div class="md:p-4 mb-6 w-full overflow-hidden">
            <div class="w-full flex items-center mb-6 gap-3">
                <img src="images/arquivo.png" alt="" class="size-8"/>
                <h1 class="min-w-[300px] text-2xl font-semibold text-secondaryBlue"> {formatSectionName(sectionName)} </h1>
            </div>

            {/*<!-- PRODUTOS -->*/}
            <div class="scroll-produtos w-full overflow-x-auto flex justify-start items-center gap-6 p-4">
              {
                productList.map((produto, index) => (
                  <ProdutoCard key={index} prodName={produto.prodName} prodPrice={produto.prodPrice}/>
                ))
              }

              <VerMaisCard sectionName={sectionName}/>


            </div>
                    
        </div>
  
      </>
    );
  }
  
  export default SectionProd;
  