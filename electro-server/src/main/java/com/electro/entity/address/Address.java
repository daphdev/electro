package com.electro.entity.address;

import com.electro.entity.BaseEntity;
import com.electro.entity.authentication.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "address")
public class Address extends BaseEntity {
    @Column(name = "line", nullable = false)
    private String line;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_id", nullable = false)
    @JsonBackReference
    private Province province;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id", nullable = false)
    @JsonBackReference
    private District district;

    @OneToOne(mappedBy = "address")
    private User user;
}
