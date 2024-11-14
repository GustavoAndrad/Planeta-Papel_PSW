function SheetStroke({isWhiteBox}) {
    if(isWhiteBox){
        return ( <hr class="mt-9 mb-8 opacity-[0.3] border-t-4 col border-red-400"/> );
    }else{
        return ( <hr class="mt-1 mb-1 opacity-[0.3] border-t-4 col border-red-400"/> );
    }
  }
  
  export default SheetStroke;