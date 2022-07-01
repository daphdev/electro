package com.electro.entity.inventory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TransferVariantKey implements Serializable {
    @Column(name = "transfer_id", nullable = false)
    Long transferId;

    @Column(name = "variant_id", nullable = false)
    Long variantId;
}
