
function Propaganda({planoName, desconto}) {

    return (
      <>
        <div className="mt-[3rem] mb-[3rem] w-full h-32 flex justify-center items-center cursor-pointer"> 
            <div className="bg-primaryBlue min-w-[300px] w-2/3 h-full rounded-3xl flex justify-center items-center">
                <div className="w-1/2 h-full border-r-white border-r-4 flex items-center justify-center text-3xl text-white font-bold text-center">
                    PLANO {planoName.toString().toUpperCase()}
                </div>
                <div className="w-1/2 h-full flex items-center justify-center text-center">
                    <div>
                        <span className="text-white font-bold lg:text-xl text-md"> Ganhe {parseInt(desconto)}% de desconto </span>
                        <br/> 
                        <span className="text-black lg:text-md text-sm font-bold">Clique e saiba mais!</span>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }
  
  export default Propaganda;
  