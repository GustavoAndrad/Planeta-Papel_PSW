import SheetStroke from "./SheetStroke";

function BoxResumo({data, metodo, total, user}){
    if(!user){
        return (
            <div className="h-fit min-w-[300px] mt-5 flex flex-col justify-center pl-6 bg-white">
                <h1 className="my-10 text-xl font-bold text-accentBlue">Realizado em: {data}</h1>
                <SheetStroke isWhiteBox={false}></SheetStroke>
                <h1 className="my-10 text-xl font-bold text-accentBlue">Método de Pagamento: {metodo}</h1>
                <SheetStroke isWhiteBox={false}></SheetStroke>
                <h1 className="my-10 text-xl font-bold text-accentBlue"> Total: R${total}</h1>
            </div>
        )
    }else{
        return (
            <div className="h-fit min-w-[300px] mt-5 flex flex-col justify-center pl-6 bg-white">
                <h1 className="my-10 text-xl font-bold text-accentBlue">Usuário: {user}</h1>
                <SheetStroke isWhiteBox={false}></SheetStroke>
                <h1 className="my-10 text-xl font-bold text-accentBlue">Realizado em: {data}</h1>
                <SheetStroke isWhiteBox={false}></SheetStroke>
                <h1 className="my-10 text-xl font-bold text-accentBlue">Método de Pagamento: {metodo}</h1>
                <SheetStroke isWhiteBox={false}></SheetStroke>
                <h1 className="my-10 text-xl font-bold text-accentBlue"> Total: R${total}</h1>
            </div>
        )
    }
}

export default BoxResumo;