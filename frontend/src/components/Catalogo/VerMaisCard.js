
function VerMaisCard({sectionName}) {
    return (
      <>
        <div class="min-w-[200px] h-[220px] bg-accentBlue rounded-lg shadow-md flex-shrink-0 flex justify-center items-center cursor-pointer">
            <div class="flex flex-col items-center p-4">
                <div class="mb-4">
                    <img src="images/mais.png" alt="Mais" class="prod w-18 h-18 object-cover"/>
                </div>
                <div class="text-center">
                    <span class="text-white font-semibold block text-xl"> Ver mais de <span class="text-primaryBlue"> {sectionName} </span></span>
                </div>
            </div>
        </div> 
      </>
    );
  }
  
  export default VerMaisCard;
  