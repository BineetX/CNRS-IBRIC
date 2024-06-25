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
      if(scientist.expertises[field] !== undefined) {
        source.push(index); 
        target.push(Object.keys(required_specializations).length + i); 
        value.push(textScore * scientist.expertises[field]);
      }
    });
  });

  return (
    <Plot className='w-full'
      data={[
        {
          type: 'sankey',
          orientation: 'h',
          node: {
            pad: 15,
            thickness: 20,
            line: {
              color: 'black',
              width: 0.5
            },
            label: label,
          },
          link: {
            source: source,
            target: target,
            value: value,
          },
        },
      ]}
      layout={{
        title: 'Scientist Specializations and Weighted Scores',
        height: 800,
        font: {
          size: 14,
        },
      }}
    />
  );
};

export default SankeyDiagram;
