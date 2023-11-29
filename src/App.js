import React, { useState, useEffect } from 'react';
import { analyzeImage, isConfigured as isImageAnalysisConfigured } from './azure-image-analysis';
import { generateImage, isConfigured as isImageGenerationConfigured  } from './azure-image-generation'; 

function DisplayResults({ imageUrl, analysisResult}) {
  return (
    <div>
      <p>{imageUrl}</p>
      <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
    </div>
  );
}

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    if (isImageAnalysisConfigured() && isImageGenerationConfigured()) {
      setIsConfigured(true);
    }
  }, []);

  if (!isConfigured) {
    return <p>Key and/or endpoint not configured for cognitive services.</p>;
  }
  
  const handleImageAnalysis = async() => {
    // Lógica para el análisis de imágenes
    try {
      const result = await analyzeImage(imageUrl);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageGeneration = async () => {
    setIsGenerating(true);
    try {
      const data = await generateImage(imageUrl);
      const generatedImage = data.data[0].url;
      setImageUrl(generatedImage);
      setAnalysisResult(data)
    } catch (error) {
      console.error(error);
    }
    setIsGenerating(false);
  };

  return (
    <div>
      <h1>Computer vision</h1>
      <input 
        type="text" 
        value={imageUrl} 
        onChange={e => setImageUrl(e.target.value)} 
        placeholder="Insert URL or type prompt"
      />
      <button onClick={handleImageAnalysis}>Analyze</button>
      <button onClick={handleImageGeneration} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>
      <DisplayResults imageUrl={imageUrl} analysisResult={analysisResult} />
    </div>
  );
}

export default App;