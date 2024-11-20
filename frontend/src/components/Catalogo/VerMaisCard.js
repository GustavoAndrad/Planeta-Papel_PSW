
function VerMaisCard({sectionName}) {
    return (
      <>
        <div className="min-w-[200px] h-[220px] bg-accentBlue rounded-lg shadow-md flex-shrink-0 flex justify-center items-center cursor-pointer">
            <div className="flex flex-col items-center p-4">
                <div className="mb-4">
                    <img src="images/mais.png" alt="Mais" className="prod w-18 h-18 object-cover"/>
                </div>
                <div className="text-center">
                    <span className="text-white font-semibold block text-xl"> Ver mais de <span className="text-primaryBlue"> {sectionName} </span></span>
                </div>
            </div>
        </div> 
      </>
    );
  }
  
  export default VerMaisCard;
  