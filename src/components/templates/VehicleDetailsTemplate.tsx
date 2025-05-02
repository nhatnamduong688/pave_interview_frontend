import React, { useState } from 'react';
import Header from '../organisms/Header';
import ImageViewer from '../molecules/ImageViewer';
import ThumbnailList from '../molecules/ThumbnailList';
import VehicleInfoPanel from '../molecules/VehicleInfoPanel';
import ViewControlsToolbar from '../molecules/ViewControlsToolbar';
import ThumbnailPreviewBar from '../molecules/ThumbnailPreviewBar';

interface VehicleImage {
  id: string;
  src: string;
  alt?: string;
  indicators?: {
    x: number;
    y: number;
    color?: string;
  }[];
}

interface VehicleDetailsTemplateProps {
  vehicleId: string;
  vehicleInfo: {
    year: string;
    make: string;
    model: string;
    trim?: string;
    bodyType?: string;
  };
  images: VehicleImage[];
  onBack?: () => void;
  onReport?: () => void;
}

const VehicleDetailsTemplate: React.FC<VehicleDetailsTemplateProps> = ({
  vehicleId,
  vehicleInfo,
  images,
  onBack,
  onReport
}) => {
  const [activeImageId, setActiveImageId] = useState<string>(images[0]?.id || '');
  const activeImage = images.find(img => img.id === activeImageId) || images[0];

  const toolbarButtons = [
    { id: 'move', icon: '↕️', label: 'Move' },
    { id: 'zoom', icon: '🔍', label: 'Zoom' },
    { id: 'rotate', icon: '🔄', label: 'Rotate' },
    { id: 'measure', icon: '📏', label: 'Measure' },
    { id: 'reset', icon: '↩️', label: 'Reset View' },
  ];

  return (
    <div className="grid grid-rows-[64px_1fr_56px] grid-cols-[64px_1fr_300px] min-h-screen max-h-screen w-full overflow-hidden">
      {/* Header area */}
      <div className="col-span-3 flex items-center h-16 px-4 border-b border-gray-200 bg-white z-10">
        <Header 
          title={`${vehicleInfo.year}-${vehicleInfo.make}-${vehicleInfo.model}`}
          onBack={onBack}
          onReport={onReport}
        />
      </div>
      
      {/* Sidebar Left - Thumbnail List */}
      <div className="w-16 p-2 border-r border-gray-200 overflow-y-auto bg-white">
        <ThumbnailList
          thumbnails={images}
          activeId={activeImageId}
          onSelect={setActiveImageId}
        />
      </div>
      
      {/* Main Viewer */}
      <div className="overflow-auto flex items-center justify-center bg-gray-50">
        <ImageViewer
          src={activeImage?.src || ''}
          alt={activeImage?.alt}
          indicators={activeImage?.indicators}
        />
      </div>
      
      {/* Sidebar Right */}
      <div className="w-[300px] p-4 border-l border-gray-200 overflow-y-auto bg-white">
        <div className="h-full flex flex-col">
          <h3 className="text-lg font-medium mb-4">Image Details</h3>
          
          {activeImage && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Image Type</h4>
                <p className="text-base">{activeImage.alt || 'Vehicle Image'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Indicators</h4>
                <p className="text-base">{activeImage.indicators?.length || 0} points marked</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Image ID</h4>
                <p className="text-base font-mono text-sm">{activeImage.id}</p>
              </div>
            </div>
          )}
          
          <div className="mt-auto">
            <h4 className="text-sm font-medium text-gray-500 mb-2">More Images</h4>
            <div className="grid grid-cols-2 gap-2">
              {images.slice(0, 4).map(image => (
                <button 
                  key={image.id}
                  className={`aspect-square rounded overflow-hidden ${
                    activeImageId === image.id ? 'ring-2 ring-blue-500' : 'border border-gray-200'
                  }`}
                  onClick={() => setActiveImageId(image.id)}
                >
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="col-span-3 flex items-center h-14 px-4 border-t border-gray-200 bg-white">
        <VehicleInfoPanel
          year={vehicleInfo.year}
          make={vehicleInfo.make}
          model={vehicleInfo.model}
          trim={vehicleInfo.trim}
          bodyType={vehicleInfo.bodyType}
        />
        
        <div className="ml-auto">
          <ViewControlsToolbar buttons={toolbarButtons} />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsTemplate; 