import React, { useEffect, useState } from 'react';
import ky from 'ky';
import './ContributionGraph.css'; // Импортируйте стили из вашего CSS-файла

interface ContributionData {
  [date: string]: number;
}

const ContributionGraph: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionData>({});

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const data: ContributionData = await ky.get('https://dpg.gg/test/calendar.json').json();
        setContributions(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchContributions();
  }, []);



  const today: Date = new Date();
  const todayDate: string = today.toISOString().split('T')[0];

  const dateRange: string[] = [];
  
  for (let i = 0; i < 357; i++) {
    const date: Date = new Date(today);
    date.setDate(today.getDate() - i);

    dateRange.push(date.toISOString().split('T')[0]);
  }

  const cellStyle = (date: string) => {
    const isToday = date === todayDate;

    const count = contributions[date] || 0;
  
    let color = 'empty';
    if (count >= 1 && count <= 9) {
      color = 'lowContributions';

} else if (count >= 10 && count <= 30) {
      color = 'mediumContributions';
    } else if (count > 30) {
      color = 'highContributions';
    }
  
    const cellClasses = [
      'contribution-cell',
      isToday ? 'today' : color,
    ].join(' ');
  
    return cellClasses;
  };
  return (
    
   <div className="cont" >
          
        <div className="contribution-graph">
          
      
          {dateRange.map(date => (
            <div
              key={date}
              className={cellStyle(date)}
              data-count={contributions[date] || 0}
            />
          ))}
        </div>
   </div>
   
  );
};

export default ContributionGraph;
