import ItemPedido from "./ItemPedido";
import SheetStroke from "./SheetStroke";

function WhiteBox({ itemPedidos }) {
    return (
        <div className="w-full h-fit min-w-[300px] mt-5 flex flex-col justify-center pl-6 bg-white">
            {itemPedidos.map((item, index) => {    
                return (
                    <>
                    <ItemPedido
                        nome={item.prodName} 
                        qt={item.prodQt} 
                        total={item.prodTotal} 
                        />
                    <SheetStroke isWhiteBox={true}></SheetStroke>
                    </>
                );
            })}
        </div>
    );
}

export default WhiteBox;