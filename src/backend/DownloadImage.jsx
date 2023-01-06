import React from 'react';
import { toPng , toJpeg} from 'html-to-image';

function downloadImage(dataUrl) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

function DownloadImage() {
    toPng(document.querySelector('.react-flow'), {
        filter: (node) => {
          // we don't want to add the minimap and the controls to the image
          if (
            node?.classList?.contains('react-flow__minimap') 
          ) {
            return true;
          }
  
          return false;
        },
    }).then(downloadImage);

};

export default DownloadImage;