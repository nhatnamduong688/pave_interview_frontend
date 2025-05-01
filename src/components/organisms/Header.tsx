import { Layout } from 'antd';
import { BackButton } from "../atoms/BackButton";
import { CollapseToggleButton } from "../atoms/CollapseToggleButton";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  // Giữ interface trống vì hiện tại không sử dụng props nào
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <AntHeader className="px-4 bg-white shadow-sm flex items-center justify-between w-full h-16">
      {/* Left side - Logo and menu */}
      <div className="flex items-center">
        <div className="flex items-center">
          {/* Các button */}
          <BackButton
            variant="secondary"
            onClick={() => console.log('Secondary button clicked')}
            className="mr-4"
          />

          <BackButton
            fillColor="#ffffff"
            hoverColor="#f3f4f6"
            shadowEnabled={false}
            onClick={() => console.log('No shadow button clicked')}
            className="mr-4"
          />

          <CollapseToggleButton
            variant="default"
            onClick={() => console.log('Report button clicked')}
          />
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
