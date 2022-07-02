package com.electro.entity.inventory;

import com.electro.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "transfer")
public class Transfer extends BaseEntity {
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @OneToMany(mappedBy = "transfer", cascade = CascadeType.ALL)
    private Set<TransferVariant> transferVariants = new HashSet<>();

    @Column(name = "note")
    private String note;

    @Column(name = "status", nullable = false, columnDefinition = "TINYINT")
    private Integer status;
}
