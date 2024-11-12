
function ProdutoCard({prodName, prodPrice}) {
    return (
      <>
        <div class="min-w-[200px] bg-white rounded-lg shadow-md flex-shrink-0 cursor-pointer">
            <div class="flex flex-col items-center p-4">
                <div class="mb-4">
                    <img src="images/prod.png" alt="Produto" class="w-32 h-32 object-cover"/>
                </div>
                <div class="text-center">
                    <span class="text-gray-800 font-semibold block max-w-[150px] truncate">{prodName}</span>
                    <span class="text-gray-500 font-bold">R$ {prodPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>   
  
      </>
    );
  }
  
  export default ProdutoCard;
  