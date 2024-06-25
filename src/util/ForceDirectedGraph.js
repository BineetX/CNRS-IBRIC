import React, { useRef, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

const ForceDirectedGraph = ({ data }) => {
  const { required_specializations, scientists } = data;
  const containerRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  // Adjust the width dynamically
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once initially to set the width

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Define nodes and links
  const nodes = [];
  const links = [];

  // Create nodes for specializations
  Object.keys(required_specializations).forEach(key => {
    nodes.push({ id: key, group: 1, label: key });
  });

  // Create nodes for scientists and links to their specializations
  scientists.forEach(scientist => {
    nodes.push({ id: scientist.name, group: 2, label: scientist.name });
    Object.keys(scientist.expertises).forEach(expertise => {
      if (required_specializations[expertise] !== undefined) {
        links.push({
          source: expertise,
          target: scientist.name,
          value: required_specializations[expertise] * scientist.expertises[expertise]
        });
      }
    });
  });

  return (
    <div ref={containerRef} className="w-full pt-10">
      <ForceGraph3D
        graphData={{ nodes, links }}
        nodeAutoColorBy="group"
        nodeThreeObject={node => {
          const sprite = new SpriteText(node.label);
          sprite.color = node.group === 1 ? 'rgba(255, 255, 255, 0.5)' : 'orange';
          sprite.textHeight = node.group === 2 ? 24 : 8;
          return sprite;
        }}
        linkColor={() => 'rgba(255, 255, 255, 1)'}
        linkWidth={link => Math.sqrt(link.value)}
        width={width}
        height={600}  // You may want to also dynamically calculate the height or keep it fixed
      
      />
    </div>
  );
};

export default ForceDirectedGraph;
