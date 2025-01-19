import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const Render2 = ({ updatedCode }) => {
  const containerRef = useRef(null);

  // Function to save base64 image as a .txt file
  const saveBase64ToFile = (base64Image) => {
    // Create a Blob with the base64 string as text content
    const blob = new Blob([base64Image], { type: 'text/plain' });
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'render2.txt'; // File name for download
    
    // Trigger the download
    link.click();
  };

  const takeScreenshot = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current).then((canvas) => {
        // Get the base64 string of the image
        const base64Image = canvas.toDataURL('image/png');
        console.log(base64Image); // This is your base64 image string
        
        // Save the base64 image to a .txt file
        saveBase64ToFile(base64Image);
      });
    }
  };

  return (
    <div className='relative'>
      <div
        ref={containerRef}
        className="border h-screen flex justify-center items-center"
        dangerouslySetInnerHTML={{
          __html: updatedCode.replace(/class="/g, 'className="').replace(/for=/g, 'htmlFor='),
        }}
      />
      <button
        onClick={takeScreenshot}
        className="absolute bottom-5 left-5 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Take Screenshot
      </button>
    </div>
  );
};

export default Render2;
