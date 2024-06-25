import React, { useState, useEffect } from 'react';

const AnimatedLoading = ({ phrases }) => {
    const [loadingPhrase, setLoadingPhrase] = useState([]);

    useEffect(() => {
        let phraseIndex = 0;
        const intervalId = setInterval(() => {
            
            const currentPhraseParts = phrases[phraseIndex % phrases.length].map((part) =>
                part.highlight ? (
                    <span key={part.text} className="text-4xl font-bold text-cyan-700">{part.text}</span>
                ) : (
                    part.text
                )
            );

            setLoadingPhrase(currentPhraseParts);
            phraseIndex++;
        }, 4000); 

        return () => clearInterval(intervalId);
    }, [phrases]);

    return <div className='p-5 pt-10 text-3xl text-orange-400'>{loadingPhrase}</div>;
};

export default AnimatedLoading;

