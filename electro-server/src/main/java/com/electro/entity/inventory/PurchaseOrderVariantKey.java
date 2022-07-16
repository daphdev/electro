package com.electro.entity.inventory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class PurchaseOrderVariantKey implements Serializable {
    @Column(name = "purchase_order_id", nullable = false)
    Long purchaseOrderId;

    @Column(name = "variant_id", nullable = false)
    Long variantId;
}
