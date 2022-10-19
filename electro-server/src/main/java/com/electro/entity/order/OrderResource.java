package com.electro.entity.order;

import com.electro.entity.BaseEntity;
import com.electro.entity.customer.CustomerResource;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "order_resource")
public class OrderResource extends BaseEntity {
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "color", nullable = false)
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_resource_id")
    @JsonBackReference
    private CustomerResource customerResource;

    @Column(name = "status", nullable = false, columnDefinition = "TINYINT")
    private Integer status;

    @OneToMany(mappedBy = "orderResource", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Order> orders = new ArrayList<>();
}
