import { useState, useCallback, useEffect } from 'react';

/**
 * Possible positions for the popup relative to the indicator
 */
export type PopupPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Hook to manage the position of popup
 */
export interface PopupPosition {
  x: number;
  y: number;
  popupLeft: number;
  popupTop: number;
  popupTransform: string;
  arrowPosition: PopupPlacement;
  placement: PopupPlacement;
}

interface SmartPositioningOptions {
  popupWidth?: number;
  popupHeight?: number;
  indicatorSize?: number;
  gap?: number;
  padding?: number;
  viewportThreshold?: number;
  preferredPlacement?: PopupPlacement;
}

/**
 * Hook for smart popup positioning that automatically adjusts based on viewport constraints
 */
export default function usePositionedPopup() {
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);
  const [popupElement, setPopupElement] = useState<HTMLElement | null>(null);
  
  /**
   * Disable scrolling on main view
   */
  const disableScroll = useCallback(() => {
    // Lưu vị trí scroll hiện tại
    const scrollY = window.scrollY;
    
    // Áp dụng style để cố định body và html
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    
    // Thêm style để vô hiệu hóa scroll trên các phần tử khác
    const scrollableElements = document.querySelectorAll('.scrollable');
    scrollableElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.overflow = 'hidden';
      }
    });
    
    // Lưu lại giá trị scrollY để khôi phục sau
    document.body.setAttribute('data-scroll-position', scrollY.toString());
  }, []);
  
  /**
   * Enable scrolling on main view
   */
  const enableScroll = useCallback(() => {
    // Lấy vị trí scroll đã lưu
    const scrollY = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
    
    // Khôi phục style
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
    
    // Khôi phục scroll cho các phần tử khác
    const scrollableElements = document.querySelectorAll('.scrollable');
    scrollableElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.overflow = '';
      }
    });
    
    // Scroll lại vị trí ban đầu
    window.scrollTo(0, scrollY);
  }, []);
  
  /**
   * Ref callback to capture the popup element
   */
  const popupRef = useCallback((node: HTMLElement | null) => {
    setPopupElement(node);
  }, []);

  /**
   * Tính toán vị trí tốt nhất cho popup dựa trên vị trí của indicator
   */
  const calculatePopupPosition = useCallback((
    x: number, 
    y: number, 
    viewportWidth: number, 
    viewportHeight: number,
    options: SmartPositioningOptions = {}
  ) => {
    // Khoá scroll khi hiển thị popup
    disableScroll();
    
    // Các tham số mặc định
    const {
      popupWidth = 280,
      popupHeight = 350, // Tăng chiều cao mặc định từ 280 lên 350
      indicatorSize = 24,
      gap = 20, // Giảm khoảng cách từ 36 xuống 20
      padding = 20, // Padding từ cạnh màn hình
      viewportThreshold = 0.55, // Ngưỡng để quyết định vị trí tốt nhất
      preferredPlacement = 'right' // Thay đổi từ 'left' sang 'right' cho phù hợp với giao diện
    } = options;
    
    // Sử dụng kích thước thực của popup nếu có
    const actualPopupWidth = popupElement?.offsetWidth || popupWidth;
    const actualPopupHeight = popupElement?.offsetHeight || popupHeight;
    
    console.log('Indicator position:', { x, y });
    console.log('Viewport dimensions:', { viewportWidth, viewportHeight });
    console.log('Popup dimensions:', { actualPopupWidth, actualPopupHeight });
    
    // Vị trí tương đối của indicator trong viewport (0-1)
    const relativeX = x / viewportWidth;
    const relativeY = y / viewportHeight;
    
    // Định nghĩa các cạnh của viewport với padding
    const leftEdge = padding;
    const rightEdge = viewportWidth - padding;
    const topEdge = padding;
    const bottomEdge = viewportHeight - padding;
    
    // Tính toán không gian khả dụng ở mỗi hướng
    const spaceLeft = x - leftEdge;
    const spaceRight = rightEdge - x;
    const spaceTop = y - topEdge;
    const spaceBottom = bottomEdge - y;
    
    console.log('Available space:', { 
      left: spaceLeft, 
      right: spaceRight,
      top: spaceTop, 
      bottom: spaceBottom 
    });
    
    // Các biến lưu vị trí popup và hướng mũi tên
    let bestPlacement: PopupPlacement;
    let arrowPosition: PopupPlacement;
    let popupLeft = 0;
    let popupTop = 0;
    
    // Xác định vị trí tốt nhất dựa trên không gian có sẵn
    
    // Ưu tiên hiển thị bên phải (theo thiết kế)
    if (spaceRight >= actualPopupWidth + gap || preferredPlacement === 'right') {
      if (spaceRight >= actualPopupWidth + gap) {
        bestPlacement = 'right';
        arrowPosition = 'left';
        popupLeft = x + indicatorSize/2 + gap;
        popupTop = y - actualPopupHeight / 2;
      } else {
        // Nếu không đủ chỗ bên phải, thử bên trái
        bestPlacement = 'left';
        arrowPosition = 'right';
        popupLeft = x - indicatorSize/2 - gap - actualPopupWidth;
        popupTop = y - actualPopupHeight / 2;
      }
    } 
    // Nếu không đủ chỗ bên phải hoặc trái, thử trên hoặc dưới
    else if (spaceBottom >= actualPopupHeight + gap) {
      bestPlacement = 'bottom';
      arrowPosition = 'top';
      popupLeft = x - actualPopupWidth / 2;
      popupTop = y + indicatorSize/2 + gap;
    } else {
      bestPlacement = 'top';
      arrowPosition = 'bottom';
      popupLeft = x - actualPopupWidth / 2;
      popupTop = y - indicatorSize/2 - gap - actualPopupHeight;
    }
    
    // Đảm bảo popup không bị tràn ra ngoài viewport
    // Điều chỉnh vị trí ngang
    if (popupLeft < leftEdge) {
      popupLeft = leftEdge;
    } else if (popupLeft + actualPopupWidth > rightEdge) {
      popupLeft = rightEdge - actualPopupWidth;
    }
    
    // Điều chỉnh vị trí dọc
    if (popupTop < topEdge) {
      popupTop = topEdge;
    } else if (popupTop + actualPopupHeight > bottomEdge) {
      popupTop = bottomEdge - actualPopupHeight;
    }
    
    // Nếu popup gần quá bên trái hoặc bên phải, cần điều chỉnh vị trí mũi tên
    if ((bestPlacement === 'top' || bestPlacement === 'bottom') && 
        (popupLeft === leftEdge || popupLeft + actualPopupWidth === rightEdge)) {
      // Mũi tên vẫn hướng đến indicator
      // Không cần điều chỉnh arrowPosition ở đây
    }
    
    // Xử lý trường hợp đặc biệt để đảm bảo popup luôn nằm trong viewport
    // Ưu tiên cho không gian hiển thị đầy đủ
    
    // Ưu tiên hiển thị bên phải (theo thiết kế UI)
    if ((bestPlacement === 'left' || bestPlacement === 'right') && 
        relativeY > 0.7 && spaceBottom < actualPopupHeight / 2) {
      // Nếu indicator ở gần cuối màn hình, dịch popup lên trên
      popupTop = bottomEdge - actualPopupHeight;
    }
    
    // Tạo đối tượng vị trí popup
    const newPosition: PopupPosition = {
      x,
      y,
      popupLeft,
      popupTop,
      popupTransform: '',
      arrowPosition,
      placement: bestPlacement
    };
    
    console.log('Vị trí popup cuối cùng:', newPosition);
    setPopupPosition(newPosition);
    return newPosition;
  }, [popupElement, disableScroll]);
  
  /**
   * Cập nhật vị trí nếu kích thước của popup thay đổi
   */
  useEffect(() => {
    if (popupPosition && popupElement) {
      // Tính toán lại vị trí với kích thước thực tế của popup
      calculatePopupPosition(
        popupPosition.x,
        popupPosition.y,
        window.innerWidth,
        window.innerHeight,
        {
          popupWidth: popupElement.offsetWidth,
          popupHeight: popupElement.offsetHeight
        }
      );
    }
  }, [popupElement, calculatePopupPosition]);

  /**
   * Xóa vị trí popup và mở lại scroll
   */
  const clearPopupPosition = useCallback(() => {
    enableScroll();
    setPopupPosition(null);
  }, [enableScroll]);

  /**
   * Đảm bảo scroll được mở lại khi component unmount
   */
  useEffect(() => {
    return () => {
      if (popupPosition) {
        enableScroll();
      }
    };
  }, [popupPosition, enableScroll]);

  return {
    popupPosition,
    calculatePopupPosition,
    clearPopupPosition,
    popupRef
  };
} 