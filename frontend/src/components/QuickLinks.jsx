import React from 'react';

const QuickLinks = () => {
  return (
    <div className="flex gap-6 px-10 py-8 bg-blue-950 justify-center">
  
  {/* Card 1 */}
  <a 
      href="https://www.kunainital.ac.in/" 
    target="_blank" 
    rel="noreferrer"
    className="bg-white rounded-xl px-6 py-8 flex items-center gap-4 hover:shadow-xl transition-all duration-300 hover:scale-105"
    style={{ width: '500px' }}
  >
    <div className="bg-blue-100 p-3 rounded-full text-2xl">
      🎓
    </div>
    <div>
      <h3 className="text-blue-900 font-bold text-lg">Kumaun University</h3>
      <p className="text-gray-500 text-sm">Visit Official Website</p>
    </div>
  </a>

  {/* Card 2 */}
  <a 
   href="https://kunainital.ac.in/grievance"
    target="_blank" 
    rel="noreferrer"
    className="bg-white rounded-xl px-6 py-8 flex items-center gap-4 hover:shadow-xl transition-all duration-300 hover:scale-105"
    style={{ width: '500px' }}
  >
    <div className="bg-orange-100 p-3 rounded-full text-2xl">
      📝
    </div>
    <div>
      <h3 className="text-blue-900 font-bold text-lg">Grievance Portal</h3>
      <p className="text-gray-500 text-sm">Submit Your Complaints Online</p>
    </div>
  </a>

</div>
  );
};

export default QuickLinks;