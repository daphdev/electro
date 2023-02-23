package com.electro.utils;

import com.electro.entity.inventory.DocketVariant;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InventoryUtils {

    public static Map<String, Integer> calculateInventoryIndices(List<DocketVariant> transactions) {
        int inventory = 0;
        int waitingForDelivery = 0;
        int canBeSold;
        int areComing = 0;

        for (DocketVariant transaction : transactions) {
            // Phiếu Nhập và trạng thái phiếu là Hoàn thành (3)
            if (transaction.getDocket().getType().equals(1) && transaction.getDocket().getStatus().equals(3)) {
                inventory += transaction.getQuantity();
            }

            // Phiếu Xuất và trạng thái phiếu là Hoàn thành (3)
            if (transaction.getDocket().getType().equals(2) && transaction.getDocket().getStatus().equals(3)) {
                inventory -= transaction.getQuantity();
            }

            // Phiếu Xuất và trạng thái phiếu là Mới (1) hoặc Đang xử lý (2)
            if (transaction.getDocket().getType().equals(2) && List.of(1, 2).contains(transaction.getDocket().getStatus())) {
                waitingForDelivery += transaction.getQuantity();
            }

            // Phiếu Nhập và trạng thái phiếu là Mới (1) hoặc Đang xử lý (2)
            if (transaction.getDocket().getType().equals(1) && List.of(1, 2).contains(transaction.getDocket().getStatus())) {
                areComing += transaction.getQuantity();
            }
        }

        canBeSold = inventory - waitingForDelivery;

        Map<String, Integer> indices = new HashMap<>();

        indices.put("inventory", inventory);
        indices.put("waitingForDelivery", waitingForDelivery);
        indices.put("canBeSold", canBeSold);
        indices.put("areComing", areComing);

        return indices;
    }

}
