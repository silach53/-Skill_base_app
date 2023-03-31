import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const WindRose = ({ data }) => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    const updateSkillsData = () => {
      // Update the skillsData state based on the data prop (todos)
      // You can modify this function according to your needs
      const skills = data.map((todo) => ({
        skill: todo.skill,
        value: todo.completed ? 100 : 0
      }));
      setSkillsData(skills);
    };

    updateSkillsData();
  }, [data]);

  return (
    <div>
      <h2>Wind Rose</h2>
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={600}
        height={500}
        data={skillsData}
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
      </RadarChart>
    </div>
  );
};

export default WindRose;