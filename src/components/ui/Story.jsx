import React from 'react'

const Story = ({ storyData }) => {
  return (
    <div className="w-full bg-white py-4 border-b border-gray-200">
      {/* 
         Main Container for Scroll
         flex: এক লাইনে রাখার জন্য
         overflow-x-auto: হরিজন্টাল স্ক্রল করার জন্য
         whitespace-nowrap: লাইন ব্রেক আটকানোর জন্য
      */}
      <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide w-full">
        
        {storyData.map((img, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center cursor-pointer">
            
            {/* Gradient Border Ring (Instagram Style) */}
            <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px] rounded-full">
              <div className="bg-white p-[2px] rounded-full">
                <img 
                  src={img.image} 
                  alt={`story-${index}`} 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full" 
                />
              </div>
            </div>

            {/* Optional: User Name Placeholder */}
            <span className="text-xs text-gray-600 mt-1">{img.title}</span>
          
          </div>
        ))}

      </div>

      {/* 
          Custom CSS to Hide Scrollbar
      */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Story
