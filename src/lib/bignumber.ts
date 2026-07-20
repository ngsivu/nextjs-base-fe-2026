import BigNumber from 'bignumber.js';

/**
 * Cấu hình BigNumber dùng chung cho toàn app.
 *
 * EXPONENTIAL_AT mặc định là [-7, 20]: số nhỏ hơn 1e-7 hoặc từ 1e21 trở lên
 * sẽ bị hiển thị dạng '1e+21' / '1e-8'. Với số tiền và số lượng thì đó là
 * dạng người dùng không đọc được.
 *
 * Đặt [-1e9, 1e9] nghĩa là thực tế không bao giờ dùng ký hiệu mũ —
 * luôn in ra dạng thập phân đầy đủ.
 *
 * LƯU Ý: đây là cấu hình GLOBAL của BigNumber. Mọi nơi cần BigNumber phải
 * import từ file này, không import thẳng 'bignumber.js', để chắc chắn
 * cấu hình đã được áp dụng.
 */
BigNumber.config({
	EXPONENTIAL_AT: [-1e9, 1e9],
	// Số chữ số thập phân tối đa khi chia — mặc định 20, nâng lên cho phép tính tiền tệ
	DECIMAL_PLACES: 30,
});

export { BigNumber };
export default BigNumber;
