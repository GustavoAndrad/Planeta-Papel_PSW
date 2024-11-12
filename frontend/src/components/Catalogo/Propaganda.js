
function Propaganda({planoName, desconto}) {

    return (
      <>
        <div class="mt-[3rem] mb-[3rem] w-full h-32 flex justify-center items-center cursor-pointer"> 
            <div class="bg-primaryBlue min-w-[300px] w-2/3 h-full rounded-3xl flex justify-center items-center">
                <div class="w-1/2 h-full border-r-white border-r-4 flex items-center justify-center text-3xl text-white font-bold text-center">
                    PLANO {planoName.toString().toUpperCase()}
                </div>
                <div class="w-1/2 h-full flex items-center justify-center text-center">
                    <div>
                        <span class="text-white font-bold lg:text-xl text-md"> Ganhe {parseInt(desconto)}% de desconto </span>
                        <br/> 
                        <span class="text-black lg:text-md text-sm font-bold">Clique e saiba mais!</span>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }
  
  export default Propaganda;
  