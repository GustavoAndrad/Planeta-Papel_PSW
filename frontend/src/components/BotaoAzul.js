export default function BotaoAzul({text, onClick, type}){
    return(<button 
        type={type}
        onClick={onClick}
        className="flex p-3 mt-4 w-full justify-center text-2xl font-medium bg-primaryBlue text-white rounded-full hover:bg-secondaryBlue shadow-md"
        >
            {text}
        </button>)
}