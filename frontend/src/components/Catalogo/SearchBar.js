import { useState } from 'react';

function SearchBar(props) {

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCategoryChange = (categoria) => {
    setSelectedCategory(categoria);
  };


  function handleSearch(e) {
    e.preventDefault();
  
    let searchUrl = "/catalogo";
  
    // Se uma categoria for selecionada, adiciona à URL
    if (selectedCategory) {
      searchUrl += `?categoria=${selectedCategory}`;
    }
  
    // Se um valor de busca for fornecido, adiciona à URL
    if (searchValue) {
      // Verifica se já existe um parâmetro na URL
      if (selectedCategory) {
        searchUrl += `&produto=${searchValue}`;
      } else {
        searchUrl += `?produto=${searchValue}`;
      }
    }
  
    window.location = searchUrl;
  }

  return (
    <>
      <form className="w-full max-w-[1200px] mx-auto">
        <div className="flex">
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="bg-secondaryBlue border-accentBlue flex-shrink-0 z-[5] inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            <span className="text-white font-bold">Procurar em</span>
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
              {props.categorias.map((categoria) => {
                return (
                  <li
                    key={categoria}
                    onClick={() => handleCategoryChange(categoria)}
                  >
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:text-primaryBlue dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {categoria}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              value={searchValue} // Vincula o input ao estado
              onChange={handleInputChange} // Atualiza o estado quando o valor do input muda
              className="overflow-hidden whitespace-nowrap text-ellipsis block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder={`Buscar por produtos ${(selectedCategory!=="")?"em "+selectedCategory:""} ...`}
              required
            />

            <button
              type="submit"
              onClick={handleSearch}
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg border border-blue-700 hover:bg-primaryBlue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primaryBlue dark:hover:bg-primaryBlue bg-secondaryBlue dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
