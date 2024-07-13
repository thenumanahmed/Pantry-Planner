import React, { useState } from 'react';

const AiSuggestionModal = ({ closeAiSuggestionModal }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState(null);

  const getAISuggestion = async () => {
    // setLoading(true);
    // setError(null);

    // try {
    //   const res = await fetch('/api/getAISuggestion', {
    //     method: 'POST', // Adjust the method if needed
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   if (!res.ok) {
    //     throw new Error('Failed to fetch AI suggestion');
    //   }

    //   const data = await res.json();
    //   setSuggestion(data.choices?.[0]?.message?.content || 'No suggestion available');
    // } catch (err) {
    //   setError(err.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  // Trigger fetching AI suggestion when the modal opens
  useState(() => {
    getAISuggestion();
  }, []);

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
      onClick={closeAiSuggestionModal}
      id='blurred-bg'
    >
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
        <h1 className='text-xl font-bold mb-4'>AI Suggestions</h1>

        {loading && <p>Loading suggestions...</p>}
        {error && <p className='text-red-500'>Error: {error}</p>}
        {suggestion && <p>{suggestion}</p>}

        <button
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
          onClick={closeAiSuggestionModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AiSuggestionModal;
