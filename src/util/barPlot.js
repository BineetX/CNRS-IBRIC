import React from 'react';
import Plot from 'react-plotly.js';

const HorizontalBarPlot = ({ data }) => {
  // Extract and prepare data
  const sortedSpecializations = Object.entries(data)
    .sort((a, b) => b[1] - a[1]) // Sort by value descending
    .slice(0, 20); // Take top 20 (adjusted comment to match the slice)

  // Reverse the arrays to make the highest values appear at the top of the plot
  const yValues = sortedSpecializations.map(item => item[0]);
  const xValues = sortedSpecializations.map(item => item[1]);

  return (
    <div className="w-full">
      <Plot
        data={[
          {
            y: yValues,
            x: xValues,
            type: 'bar',
            orientation: 'h', // Specify horizontal bar orientation
            marker: { color: 'rgba(23,87,126,1)' },
          }
        ]}
        layout={{
          autosize: true, // Enable autosizing to fit the container
          title: 'Top 20 Specializations',
          xaxis: {
            title: 'Value',
            automargin: true,
          },
          yaxis: {
            title: 'Specialization',
            automargin: true,
            autorange: 'reversed' // This ensures the top value is highest
          },
          margin: {
            l: 150, // Adjusted for label space
            r: 50,
            b: 50,
            t: 50,
            pad: 4
          },
          bargap: 0.1,
        }}
        useResizeHandler={true} // Enable resize handler
        style={{ width: "100%", height: "100%" }} // Make plot fill the container
      />
    </div>
  );
};

export default HorizontalBarPlot;
