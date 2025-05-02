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
    { id: 'zoom', icon: '🔍', label: 'Zoom' },
    { id: 'rotate', icon: '🔄', label: 'Rotate' },
    { id: 'measure', icon: '📏', label: 'Measure' },
    { id: 'reset', icon: '↩️', label: 'Reset View' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <Header 
        title={`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`}
        onBack={onBack}
        onReport={onReport}
      />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail List (Left Side) */}
        <div className="w-16 p-1 bg-white">
          <ThumbnailList
            thumbnails={images}
            activeId={activeImageId}
            onSelect={setActiveImageId}
          />
        </div>
        
        {/* Main Image Viewer */}
        <div className="flex-1 relative">
          <ImageViewer
            src={activeImage?.src || ''}
            alt={activeImage?.alt}
            indicators={activeImage?.indicators}
          />
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex flex-col">
        {/* Vehicle Info Panel */}
        <VehicleInfoPanel
          year={vehicleInfo.year}
          make={vehicleInfo.make}
          model={vehicleInfo.model}
          trim={vehicleInfo.trim}
          bodyType={vehicleInfo.bodyType}
        />
        
        {/* View Controls */}
        <div className="flex">
          <div className="flex-1">
            <ViewControlsToolbar buttons={toolbarButtons} />
          </div>
          
          <div className="flex-1">
            <ThumbnailPreviewBar
              thumbnails={images}
              activeId={activeImageId}
              onSelect={setActiveImageId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsTemplate; 