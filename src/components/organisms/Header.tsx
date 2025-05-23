import {Layout} from 'antd';
import {BackButton} from "../atoms/BackButton";
import {SessionCardSVG} from "../molecules/SessionCard/SessionCardSVG";
import ReportTimer from "../atoms/ReportTimer";
import React from "react";
import { CollapseToggleButton } from "../atoms/CollapseToggleButton";
import { Tag } from "../molecules/SessionCard/SessionTag";

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
  sessionId?: string;
  tags?: Tag[];
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
  sessionId,
  tags = []
}) => {
  return (
    <div className="flex items-center justify-between w-full h-full">
      {/* Left side - Back button and SessionCard */}
      <div className="flex items-center">
        <BackButton
          variant="default"
          fillColor="white"
          onClick={onBack || onMenuClick || (() => console.log('Back button clicked'))}
          className="mr-4"
        />

        {title ? (
          <h1 className="text-lg font-medium">{title}</h1>
        ) : sessionId ? (
          <div>
            <SessionCardSVG
              sessionId={sessionId}
              tags={tags}
              qcStatus="QC Passed:"
              qcTimestamp={timestamp}
              isExpandable={true}
            />
          </div>
        ) : (
          <div>
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

      {/* Right side - Buttons */}
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
        <CollapseToggleButton
          onClick={onCollapseToggle || (() => console.log('Collapse toggle clicked'))}
        />
      </div>
    </div>
  );
};

export default Header;
