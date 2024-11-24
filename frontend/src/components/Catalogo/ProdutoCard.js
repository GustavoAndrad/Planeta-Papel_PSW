
function ProdutoCard(props) {
    return (
      <>
        <div onClick={props.onClick} title={`${props.prodName}`} className="min-w-[200px] bg-white rounded-lg shadow-md flex-shrink-0 cursor-pointer">
            <div className="flex flex-col items-center p-4">
                <div className="mb-4">
                    <img src={`${props.prodStandardImage}`} alt={`${props.prodName}`} className="w-32 h-32 object-cover"/>
                </div>
                <div className="text-center">
                    <span className="text-gray-800 font-semibold block max-w-[150px] truncate">{props.prodName}</span>
                    <span className="text-gray-500 font-bold">R$ {props.prodPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>   
  
      </>
    );
  }
  
  export default ProdutoCard;
  