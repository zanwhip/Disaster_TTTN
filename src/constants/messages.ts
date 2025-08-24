export interface Message {
  sender: "user" | "seller";
  text: string;
}
export const DEFAULT_MESSAGES: Message[] = [
  { sender: "seller", text: "Hello! How can I help you?" },
];

export const SELLER_REPLY: Message = {
  sender: "seller",
  text: "Thanks for your message. We'll respond soon.",
};
export const TEXT = {
  unknown: "Không xác định",
  cannotGet: "Không thể lấy vị trí",
  notSupported: "Trình duyệt không hỗ trợ lấy vị trí",
};
