import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const WindRose = ({ data, priorityData, projectData, labelData }) => {
  const calculateWindRoseSize = (skills) => {
    return skills.length * 120; // Increase the multiplier to make the chart bigger
  };

  const size = calculateWindRoseSize(data);

  return (
    <div className="wind-rose-container">
      <h2>Wind Rose</h2>
      <RadarChart
        cx={size / 2}
        cy={size / 2}
        outerRadius={size / 4}
        width={size}
        height={size}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        {/* Add additional Radar components for priority levels, projects, and labels */}
        <Radar
          name="Priority Levels"
          dataKey="value"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Radar
          name="Projects"
          dataKey="value"
          stroke="#ffc658"
          fill="#ffc658"
          fillOpacity={0.6}
        />
        <Radar
          name="Labels"
          dataKey="value"
          stroke="#ff7300"
          fill="#ff7300"
          fillOpacity={0.6}
        />
      </RadarChart>
      <div className="skills-count">
        <p>Number of Skills: {data.length}</p>
      </div>
      <div className="skills-values">
        <h3>Skill Values:</h3>
        <ul>
          {data.map((skill, index) => (
            <li key={index}>
              {skill.skill}: {skill.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WindRose;