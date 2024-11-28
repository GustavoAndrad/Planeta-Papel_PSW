export default function BotaoBranco({text, onClick, type}){
    return(<button 
        type={type}
        onClick={onClick}
        className="flex p-3 mt-4 w-full justify-center text-2xl font-medium bg-white text-primaryBlue rounded-full border-2 border-primaryBlue shadow-md hover:bg-secondaryBlue hover:text-white hover:border-accentBlue"
        >
            {text}
        </button>)
}