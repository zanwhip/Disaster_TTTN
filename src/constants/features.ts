import { IconType } from "react-icons";
import { FaCloudSun, FaBell, FaClipboardList, FaBookOpen } from "react-icons/fa";

export interface FeatureItem {
  icon: IconType;
  title: string;
  description: string;
  targetId: string;
}

export const FEATURES: FeatureItem[] = [
  {
    icon: FaCloudSun,
    title: "Dự báo thời tiết",
    description:
      "Xem thông tin thời tiết chi tiết theo vị trí, bao gồm nhiệt độ, độ ẩm, mưa và gió trong thời gian thực.",
    targetId: "section-weather",
  },
  {
    icon: FaBell,
    title: "Cảnh báo thiên tai",
    description:
      "Nhận cảnh báo động đất, bão, lũ lụt và sóng thần kịp thời để bảo vệ an toàn cho bạn và gia đình.",
    targetId: "section-alerts",
  },
  {
    icon: FaClipboardList,
    title: "Báo cáo tình huống",
    description:
      "Gửi báo cáo nhanh chóng về sự cố, kèm hình ảnh và vị trí GPS để hỗ trợ cứu hộ kịp thời.",
    targetId: "section-report",
  },
  {
    icon: FaBookOpen,
    title: "Hướng dẫn an toàn",
    description:
      "Tìm hiểu cách chuẩn bị và ứng phó với thiên tai thông qua các hướng dẫn chi tiết và chatbot hỗ trợ.",
    targetId: "section-guides",
  },
  
];

export const STEPS = [
  {
    title: "Cập nhật thông tin từ nguồn tin cậy",
    description:
      "Theo dõi thông báo từ chính quyền, ứng dụng cảnh báo thiên tai hoặc đài phát thanh. Tránh tin giả và thông tin chưa kiểm chứng.",
    icon: "search",
    image:
      "https://media.istockphoto.com/id/1408187342/photo/tv-weather-forecast-program-professional-television-host-reviewing-weather-report-in-newsroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=As-J_2edxxwGJHmgMSblrNdZMeWaisX7AqATCh9__iY=",
  },
  {
    title: "Chuẩn bị bộ dụng cụ khẩn cấp",
    description:
      "Chuẩn bị nước uống, thực phẩm khô đủ cho 3 ngày, đèn pin, pin dự phòng, thuốc men và giấy tờ quan trọng trong túi chống nước.",
    icon: "check",
    image:
      "https://images.unsplash.com/photo-1624638760852-8ede1666ab07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1lcmdlbmN5JTIwa2l0fGVufDB8fDB8fHww",
  },
  {
    title: "Đảm bảo an toàn trước khi di chuyển",
    description:
      "Ngắt điện, gas, nước trước khi rời khỏi nhà. Di chuyển đến nơi trú ẩn an toàn theo hướng dẫn từ cơ quan chức năng.",
    icon: "rotate",
    image:
      "https://plus.unsplash.com/premium_photo-1663126808485-10f4822535af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZhY3VhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Tránh khu vực nguy hiểm",
    description:
      "Không đi vào vùng ngập lụt, cầu yếu, hoặc gần sông suối. Tránh di chuyển khi mưa bão nếu không thực sự cần thiết.",
    icon: "global",
    image:
      "https://images.unsplash.com/photo-1493910943310-50da26acd469?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvb2RlZCUyMGFyZWElMjB3YXJuaW5nfGVufDB8fDB8fHww",
  },
  {
    title: "Giữ liên lạc và hỗ trợ cộng đồng",
    description:
      "Thông báo vị trí cho người thân hoặc cơ quan chức năng. Hỗ trợ người già, trẻ em và người khuyết tật nếu có thể.",
    icon: "person",
    image:
      "https://plus.unsplash.com/premium_photo-1683133338116-a60920a116d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW1lcmdlbmN5JTIwY29tbXVuaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
];
