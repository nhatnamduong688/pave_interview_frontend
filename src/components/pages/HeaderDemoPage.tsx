import React, { useState } from 'react';
import Header from '../organisms/Header';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HeaderDemoPage: React.FC = () => {
  const [timer, setTimer] = useState('32s');
  
  // Giả lập đếm thời gian (chỉ cho mục đích demo)
  const startTimer = () => {
    let seconds = 32;
    const interval = setInterval(() => {
      seconds -= 1;
      if (seconds >= 0) {
        setTimer(`${seconds}s`);
      } else {
        clearInterval(interval);
        setTimer('32s');
      }
    }, 1000);
  };

  return (
    <Layout className="min-h-screen bg-black">
      <Header 
        onMenuClick={() => console.log('Back button clicked')}
        timestamp="2 days ago, 3:03:58 PM"
        timerValue={timer}
        onReportClick={() => console.log('Report button clicked')}
        onTimerClick={startTimer}
        onCollapseToggle={() => console.log('Collapse toggle clicked')}
      />
      
      <Content className="p-8 mx-auto max-w-7xl bg-white mt-4 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <Title level={2}>Figma Header Demo</Title>
          
          <Paragraph className="my-4">
            Đây là bản demo của Header được thiết kế theo đúng layout từ Figma.
            Header bao gồm các thành phần:
          </Paragraph>
          
          <ul className="list-disc pl-8 mb-6">
            <li className="mb-2">Back Button - Nút quay lại</li>
            <li className="mb-2">Session Card - Hiển thị thông tin session với tags</li>
            <li className="mb-2">Report Button - Nút báo cáo</li>
            <li className="mb-2">Timer Button - Nút hiển thị thời gian (click để xem đếm ngược)</li>
            <li className="mb-2">Collapse Toggle Button - Nút đóng/mở panel</li>
          </ul>
          
          <div className="mt-8">
            <Title level={4}>Tương tác:</Title>
            <ul className="list-disc pl-8">
              <li className="mb-2">Click vào nút Timer để xem đếm ngược từ 32s.</li>
              <li className="mb-2">Các nút khác sẽ hiển thị log trong console khi nhấn.</li>
            </ul>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default HeaderDemoPage;
