import React from 'react';
import Plot from 'react-plotly.js';

const SankeyDiagram = ({ data }) => {
  const { required_specializations, scientists } = data;
  const scientistsSorted = [...scientists].sort((a, b) => b.weighted_score - a.weighted_score);
  const label = [...Object.keys(required_specializations), ...scientistsSorted.map(scientist => scientist.name)];

  let source = [];
  let target = [];
  let value = [];

  Object.entries(required_specializations).forEach(([field, textScore], index) => {
    scientistsSorted.forEach((scientist, i) => {
      if (scientist.expertises[field] !== undefined) {
        source.push(index);
        target.push(Object.keys(required_specializations).length + i);
        value.push(textScore * scientist.expertises[field]);
      }
    });
  });

  // Custom color palette
  const colors = ['#f8f3e8','#e6f8f6','#f8dbb8','#cde8e6','#f6c7b3','#5B96A9','#89cff0 ', '#9adedb ', '#99c5c4', '#aaf0d1', '#bdb0d0',"#c6a4a4",'#c1c6fc','#FAEDCB','#C9E4DE','#DBCDF0']; // Add more as needed

  return (
    <Plot
      className='w-full'
      data={[
        {
          type: 'sankey',
          orientation: 'h',
          node: {
            pad: 20,
            thickness: 30,
            line: {
              color: 'black',
              width: 0.5
            },
            label: label,
            color: label.map((_, i) => colors[i % colors.length]), // Cycle through colors
          },
          link: {
            source: source,
            target: target,
            value: value,
            color: source.map(index => colors[index % colors.length]), // Links match the color of the source node
          },
        },
      ]}
      layout={{
        title: 'Scientist Specializations and Weighted Scores',
        height: 800,
        font: {
          size: 16,
          family: 'Helvetica, sans-serif', // A more aesthetically pleasing font
        },
        plot_bgcolor: '#f3f3f3', // Light grey background for the plot area
        paper_bgcolor: '#ffffff', // White background outside the plot
      }}
    />
  );
};

export default SankeyDiagram;
