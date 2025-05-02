import {Layout} from 'antd';
import {BackButton} from "../atoms/BackButton";
import {CollapseToggleButton} from "../atoms/CollapseToggleButton";
import {SessionCard} from "../molecules/SessionCard";
import {SessionCardSVG} from "../molecules/SessionCard/SessionCardSVG";
import React from "react";
import {ProductCard} from "../molecules/ProductCard";

const {Header: AntHeader} = Layout;

interface HeaderProps {
  onMenuClick?: () => void;
  timestamp?: string;
  elapsedTime?: string;
  onReport?: () => void;
}

const Header: React.FC<HeaderProps> = ({
                                         onMenuClick,
                                         timestamp = "QC Passed: 2 days ago, 3:03:58 PM",
                                         elapsedTime,
                                         onReport,
                                       }) => {
  return (
    <AntHeader className="px-4 bg-gray-100 shadow-sm flex items-center justify-between w-full h-16">
      {/* Left side - Logo and menu */}
      <div className="flex items-center">
        <div className="flex items-center">
          {/* Các button */}
          <BackButton
            variant="secondary"
            onClick={onMenuClick || (() => console.log('Secondary button clicked'))}
            className="mr-4"
          />

          <BackButton
            fillColor="#ffffff"
            hoverColor="#f3f4f6"
            shadowEnabled={false}
            onClick={onMenuClick || (() => console.log('No shadow button clicked'))}
            className="mr-4"
          />

          <CollapseToggleButton
            variant="default"
            onClick={onReport || (() => console.log('Report button clicked'))}
          />

          {/* SessionCard với thiết kế từ Figma */}
          <div className="ml-4">
            <SessionCardSVG
              sessionId="TOA-8GASMDUDFT"
              tags={[
                {text: "AMZ", type: "yellow"},
                {text: "P1", type: "blue"}
              ]}
              qcStatus="QC Passed:"
              qcTimestamp={timestamp.includes("QC Passed:") ? timestamp.replace("QC Passed:", "") : timestamp}
              isExpandable={true}
            />
          </div>

        </div>
      </div>

      {/* Right side - Elapsed time */}
      {elapsedTime && (
        <div className="flex items-center">
          <div className="text-gray-600 font-medium">
            {elapsedTime}
          </div>
        </div>
      )}
    </AntHeader>
  );
};

export default Header;
