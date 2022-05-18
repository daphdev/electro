package com.electro.entity.address;

import com.electro.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "province")
public class Province extends BaseEntity {
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "code", nullable = false, length = 35)
    private String code;

    @OneToMany(mappedBy = "province", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<District> districts = new ArrayList<>();

    @OneToMany(mappedBy = "province", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Address> addresses = new ArrayList<>();
}
