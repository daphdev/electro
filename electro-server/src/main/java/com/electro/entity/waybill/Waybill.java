package com.electro.entity.waybill;

import com.electro.entity.BaseEntity;
import com.electro.entity.order.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "waybill")
public class Waybill extends BaseEntity {
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false, unique = true)
    private Order order;

    @Column(name = "receipt_date")
    private Instant receiptDate;

    @Column(name = "shipping_date", nullable = false, updatable = false)
    private Instant shippingDate = Instant.now();

    @Column(name = "expected_delivery_time")
    private Instant expectedDelivery;

    @Column(name = "note")
    private String note;

    @Column(name = "status", nullable = false, columnDefinition = "TINYINT")
    private Integer status;

    @Column(name = "payment_type_id")
    private Integer paymentTypeId;

    @Column(name = "required_note")
    private String requiredNote;

//    @Column(name = "to_name", nullable = false)
//    private String toName;
//
//    @Column(name = "to_phone",  nullable = false)
//    private String toPhone;
//
//    @Column(name = "to_address",  nullable = false)
//    private String toAddress;
//
//    @Column(name = "to_ward_name",  nullable = false)
//    private String toWardName;
//
//    @Column(name = "to_district_name",  nullable = false)
//    private String toDistrictName;
//
//    @Column(name = "to_province_name",  nullable = false)
//    private String toProvinceName;

    @Column(name = "cod_amount",  nullable = false)
    private Integer codAmount;

    @Column(name = "weight",  nullable = false)
    private Integer weight;

    @Column(name = "length",  nullable = false)
    private Integer length;

    @Column(name = "width",  nullable = false)
    private Integer width;

    @Column(name = "height",  nullable = false)
    private Integer height;

    @Column(name = "service_type_id",  nullable = false)
    private Integer serviceTypeId;

    @Column(name = "service_id",  nullable = false)
    private Integer serviceId;
}
