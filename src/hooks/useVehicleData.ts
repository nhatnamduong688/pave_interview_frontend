import { useMemo } from 'react';
import { Tag as TagType } from '../components/molecules/SessionCard/SessionTag';

export interface VehicleInfo {
  vehicleId: string;
  vehicleInfo: {
    year: string;
    make: string;
    model: string;
    trim?: string;
    bodyType?: string;
  };
  images: {
    id: string;
    src: string;
    alt?: string;
  }[];
}

interface UseVehicleDataProps {
  vehicleData: VehicleInfo;
}

export const useVehicleData = ({ vehicleData }: UseVehicleDataProps) => {
  // Format session ID from vehicle info
  const sessionId = useMemo(() => {
    return `${vehicleData.vehicleInfo.year}-${vehicleData.vehicleInfo.make}-${vehicleData.vehicleInfo.model}`;
  }, [vehicleData.vehicleInfo]);

  // Create tags based on vehicle info
  const tags = useMemo(() => {
    const result: TagType[] = [];
    
    // Add trim tag if available
    if (vehicleData.vehicleInfo.trim) {
      result.push({ text: vehicleData.vehicleInfo.trim, type: "yellow" });
    }
    
    // Add default P1 tag
    result.push({ text: "P1", type: "blue" });
    
    return result;
  }, [vehicleData.vehicleInfo]);

  // Default timestamp - in a real app this would come from data
  const timestamp = "2 days ago, 3:03:58 PM";

  // Define extra thumbnails for the footer
  const extraThumbnails = useMemo(() => {
    return vehicleData.images.slice(0, 3).map(img => ({
      id: img.id,
      src: img.src,
      alt: img.alt
    }));
  }, [vehicleData.images]);
  
  // Caption text based on vehicle info
  const captionText = useMemo(() => {
    return `${vehicleData.vehicleInfo.year} ${vehicleData.vehicleInfo.make}\n${vehicleData.vehicleInfo.model}`;
  }, [vehicleData.vehicleInfo]);

  return {
    vehicleId: vehicleData.vehicleId,
    sessionId,
    tags,
    timestamp,
    extraThumbnails,
    captionText,
    images: vehicleData.images
  };
}; 