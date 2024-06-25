import React from 'react';
import Plot from 'react-plotly.js';

const HistogramPlot = ({ data }) => {
    // Extract and prepare data
    const sortedSpecializations = Object.entries(data)
        .sort((a, b) => b[1] - a[1]) // Sort by value descending
        .slice(0, 40); // Take top 15

    const xValues = sortedSpecializations.map(item => item[0]); // Specialization names
    const yValues = sortedSpecializations.map(item => item[1]); // Specialization values

    return (
        <Plot
        className='w-full'
            data={[
                {
                    x: xValues,
                    y: yValues,
                    type: 'bar',
                    marker: { color: 'rgba(23,87,126,1)' },
                }
            ]}
            layout={{
                autosize: true,
                title: 'Top 15 Specializations',
                xaxis: {
                    title: 'Specialization',
                    tickangle: -45,
                    automargin: true,
                },
                yaxis: {
                    title: 'Value'
                },
                margin: {
                    l: 50,
                    r: 50,
                    b: 150,
                    t: 50,
                    pad: 4
                },
                bargap: 0.05,
                
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default HistogramPlot;
