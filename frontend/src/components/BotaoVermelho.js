export default function BotaoVermelho({text, onClick, type}){
    return(<button 
        type={type}
        onClick={onClick}
        className="bg-cancelRed hover:bg-red-700 text-white p-3 rounded-full w-full mt-4 font-medium text-2xl shadow-md"
        >
            {text}
        </button>)
}