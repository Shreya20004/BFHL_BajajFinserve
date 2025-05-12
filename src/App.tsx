import React, { useState } from 'react';
import Select from 'react-select';
import { AlertCircle, Code2, Cpu, Award, Braces } from 'lucide-react';
import { BFHLRequest, BFHLResponse, FilterOption, API_URL } from './types';

const filterOptions = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState<BFHLResponse | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateAndProcessInput = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      let parsed: BFHLRequest;
      try {
        parsed = JSON.parse(jsonInput) as BFHLRequest;
      } catch (e) {
        throw new Error('Invalid JSON format. Please check your input.');
      }
      
      if (!parsed.data || !Array.isArray(parsed.data)) {
        throw new Error('Input must contain a "data" array');
      }

      if (!parsed.data.every(item => typeof item === 'string')) {
        throw new Error('All items in data array must be strings');
      }

      const response = await fetch(`${API_URL}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed)
      });

      if (!response.ok) {
        if (response.status === 0) {
          throw new Error('Network error: Unable to reach the server. Please check your internet connection and try again.');
        }
        
        let errorMessage: string;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || `Server error (${response.status})`;
        } catch {
          errorMessage = `Server error (${response.status}): ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response format from server');
      }
      
      setResponse(result);
      setSelectedFilters(['numbers', 'alphabets', 'highest_alphabet']);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An unexpected error occurred while processing your request';
      console.error('Error processing request:', errorMessage);
      setError(errorMessage);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    return (
      <div className="mt-6 space-y-4">
        {selectedFilters.includes('numbers') && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-gray-900">Numbers</h3>
            </div>
            <p className="mt-1 font-mono bg-gray-50 p-2 rounded text-gray-700">
              [{response.numbers.join(', ')}]
            </p>
          </div>
        )}
        {selectedFilters.includes('alphabets') && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Braces className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold text-gray-900">Alphabets</h3>
            </div>
            <p className="mt-1 font-mono bg-gray-50 p-2 rounded text-gray-700">
              [{response.alphabets.join(', ')}]
            </p>
          </div>
        )}
        {selectedFilters.includes('highest_alphabet') && response.highest_alphabet.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-gray-900">Highest Alphabet</h3>
            </div>
            <p className="mt-1 font-mono bg-gray-50 p-2 rounded text-gray-700">
              [{response.highest_alphabet.join(', ')}]
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Cpu className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">BFHL Data Processor</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">
                JSON Input
              </label>
              <div className="relative">
                <textarea
                  id="json-input"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"data": ["M","1","334","4","B"]}'
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => setJsonInput('{"data": ["M","1","334","4","B"]}')}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded"
                  >
                    Sample
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-3 text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <button
              onClick={validateAndProcessInput}
              disabled={isLoading}
              className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Processing...' : 'Process Data'}
            </button>

            {response && (
              <div className="space-y-6 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter Response
                  </label>
                  <Select
                    isMulti
                    options={filterOptions}
                    value={filterOptions.filter(option => 
                      selectedFilters.includes(option.value as FilterOption)
                    )}
                    onChange={(selected) => 
                      setSelectedFilters(selected.map(option => option.value as FilterOption))
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#4f46e5',
                        primary75: '#6366f1',
                        primary50: '#818cf8',
                        primary25: '#e0e7ff',
                      },
                    })}
                  />
                </div>
                
                {renderFilteredResponse()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;