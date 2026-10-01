let choice;
let currentReservationCode = "";
let isReservationValid = false;
let totalRevenue = 0;
let totalCheckouts = 0;

do {
    console.log("=".repeat(50));
    console.log("Hệ thống lễ tân khách sạn Sunrise Hotel");
    console.log("=".repeat(50));
    console.log("1. Nhập và kiểm chuẩn mã đặt phòng");
    console.log("2. Tính tiền phòng lưu trú");
    console.log("3. Thẩm định mã thẻ khách may mắn");
    console.log("0. Thoát chương trình");
    console.log("=".repeat(50));
    choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 3):");

    if (choice === null) {
        choice = "";
    }
    choice = choice.trim();

    switch (choice) {
        case "1": {
            currentReservationCode = "";
            isReservationValid = false;

            let roomInput = prompt("Nhập mã đặt phòng:");
            if (roomInput === null) {
                roomInput = "";
            }
            roomInput = roomInput.trim().toUpperCase();

            if (roomInput.length === 0) {
                console.log("Chưa nhập mã đặt phòng");
            } else if (roomInput.length < 6) {
                console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
            } else if (!roomInput.startsWith("HTL-")) {
                console.log("Lỗi: Sai tiền tố HTL-");
            } else if (roomInput.includes(" ")) {
                console.log("Lỗi: Chứa khoảng trắng ở giữa");
            } else {
                currentReservationCode = roomInput;
                isReservationValid = true;
                console.log("Nhập mã thành công: " + currentReservationCode);
            }
            break;
        }
        case "2": {
            if (isReservationValid === false) {
                console.log("Chưa có mã đặt phòng hợp lệ, hãy chọn chức năng 1 trước");
                break;
            }

            let nightCount = 0;
            let pricePerNight = 0;
            let isCancelled = false;

            while (true) {
                let nightInput = prompt("Nhập số đêm lưu trú:");
                if (nightInput === null) {
                    isCancelled = true;
                    break;
                }
                nightInput = nightInput.trim();
                let nightNumber = Number(nightInput);
                if (nightInput === "" || isNaN(nightNumber) || !Number.isInteger(nightNumber) || nightNumber <= 0) {
                    console.log("Lỗi: số đêm phải là số nguyên lớn hơn 0, nhập lại");
                } else {
                    nightCount = nightNumber;
                    break;
                }
            }

            if (isCancelled === false) {
                while (true) {
                    let priceInput = prompt("Nhập giá phòng mỗi đêm:");
                    if (priceInput === null) {
                        isCancelled = true;
                        break;
                    }
                    priceInput = priceInput.trim();
                    let priceNumber = Number(priceInput);
                    if (priceInput === "" || isNaN(priceNumber) || !Number.isInteger(priceNumber) || priceNumber <= 0) {
                        console.log("Lỗi: giá phòng phải là số nguyên lớn hơn 0, nhập lại");
                    } else {
                        pricePerNight = priceNumber;
                        break;
                    }
                }
            }

            if (isCancelled === true) {
                console.log("Đã hủy giao dịch");
                break;
            }

            let baseCost = nightCount * pricePerNight;
            let discount = 0;
            if (nightCount >= 4) {
                discount = Math.round(baseCost * 0.1);
            }
            let serviceFee = Math.round((baseCost - discount) * 0.08);
            let totalPayment = baseCost - discount + serviceFee;

            console.log("Hóa đơn tiền phòng");
            console.log("Mã đặt phòng: " + currentReservationCode);
            console.log("Số đêm: " + nightCount);
            console.log("Giá phòng mỗi đêm: " + pricePerNight.toLocaleString("vi-VN") + " VNĐ");
            console.log("Chi phí cơ sở: " + baseCost.toLocaleString("vi-VN") + " VNĐ");
            console.log("Tiền giảm giá: " + discount.toLocaleString("vi-VN") + " VNĐ");
            console.log("Phí phục vụ: " + serviceFee.toLocaleString("vi-VN") + " VNĐ");
            console.log("Tổng thanh toán: " + totalPayment.toLocaleString("vi-VN") + " VNĐ");

            totalRevenue = totalRevenue + totalPayment;
            totalCheckouts = totalCheckouts + 1;
            currentReservationCode = "";
            isReservationValid = false;
            break;
        }
        case "3": {
            let cardInput = prompt("Nhập mã số trên thẻ khách:");
            if (cardInput === null) {
                cardInput = "";
            }
            cardInput = cardInput.trim();

            let isOnlyDigits = true;
            let digitSum = 0;
            let reversedCode = "";

            for (let i = 0; i < cardInput.length; i++) {
                let character = cardInput[i];
                if (character < "0" || character > "9") {
                    isOnlyDigits = false;
                } else {
                    digitSum = digitSum + Number(character);
                }
                reversedCode = character + reversedCode;
            }

            if (cardInput.length === 0 || isOnlyDigits === false) {
                console.log("Lỗi: mã thẻ chỉ gồm các chữ số 0 - 9");
                break;
            }
            if (cardInput.length < 2) {
                console.log("Lỗi: mã thẻ phải có từ 2 chữ số trở lên");
                break;
            }
            if (digitSum === 0) {
                console.log("Lỗi: mã thẻ không được toàn số 0");
                break;
            }

            let isPalindrome = cardInput === reversedCode;
            let isDivisibleByNine = digitSum % 9 === 0;
            let prize = "";

            if (isPalindrome && isDivisibleByNine) {
                prize = "Giải Đặc biệt - Voucher nghỉ dưỡng 1 đêm miễn phí trị giá 1.500.000 VNĐ";
            } else if (isPalindrome) {
                prize = "Giải Nhất - Buffet sáng miễn phí cho 2 người trị giá 400.000 VNĐ";
            } else if (isDivisibleByNine) {
                prize = "Giải Nhì - Voucher giảm 100.000 VNĐ cho lần đặt phòng kế tiếp";
            } else {
                prize = "Không trúng thưởng";
            }

            console.log("Mã số gốc: " + cardInput);
            console.log("Mã đảo ngược: " + reversedCode);
            console.log("Tổng chữ số: " + digitSum);
            if (isDivisibleByNine) {
                console.log("Chia hết cho 9: Có");
            } else {
                console.log("Chia hết cho 9: Không");
            }
            console.log("Giải thưởng: " + prize);
            break;
        }
        case "0": {
            console.log("=".repeat(50));
            console.log("Báo cáo tổng kết ca lễ tân");
            console.log("=".repeat(50));
            if (totalCheckouts === 0) {
                console.log("Chưa phát sinh lượt trả phòng nào trong ca");
            } else {
                let averageRevenue = Math.round(totalRevenue / totalCheckouts);
                console.log("Tổng số lượt trả phòng: " + totalCheckouts);
                console.log("Tổng doanh thu: " + totalRevenue.toLocaleString("vi-VN") + " VNĐ");
                console.log("Doanh thu trung bình: " + averageRevenue.toLocaleString("vi-VN") + " VNĐ");
            }
            console.log("=".repeat(50));
            console.log("Cảm ơn bạn đã sử dụng hệ thống. Hẹn gặp lại!");
            break;
        }
        default: {
            console.log("Lựa chọn không hợp lệ, vui lòng chọn từ 0 đến 3");
            break;
        }
    }
} while (choice !== "0");
