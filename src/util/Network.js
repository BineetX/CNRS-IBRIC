import React from 'react';
import Plot from 'react-plotly.js';

const CollaborationNetwork = ({ data }) => {
    const { scientists } = data;

    // Create a map to store connections between scientists
    const connections = {};
    const weights = {};
    scientists.forEach((sci, index) => {
        connections[sci.name] = [];
        weights[sci.name] = sci.weighted_score;
        scientists.forEach((otherSci, otherIndex) => {
            if (index !== otherIndex) {
                const sharedFields = Object.keys(sci.expertises).filter(field =>
                    Object.keys(otherSci.expertises).includes(field)
                );
                if (sharedFields.length > 0) {
                    connections[sci.name].push({
                        target: otherSci.name,
                        sharedFields: sharedFields.length,
                    });
                }
            }
        });
    });

    // Nodes and edges for the graph
    const nodes = [];
    const edges = [];
    const x = [];
    const y = [];

    // Simple layout: place nodes in a circle
    const total = scientists.length;
    scientists.forEach((sci, index) => {
        const angle = (index / total) * 2 * Math.PI;
        x.push(100 * Math.cos(angle)); // Radius of 100 units
        y.push(100 * Math.sin(angle));
        nodes.push(sci.name);
    });

    scientists.forEach(sci => {
        connections[sci.name].forEach(conn => {
            const sourceIndex = nodes.indexOf(sci.name);
            const targetIndex = nodes.indexOf(conn.target);
            edges.push({
                x: [x[sourceIndex], x[targetIndex]],
                y: [y[sourceIndex], y[targetIndex]],
                text: `Shared Fields: ${conn.sharedFields}`,
                width: Math.sqrt(conn.sharedFields) * 2, // Example scaling for visibility
            });
        });
    });

    return (
        <Plot
            className='pt-10 shadow-lg '
            data={edges.map(edge => ({
                type: 'scatter',
                mode: 'lines',
                x: edge.x,
                y: edge.y,
                line: {
                    color: 'blue',
                    width: edge.width
                },
                hoverinfo: 'text',
                hovertext: edge.text
            }))}
            layout={{
                title: 'Scientist Shared Fields Map',
                xaxis: {
                    showgrid: false,
                    zeroline: false,
                    showticklabels: false
                },
                yaxis: {
                    showgrid: false,
                    zeroline: false,
                    showticklabels: false
                },
                height: 600,
                showlegend: false,
                hovermode: 'closest',
                annotations: nodes.map((node, i) => ({
                    x: x[i],
                    y: y[i],
                    xref: 'x',
                    yref: 'y',
                    text: node,
                    showarrow: true,
                    arrowhead: 7,
                    ax: 0,
                    ay: -40
                }))
            }}
        />
    );
};

export default CollaborationNetwork;
