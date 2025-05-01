import { Layout, Typography, Tag, Button } from 'antd';
import { MenuOutlined, ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {TrapezoidButton} from "../atoms/TrapezoidButton";
import {FigmaButton} from "../atoms/FigmaButton";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

interface HeaderProps {
  onMenuClick?: () => void;
  timestamp?: string;
  elapsedTime?: string;
  onReport?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  timestamp = 'QC Passed: 2 days ago, 3:03:58 PM',
  elapsedTime = '32s',
  onReport,
}) => {
  return (
    <AntHeader className="px-4 bg-white shadow-sm flex items-center justify-between w-full h-16">
      {/* Left side - Logo and menu */}
      <div className="flex items-center">

        <div className="flex items-center">
          {/* FigmaButton chính với mã sản phẩm và badge */}
          {/*<FigmaButton*/}
          {/*  variant="primary"*/}
          {/*  productCode="TOA-86ASMDUDF"*/}
          {/*  badgeText="AMZ"*/}
          {/*  badgeColor="#f59e0b"*/}
          {/*  onClick={() => console.log('Product button clicked')}*/}
          {/*  className="mr-6"*/}
          {/*/>*/}

          {/* FigmaButton với badge P1 */}
          {/*<FigmaButton*/}
          {/*  variant="default"*/}
          {/*  badgeText="P1"*/}
          {/*  badgeColor="#3b82f6"*/}
          {/*  onClick={() => console.log('P1 badge button clicked')}*/}
          {/*  className="mr-6"*/}
          {/*/>*/}

          {/* FigmaButton ở các vị trí khác có thể ẩn trong điện thoại */}
          {/*<div className="hidden md:flex items-center">*/}
            <FigmaButton
              variant="secondary"
              onClick={() => console.log('Additional button clicked')}
              className="mr-4"
            />

            <FigmaButton
              fillColor="#f3f4f6"
              onClick={() => console.log('Last button clicked')}
              className="mr-4"
              shadowEnabled={false}
            />
          {/*</div>*/}
        </div>
      </div>

      {/* Right side - Actions and Timestamp */}
      {/*<div className="flex items-center space-x-4">*/}
      {/*  <Text className="text-gray-500 flex items-center">*/}
      {/*    <ClockCircleOutlined className="mr-2" />*/}
      {/*    {timestamp}*/}
      {/*  </Text>*/}

      {/*  <Button*/}
      {/*    icon={<WarningOutlined />}*/}
      {/*    className="flex items-center border rounded-full"*/}
      {/*    onClick={onReport}*/}
      {/*  >*/}
      {/*    Report*/}
      {/*  </Button>*/}

      {/*  <Tag className="rounded-full bg-green-100 text-green-800 border-green-200">*/}
      {/*    {elapsedTime}*/}
      {/*  </Tag>*/}
      {/*</div>*/}
    </AntHeader>
  );
};

export default Header;
