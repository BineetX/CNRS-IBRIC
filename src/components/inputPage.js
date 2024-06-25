import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SankeyDiagram from "../util/SankeyDiagram"
import AnimatedLoading from '../util/LoadingAnimation';
import ForceDirectedGraph from '../util/ForceDirectedGraph';
import Network3DDiagram from '../util/Network';
import ForceGraph from 'react-force-graph-3d';
import ForceGraph3DComponent from '../util/Shanky3d';
import HistogramPlot from '../util/histogram';
import HorizontalBarPlot from '../util/barPlot';

function InputPage() {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [numberOfScientists, setNumberOfScientists] = useState(5);


    const handleSubmit = async (e) => {
        setData(null)
        e.preventDefault();
        setIsLoading(true); // Start loading
        try {
            const response = await axios.post('https://cnrs.ibric.in/api/SRS', { "paragraph": text, 'group_size': numberOfScientists });
            // navigate('/output', { state: { text: response.data } });
            setData(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
        setIsLoading(false); // End loading
    };

    const LoadingPhrases = [
        [{ text: 'Generating the best scientist collaberation recommendations based of the ' }, { text: 'INPUT PROPOSAL', highlight: true }],
        [{ text: 'We are analyzing not only the' }, { text: ' CONTENT ', highlight: true }, { text: 'but also the' }, { text: ' CONTEXT', highlight: true }],
        [{ text: 'Please stay' }, { text: ' CALM ', highlight: true }, { text: 'the results are on the way' }],
        [{ text: 'The result will be much' }, { text: ' FASTER ', highlight: true }, { text: 'on a' }, { text: ' FASTER COMPUTER ', highlight: true }],


    ];


    return (
        <div className="pt-4">
            <div className='p-5'>
                <h1 className='text-3xl font-bold text-center text-cyan-700'>Scientists Recommendation System</h1>
                <h2 className='text-xl text-center text-cyan-700'>-Prototype-</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center p-8 space-y-4 bg-white rounded-lg ">
                <textarea
                    className="w-2/3 p-2 border rounded"
                    rows="4"
                    placeholder="Please enter the proposal here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isLoading} // Disable textarea when loading
                ></textarea>
                <div className="flex justify-center w-2/3">
                    <label className="flex items-center space-x-2">
                        <span>Number of Scientists:</span>
                        <input
                            type="number"
                            className="w-16 p-1 text-center border rounded shadow-sm"
                            value={numberOfScientists}
                            onChange={(e) => setNumberOfScientists(e.target.value)}
                            min="1" 
                            disabled={isLoading} 
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className={`px-4 py-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-800'} text-white rounded shadow`}
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? 'Generating...' : 'Generate Recommendation'}
                </button>
            </form>
            <div className='w-full gap-10 px-5 py-5 text-center'>
                {data ? <div >
                    {/* <HistogramPlot data={data.required_specializations}/> */}
                    

                    <SankeyDiagram data={data} />

                    <div className='flex flex-row gap-5 shadow-lg rounded-xl'>
                        <div className='w-2/3 p-8 text-lg rounded-lg '>
                            <h2 className='text-xl font-bold text-gray-500'>Proposal Text</h2>
                            <div className='p-5 pt-10 text-justify'>
                                {text}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center w-1/3 p-4">
                            <h2 className='text-xl font-bold text-gray-500'>Recommneded Scientiest</h2>
                            <div className='flex flex-col justify-around gap-4 p-4'>
                                {data.scientists.map((scientist, index) => (
                                    <div key={index} className="p-4 font-bold bg-gray-100 rounded-lg shadow text-cyan-900">
                                        {scientist.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <ForceGraph3DComponent data={data} />
                    <HorizontalBarPlot data={data.required_specializations}/>
                    
                    {/* <ForceDirectedGraph data={data} /> */}
                    {/* <Network3DDiagram data={data} /> */}
                    
     
                </div> : <div>{isLoading ? <AnimatedLoading className={'bg-black'} phrases={LoadingPhrases} /> : ""}</div>}
            </div>


        </div>
    );
}

export default InputPage;
