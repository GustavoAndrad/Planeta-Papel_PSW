
function SearchBar() {
    return (
      <>
          <form class="w-full max-w-[1200px] mx-auto">
          <div class="flex">
              <button id="dropdown-button1" data-dropdown-toggle="dropdown" class="bg-secondaryBlue border-accentBlue flex-shrink-0 z-[5] inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                  <span class="text-white font-bold">Preço</span>
                  <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
              </button>
              <button id="dropdown-button2" data-dropdown-toggle="dropdown" class="bg-secondaryBlue border-accentBlue flex-shrink-0 z-[5] inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                  <span class="text-white font-bold">Data</span>
                  <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
              </button>
  
              <div id="dropdown1" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                      <li>
                          <button type="button" class="inline-flex w-full px-4 py-2 hover:text-primaryBlue dark:hover:bg-gray-600 dark:hover:text-white">Maior valor</button>
                      </li>
                      <li>
                          <button type="button" class="inline-flex w-full px-4 py-2 hover:text-primaryBlue dark:hover:bg-gray-600 dark:hover:text-white">Menor valor</button>
                      </li>
                  </ul>
              </div>
              
              <div id="dropdown2" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                      <li>
                          <button type="button" class="inline-flex w-full px-4 py-2 hover:text-primaryBlue dark:hover:bg-gray-600 dark:hover:text-white">Mais recente</button>
                      </li>
                      <li>
                          <button type="button" class="inline-flex w-full px-4 py-2 hover:text-primaryBlue dark:hover:bg-gray-600 dark:hover:text-white">Mais antigo</button>
                      </li>
                  </ul>
              </div>
              
              <div class="relative w-full">
                  <input type="search" id="search-dropdown" class="overflow-hidden whitespace-nowrap text-ellipsis block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                  placeholder="Procurar pedido" required />
  
                  <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg border border-blue-700 hover:bg-primaryBlue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primaryBlue dark:hover:bg-primaryBlue bg-secondaryBlue dark:focus:ring-blue-800">
                      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </button>
              </div>
          </div>
      </form>
  
      </>
    );
  }
  
  export default SearchBar;
  