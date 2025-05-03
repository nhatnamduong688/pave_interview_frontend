import React, { useState } from 'react';
import Header from '../organisms/Header';
import ImageViewer from '../molecules/ImageViewer';
import ThumbnailList from '../molecules/ThumbnailList';
import VehicleInfoPanel from '../molecules/VehicleInfoPanel';
import ViewControlsToolbar from '../molecules/ViewControlsToolbar';
import FooterBar from '../molecules/FooterBar';
import { Tag } from '../molecules/SessionCard/SessionTag';

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const activeImage = images.find(img => img.id === activeImageId) || images[0];

  const handleCollapseToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    console.log('Sidebar collapsed state:', !isSidebarCollapsed);
  };

  const toolbarButtons = [
    { id: 'move', icon: '↕️', label: 'Move' },
    { id: 'zoom', icon: '🔍', label: 'Zoom' },
    { id: 'rotate', icon: '🔄', label: 'Rotate' },
    { id: 'measure', icon: '📏', label: 'Measure' },
    { id: 'reset', icon: '↩️', label: 'Reset View' },
  ];

  // Format session ID from vehicle info
  const sessionId = `${vehicleInfo.year}-${vehicleInfo.make}-${vehicleInfo.model}`;

  // Create tags based on vehicle info
  const tags: Tag[] = [];

  // Add trim tag if available
  if (vehicleInfo.trim) {
    tags.push({ text: vehicleInfo.trim, type: "yellow" });
  }

  // Add default P1 tag
  tags.push({ text: "P1", type: "blue" });

  // QC timestamp
  const timestamp = "2 days ago, 3:03:58 PM";

  // Define extra thumbnails for the footer
  const extraThumbnails = images.slice(0, 3).map(img => ({
    id: img.id,
    src: img.src,
    alt: img.alt
  }));
  
  // Use side view orientation for vehicle diagram
  const vehicleOrientation = 'side' as const;
  
  // Caption text based on vehicle info
  const captionText = `${vehicleInfo.year} ${vehicleInfo.make}\n${vehicleInfo.model}`;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Main content area (left part) */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'mr-0' : 'mr-[300px]'}`}>
        {/* Header */}
        <div className="flex-none h-16 px-4 border-b border-gray-200 bg-white z-10">
          <Header
            // Use empty title to trigger SessionCardSVG
            title=""
            sessionId={sessionId}
            tags={tags}
            timestamp={timestamp}
            onBack={onBack}
            onReport={onReport}
            onCollapseToggle={handleCollapseToggle}
          />
        </div>

        {/* Center content with left sidebar and main viewer */}
        <div className="flex flex-1 overflow-hidden pl-[12px] items-center">
          {/* Sidebar Left - Thumbnail List */}
          <div className="w-[84px] bg-white flex flex-col justify-center">
            <ThumbnailList
              thumbnails={images}
              activeId={activeImageId}
              onSelect={setActiveImageId}
            />
          </div>

          {/* Main Viewer */}
          <div className="flex-1 overflow-auto flex items-center justify-center py-2">
            <ImageViewer
              src={activeImage?.src || ''}
              alt={activeImage?.alt}
              indicators={activeImage?.indicators}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex-none border-t border-gray-200">
          <FooterBar
            orientation={vehicleOrientation}
            captionText={captionText}
            extraThumbnails={extraThumbnails}
            onThumbnailClick={(id) => setActiveImageId(id)}
            onToolbarAction={(action) => console.log('Toolbar action:', action)}
          />
        </div>
      </div>

      {/* Sidebar Right - Full height with fixed footer - Position absolute to allow main content to expand */}
      <div className={`absolute top-0 right-0 w-[300px] h-full flex flex-col border-l border-gray-200 bg-white transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'translate-x-full' : 'translate-x-0'}`}>
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Title with view state */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">LEFT VIEW</h2>
            <div className="flex items-center">
              <span className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </span>
            </div>
          </div>

          {/* Damage list */}
          <div className="space-y-4 mt-2">
            {/* Damage entry 1 */}
            <div className="rounded-md border border-gray-200 overflow-hidden">
              <div className="flex items-center px-3 py-2 bg-gray-50">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 text-xs font-medium mr-2">
                  01
                </div>
                <div className="flex-1 text-sm">SCORE=5</div>
              </div>
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center mb-1">
                  <span className="inline-block h-4 w-4 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <path d="M7 7h.01" />
                      <path d="M17 7h.01" />
                      <path d="M7 17h.01" />
                      <path d="M17 17h.01" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-500">[C]QUARTER_PANEL_LEFT</span>
                </div>
                <h3 className="font-medium mb-1">DENTED_MAJOR_THROUGH_PAINT</h3>
                <div className="text-xs text-gray-500">Duy.Nguyen Khanh</div>
              </div>
            </div>

            {/* Damage entry 2 */}
            <div className="rounded-md border border-gray-200 overflow-hidden">
              <div className="flex items-center px-3 py-2 bg-gray-50">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-600 text-xs font-medium mr-2">
                  02
                </div>
                <div className="flex-1 text-sm">SCORE=3(included)</div>
              </div>
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center mb-1">
                  <span className="inline-block h-4 w-4 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <path d="M7 7h.01" />
                      <path d="M17 7h.01" />
                      <path d="M7 17h.01" />
                      <path d="M17 17h.01" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-500">[C]QUARTER_PANEL_LEFT</span>
                </div>
                <h3 className="font-medium mb-1">SCRATCH_MAJOR_THROUGH_PAINT</h3>
                <div className="text-xs text-gray-500">Duy.Nguyen Khanh</div>
              </div>
            </div>

            {/* Damage entry 3 */}
            <div className="rounded-md border border-gray-200 overflow-hidden">
              <div className="flex items-center px-3 py-2 bg-gray-50">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-2">
                  03
                </div>
                <div className="flex-1 text-sm">SCORE=1</div>
              </div>
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center mb-1">
                  <span className="inline-block h-4 w-4 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <path d="M7 7h.01" />
                      <path d="M17 7h.01" />
                      <path d="M7 17h.01" />
                      <path d="M17 17h.01" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-500">[P]RMT) GAS_CAP_COVER_UNIQUE</span>
                </div>
                <h3 className="font-medium mb-1">BROKEN_MEDIUM</h3>
                <div className="text-xs text-gray-500">Duy.Nguyen Khanh</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed footer with Finish button */}
        <div className="flex-none p-4 border-t border-gray-200">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition">
            Finish [F]
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsTemplate;
