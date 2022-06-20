package com.electro.entity.product;

import com.electro.entity.BaseEntity;
import com.electro.entity.address.Address;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "supplier")
public class Supplier extends BaseEntity {
    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "contact_fullname", nullable = false)
    private String contactFullname;

    @Column(name = "contact_email", nullable = false)
    private String contactEmail;

    @Column(name = "contact_phone", nullable = false)
    private String contactPhone;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "tax_code", nullable = false)
    private String taxCode;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "fax", nullable = false)
    private String fax;

    @Column(name = "website")
    private String website;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false, unique = true)
    private Address address;

    @Column(name = "description")
    private String description;

    @Column(name = "note")
    private String note;

    @Column(name = "status", nullable = false, columnDefinition = "TINYINT")
    private Integer status;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Product> products = new ArrayList<>();
}
