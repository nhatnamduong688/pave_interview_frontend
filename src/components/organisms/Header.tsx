import { Layout, Typography, Tag, Button } from 'antd';
import { MenuOutlined, ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {TrapezoidButton} from "../atoms/TrapezoidButton";

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

        {/*<MenuOutlined*/}
        {/*  className="mr-6 text-lg cursor-pointer"*/}
        {/*  onClick={onMenuClick}*/}
        {/*/>*/}

        {/*<Link to="/">*/}
        {/*  <Title level={4} className="m-0">*/}
        {/*    PAVE*/}
        {/*  </Title>*/}
        {/*</Link>*/}

        <div className="flex items-center">

          {/*<TrapezoidButton*/}
          {/*  type="primary"*/}
          {/*  className="ml-6"*/}
          {/*  skewDegree={10}*/}
          {/*>*/}
          {/*  TOA-86ASMDUDF*/}
          {/*</TrapezoidButton>*/}

          <TrapezoidButton
            skewDegree="medium"      // góc nghiêng ~25%
            direction="left"         // mặt cắt phía bên phải
            backgroundColor="#fff"   // nền trắng
            hoverEffect="none"       // tắt các hiệu ứng phụ khi hover
            iconColor="#9ca3af"
            bottomCurve={true}       // bật “bo” bóng chân
            gridBackground={false}
            className="w-[100px] h-[55px]" // điều chỉnh kích thước cho giống
          />

          {/*<Tag className="ml-2 bg-yellow-500 text-white border-none">AMZ</Tag>*/}
          {/*<Tag className="ml-2 bg-blue-500 text-white border-none">P1</Tag>*/}
        </div>
      </div>

      {/* Right side - Actions and Timestamp */}
      <div className="flex items-center space-x-4">
        <Text className="text-gray-500 flex items-center">
          <ClockCircleOutlined className="mr-2" />
          {timestamp}
        </Text>

        <Button
          icon={<WarningOutlined />}
          className="flex items-center border rounded-full"
          onClick={onReport}
        >
          Report
        </Button>

        <Tag className="rounded-full bg-green-100 text-green-800 border-green-200">
          {elapsedTime}
        </Tag>
      </div>
    </AntHeader>
  );
};

export default Header;
