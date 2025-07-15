import { useState, useEffect } from "react";

export default function RequestProcessing({user_id, request_id, hidden=true}) {

  const [isHidden, setIsHidden] = useState(hidden);
  const queueLength = 1
  
  const handleCancel = async () => {
  }

  const handleClose = () => {
    let requestProcessing = document.getElementById("request-processing");
    requestProcessing.classList.add("opacity-0");
    setTimeout(() => {
      requestProcessing.classList.add("hidden");
    }, 100);
  }

  return (
    <div id="request-processing" className={`fixed left-0 top-0 bg-gray-400 w-screen h-screen flex justify-center items-center transition-opacity transition-opacity ease-in-out duration-100`}>
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-88" >
        <svg className="flex self-end size-8 text-gray-300 cursor-pointer m-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" onClick={handleClose}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

        <svg className="animate-spin h-13 w-13 mb-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-50" cx="12" cy="12" r="10" stroke="lightgray" strokeWidth="4"></circle>
            <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <p className="text-gray-600 text-lg font-bold mb-4">Aguarde...</p>
        <p className="text-gray-600 mb-4 text-center">{'Sua solicitação é a '}
        <span className="text-red-400 font-bold">{queueLength}ª</span>
        {' da fila'}</p>
        <p className="text-gray-600 text-center mb-6 ml-4 mr-4">Você possui outras solicitações pendentes</p>
        <button type="button" onClick={handleCancel} className="bg-yellow-400 cursor-pointer p-2 rounded w-40 mb-4">
          Cancelar
        </button>
      </div>
    </div>
  );
}