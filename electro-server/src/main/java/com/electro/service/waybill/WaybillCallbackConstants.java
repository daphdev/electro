package com.electro.service.waybill;

import java.util.Map;

public interface WaybillCallbackConstants {
    int WAITING = 1;
    int SHIPPING = 2;
    int SUCCESS = 3;
    int FAILED = 4;
    int RETURN = 5;

    Map<String, Integer> WAYBILL_STATUS_CODE = Map.ofEntries(
            Map.entry("ready_to_pick", WAITING), // Mới tạo đơn hàng
            Map.entry("picking", WAITING), // Nhân viên đang lấy hàng
            Map.entry("cancel", FAILED), // Hủy đơn hàng
            Map.entry("money_collect_picking", SHIPPING), // Đang thu tiền người gửi
            Map.entry("picked", SHIPPING), // Nhân viên đã lấy hàng
            Map.entry("transporting", SHIPPING), // Đang luân chuyển hàng
            Map.entry("sorting", SHIPPING), // Đang phân loại hàng hóa
            Map.entry("delivering", SHIPPING), // Nhân viên đang giao cho người nhận
            Map.entry("money_collect_delivering", SHIPPING), // Nhân viên đang thu tiền người nhận
            Map.entry("delivered", SUCCESS), // Nhân viên đã giao hàng thành công
            Map.entry("delivery_fail", FAILED), // Nhân viên giao hàng thất bại
            Map.entry("waiting_to_return", RETURN), // Đang đợi trả hàng về cho người gửi
            Map.entry("return", RETURN), // Trả hàng
            Map.entry("return_transporting", RETURN), // Đang luân chuyển hàng trả
            Map.entry("return_sorting", RETURN), // Đang phân loại hàng trả
            Map.entry("returning", RETURN), // Nhân viên đang đi trả hàng
            Map.entry("return_fail", RETURN), // Nhân viên trả hàng thất bại
            Map.entry("returned", SUCCESS), // Nhân viên trả hàng thành công
            Map.entry("exception", FAILED), // Đơn hàng ngoại lệ không nằm trong quy trình
            Map.entry("damage", FAILED), // Hàng bị hư hỏng
            Map.entry("lost", FAILED) // Hàng bị mất
    );
}
