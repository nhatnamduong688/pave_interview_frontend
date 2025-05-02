import {Layout} from 'antd';
import {BackButton} from "../atoms/BackButton";
import {SessionCardSVG} from "../molecules/SessionCard/SessionCardSVG";
import ReportTimer from "../atoms/ReportTimer";
import React from "react";
import { CollapseToggleButton } from "../atoms/CollapseToggleButton";

const {Header: AntHeader} = Layout;

interface HeaderProps {
  onMenuClick?: () => void;
  timestamp?: string;
  timerValue?: string;
  onReportClick?: () => void;
  onTimerClick?: () => void;
  onCollapseToggle?: () => void;
  title?: string;
  onBack?: () => void;
  onReport?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  timestamp = "2 days ago, 3:03:58 PM",
  timerValue = "32s",
  onReportClick,
  onTimerClick,
  onCollapseToggle,
  title,
  onBack,
  onReport,
}) => {
  return (
    <div className="bg-black w-full">
      <AntHeader className="px-6 bg-white flex items-center justify-between w-full h-16 shadow-md mx-auto max-w-7xl">
        {/* Left side - Back button and SessionCard */}
        <div className="flex items-center">
          <BackButton
            variant="secondary"
            onClick={onBack || onMenuClick || (() => console.log('Back button clicked'))}
            className="mr-4"
          />

          {title ? (
            <h1 className="text-lg font-medium ml-2">{title}</h1>
          ) : (
            <div className="ml-2">
              <SessionCardSVG
                sessionId="TOA-8GASMDUDFT"
                tags={[
                  {text: "ARZ", type: "yellow"},
                  {text: "P1", type: "blue"}
                ]}
                qcStatus="QC Passed:"
                qcTimestamp={timestamp}
                isExpandable={true}
              />
            </div>
          )}
        </div>

        {/* Right side - Report and Timer buttons */}
        <div className="flex items-center gap-3">
          <ReportTimer 
            variant="report" 
            label="Report" 
            onClick={onReport || onReportClick || (() => console.log('Report button clicked'))} 
          />
          <ReportTimer 
            variant="timer" 
            label={timerValue} 
            onClick={onTimerClick || (() => console.log('Timer button clicked'))} 
          />
          {onCollapseToggle && (
            <CollapseToggleButton
              onClick={onCollapseToggle}
            />
          )}
        </div>
      </AntHeader>
    </div>
  );
};

export default Header;
