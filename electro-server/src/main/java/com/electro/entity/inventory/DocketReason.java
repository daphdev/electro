package com.electro.entity.inventory;

import com.electro.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "docket_reason")
public class DocketReason extends BaseEntity {

    @Column(name = "name")
    private String name;

//    @OneToMany(mappedBy = "reason", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
//    private List<Docket> dockets = new ArrayList<>();

    @Column(name = "status")
    private Integer status;
}
