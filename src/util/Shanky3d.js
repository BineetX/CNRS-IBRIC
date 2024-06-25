import React, { useRef, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

const ForceGraph3DComponent = ({ data }) => {
  const { required_specializations, scientists } = data;
  const containerRef = useRef(null);
  const forceGraphRef = useRef(null);
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
  }, []);

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

  const handleNodeClick = node => {
    // Focus and zoom on the node
    if (node.group === 2 && forceGraphRef.current) {
      forceGraphRef.current.cameraPosition(
        { x: node.x, y: node.y, z: node.z + 200 }, // new position
        node, // lookAt ({ x, y, z })
        1000  // ms transition duration
      );

      // Re-arrange linked nodes circularly around the selected node
      const linkedNodes = links.filter(link => link.target === node.id || link.source === node.id);
      const angleStep = Math.PI * 2 / linkedNodes.length;
      linkedNodes.forEach((link, idx) => {
        const targetNode = nodes.find(n => n.id === (link.source === node.id ? link.target : link.source));
        if (targetNode) {
          targetNode.fx = node.x + 150 * Math.cos(angleStep * idx);
          targetNode.fy = node.y + 150 * Math.sin(angleStep * idx);
          targetNode.fz = node.z;
        }
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full pt-10 pb-10 shadow-2xl">
      <ForceGraph3D
        ref={forceGraphRef}
        graphData={{ nodes, links }}
        nodeAutoColorBy="group"
        nodeThreeObject={node => {
          const sprite = new SpriteText(node.label);
          sprite.color = node.group === 1 ? 'rgba(0, 0, 0, 0.4)' : 'rgba(23,87,126,1)';
          sprite.textHeight = node.group === 2 ? 26 : 8;
          return sprite;
        }}
        linkColor={() => 'rgba(0, 0, 0, 0.5)'}
        linkWidth={link => Math.sqrt(link.value)}
        width={width}
        height={600}
        onNodeClick={handleNodeClick}
        backgroundColor='white'
      />
    </div>
  );
};

export default ForceGraph3DComponent;
