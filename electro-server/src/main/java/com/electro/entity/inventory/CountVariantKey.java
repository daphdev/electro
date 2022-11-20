package com.electro.entity.inventory;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Embeddable
public class CountVariantKey implements Serializable {
    @Column(name = "count_id", nullable = false)
    Long countId;

    @Column(name = "variant_id", nullable = false)
    Long variantId;
}
